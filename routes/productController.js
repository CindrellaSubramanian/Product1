const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const translate = require("../lib/js/translate");
const multer = require('multer');
const csv = require('csv-parser');
const exceljs = require('exceljs');
const Product = require('../schema/product');
const commonFunctions = require('../lib/js/commonFunction');


// Create a new Product
router.post('/create', async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json({
        status: 1,
        message: 'Product created successfully',
        data: newProduct,
      });
    } catch (error) {
      res.status(500).json({
        status: -1,
        message: 'Error creating Product',
        data: null,
      });
    }
  });

  // List all Products
router.get('/list', async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        status: 1,
        message: 'Products retrieved successfully',
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        status: -1,
        message: 'Error retrieving Products',
        data: [],
      });
    }
  });


  // Get a Product by ID
router.get('/getById', async (req, res) => {
    try {
      const productId = req.query.productId; // Assuming you pass productId as a query parameter
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({
          status: -1,
          message: 'Product not found',
          data: null,
        });
      }
  
      res.status(200).json({
        status: 1,
        message: 'Product retrieved successfully',
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        status: -1,
        message: 'Error retrieving Product',
        data: null,
      });
    }
  });


  // Update a Product by ID
router.post('/update', async (req, res) => {
    try {
      const productId = req.body.productId; // Assuming you pass productId in the request body
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({
          status: -1,
          message: 'Product not found',
          data: null,
        });
      }
  
      res.status(200).json({
        status: 1,
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        status: -1,
        message: 'Error updating Product',
        data: null,
      });
    }
  });

  // Delete a Product by ID
router.delete('/delete', async (req, res) => {
    try {
      const productId = req.body.productId; // Assuming you pass productId in the request body
      const deletedProduct = await Product.findByIdAndRemove(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({
          status: -1,
          message: 'Product not found',
          data: null,
        });
      }
  
      res.status(200).json({
        status: 1,
        message: 'Product deleted successfully',
        data: deletedProduct,
      });
    } catch (error) {
      res.status(500).json({
        status: -1,
        message: 'Error deleting Product',
        data: null,
      });
    }
  });

// Create a storage for uploaded files using Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Function to process CSV files
function processCSV(buffer) {
    return new Promise((resolve, reject) => {
      const results = [];
      const stream = buffer.pipe(csv());
  
      stream
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
  
  // Function to process Excel files
  function processExcel(buffer) {
    return new Promise((resolve, reject) => {
      const results = [];
      const workbook = new exceljs.Workbook();
      workbook.xlsx.load(buffer).then((workbook) => {
        const worksheet = workbook.worksheets[0];
  
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber !== 1) {
            const rowData = {};
            row.eachCell((cell, colNumber) => {
              rowData[`column${colNumber}`] = cell.value;
            });
            results.push(rowData);
          }
        });
  
        resolve(results);
      });
    });
  }


  
  router.post('/updateStatus', async (req, res) => {
    try {
      const { productIds, status } = req.body;
  
      // Validate that the status is either 1 (active) or 2 (inactive)
      if (status !== 1 && status !== 2) {
        const errorMessage = translate('Invalid status value', req.query.lang, req.query.currency);
        return res.status(400).json({
          status: -1,
          message: errorMessage,
          data: null,
        });
      }
  
      // Assuming productIds is an array of valid ObjectIDs
      const productObjectIds = productIds.map((id) => new mongoose.Types.ObjectId(id));
  
      // Update products based on the provided productObjectIds
      const updatedProducts = await Product.updateMany(
        { _id: { $in: productObjectIds } },
        { $set: { status: status } }
      );
  
      if (updatedProducts.nModified === 0) {
        // Handle the case where no products were updated
        // Return an appropriate response
        const errorMessage = translate('No product updated', req.query.lang, req.query.currency);
        return res.status(404).json({
          status: -1,
          message: errorMessage,
          data: null,
        });
      }
  
      const successMessage = status === 1 ? translate('Products marked as active', req.query.lang, req.query.currency) : translate('Products marked as inactive', req.query.lang, req.query.currency);
      res.status(200).json({
        status: 1,
        message: successMessage,
        data: updatedProducts,
      });
    } catch (error) {
      console.log(error);
      const errorMessage = translate('Internal server error', req.query.lang, req.query.currency);
      res.status(500).json({
        status: -1,
        message: errorMessage,
        data: null,
      });
    }
  });

  

  // API to handle file uploads
  router.post('/upload', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: -1,
          message: 'No file uploaded',
          data: null,
        });
      }
  
      const fileBuffer = req.file.buffer;
      const fileType = req.file.mimetype;
  
      let parsedData = [];
  
      if (fileType === 'text/csv') {
        parsedData = await processCSV(fileBuffer);
      } else if (
        fileType ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        parsedData = await processExcel(fileBuffer);
      } else {
        return res.status(400).json({
          status: -1,
          message: 'Unsupported file format',
          data: null,
        });
      }
  
      // Now, you can process the parsed data and save it to the database (e.g., create Product records)
  
      res.status(200).json({
        status: 1,
        message: 'File uploaded and processed successfully',
        data: parsedData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: -1,
        message: 'Error processing file',
        data: null,
      });
    }
  });

  router.post('/uploadMultiImages', (req, res) => {
    commonFunctions.uploadMultiImages(req, res);
  });
  



  module.exports = router;