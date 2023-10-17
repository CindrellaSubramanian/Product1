const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Category = require('../schema/category');
const translate = require("../lib/js/translate");
const multer = require('multer');
const exceljs = require('exceljs');
const csv = require('csv-parser');
const commonFunctions = require('../lib/js/commonFunction');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const path=require('path')

// Create a new product oooo
router.post('/create', async (req, res) => {
    try {
      const newCategory = await Category.create(req.body);
      const successMessage = translate('Category created successfully', req.query.lang, req.query.currency);
      res.status(201).json({
        status: 1,
        message: successMessage,
        data: newCategory,
      });
    } catch (error) {
      const errorMessage = translate('Internal server error');
      console.log(error)
      res.status(500).json({
        status: -1,
        message: errorMessage,
        data: null,
      });
    }
  });

  router.get('/list', async (req, res) => {
    try {
      const { type } = req.query;
  
      // Define a filter based on the 'type' query parameter
      const filter = {};
      if (type !== undefined) {
        if (parseInt(type) !== 0) {
          filter.type = parseInt(type); // Convert the query parameter to an integer
        }
        // If type is 0, don't apply any type filter
      }
  
      // Find categories based on the filter
      const categories = await Category.find(filter);
  
      // if (type !== undefined && parseInt(type) !== 0 && categories.length === 0) {
      //   // Handle the case where no categories match the provided 'type'
      //   const errorMessage = translate('No categories found for the provided type', req.query.lang, req.query.currency);
      //   return res.status(404).json({
      //     status: -1,
      //     message: errorMessage,
      //     data: null,
      //   });
      // }
      // Check if there are no categories found
    if (categories.length === 0) {
      const successMessage = translate('No categories found', req.query.lang, req.query.currency);
      return res.status(200).json({
        status: 1,
        message: successMessage,
        data: [], // Return an empty array
      });
    }
  
      const successMessage = translate('Success', req.query.lang, req.query.currency);
      res.status(200).json({
        status: 1,
        message: successMessage,
        data: categories,
      });
    } catch (error) {
      const errorMessage = translate('Error retrieving categories', req.query.lang, req.query.currency);
      res.status(500).json({
        status: -1,
        message: errorMessage,
        data: [],
      });
    }
  });

  
  

// Get category by ID
router.get('/getById', async (req, res) => {
  try {
    const categoryId = req.query.categoryId; // Use req.query to access query parameters
    const category = await Category.findById(categoryId);

    if (!category) {
      const errorMessage = translate('Category not found', req.query.lang, req.query.currency);
      return res.status(404).json({
        status: -1,
        message: errorMessage,
        data: null,
      });
    }

    const successMessage = translate('Category retrieved successfully', req.query.lang, req.query.currency);
    res.status(200).json({
      status: 1,
      message: successMessage,
      data: category,
    });
  } catch (error) {
    const errorMessage = translate('Error retrieving category', req.query.lang, req.query.currency);
    res.status(500).json({
      status: -1,
      message: errorMessage,
      data: null,
    });
  }
});

router.post('/update', async (req, res) => {
  try {
      const categoryId = new mongoose.Types.ObjectId(req.body.categoryId); // Convert to ObjectId
      // console.log('Updating category with ID:', categoryId);

      const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
      // console.log('Updated category:', updatedCategory);

      if (!updatedCategory) {
          const errorMessage = translate('Category not found', req.query.lang, req.query.currency);
          // console.log('Category not found');
          return res.status(404).json({
              status: -1,
              message: errorMessage,
              data: null,
          });
      }

      const successMessage = translate('Category updated successfully', req.query.lang, req.query.currency);
      // console.log('Category updated successfully');
      res.status(200).json({
          status: 1,
          message: successMessage,
          data: updatedCategory,
      });
  } catch (error) {
      // console.error('Error updating category:', error);
      const errorMessage = translate('Error updating category', req.query.lang, req.query.currency);
      res.status(500).json({
          status: -1,
          message: errorMessage,
          data: null,
      });
  }
});


router.post('/updateStatus', async (req, res) => {
  try {
    const { categoryId, status } = req.body;

    // Validate that the status is either 1 (active) or 2 (inactive)
    if (status !== 1 && status !== 2) {
      const errorMessage = translate('Invalid status value', req.query.lang, req.query.currency);
      return res.status(400).json({
        status: -1,
        message: errorMessage,
        data: null,
      });
    }

    // Assuming categoryId is an array of valid ObjectIDs
    const categoryIds = categoryId.map((id) => new mongoose.Types.ObjectId(id));

    // Update categories based on the provided categoryIds
    const updatedCategories = await Category.updateMany(
      { _id: { $in: categoryIds } },
      { $set: { status: status } }
    );

    if (updatedCategories.nModified === 0) {
      // Handle the case where no categories were updated
      // Return an appropriate response
      const errorMessage = translate('No categories updated', req.query.lang, req.query.currency);
      return res.status(404).json({
        status: -1,
        message: errorMessage,
        data: null,
      });
    }

    const successMessage = status === 1 ? translate('Categories marked as active', req.query.lang, req.query.currency) : translate('Categories marked as inactive', req.query.lang, req.query.currency);
    res.status(200).json({
      status: 1,
      message: successMessage,
      data: updatedCategories,
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


  
  
  // Delete a category by ID
router.delete('/delete', async (req, res) => {
    try {
      const categoryId = req.body.categoryId;
      const deletedCategory = await Category.findByIdAndRemove(categoryId);
  
      if (!deletedCategory) {
        const errorMessage = translate('Category not found', req.query.lang, req.query.currency);
        return res.status(404).json({
          status: -1,
          message: errorMessage,
          data: null,
        });
      }
  
      const successMessage = translate('Category deleted successfully', req.query.lang, req.query.currency);
      res.status(200).json({
        status: 1,
        message: successMessage,
        data: deletedCategory,
      });
    } catch (error) {
      const errorMessage = translate('Internal server error', req.query.lang, req.query.currency);
      res.status(500).json({
        status: -1,
        message: errorMessage,
        data: null,
      });
    }
  });



// Define a route for uploading files (supports both Excel and CSV)
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const fileType = req.file.mimetype;

    if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      // Process Excel file
      await processExcel(buffer);
    } else if (fileType === 'text/csv') {
      // Process CSV file
      await processCSV(buffer);
    } else {
      // Unsupported file type
      return res.status(400).json({ status:-2,message: 'Unsupported file type' });
    }

    res.status(200).json({ status:1,message: 'Data uploaded successfully' });
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({status:-1 ,message: 'Error uploading data' });
  }
});

// Function to process Excel file
async function processExcel(buffer) {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.load(buffer);

  // Assuming the first worksheet in the Excel file contains the data
  const worksheet = workbook.worksheets[0];

  const dataToInsert = [];

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    // Skip the header row (assuming it's the first row)
    if (rowNumber === 1) {
      return;
    }

    // Map Excel columns to your schema fields
    const categoryName = row.getCell(1).value;
    const parentCategoryId = row.getCell(2).value === 'null' ? null : row.getCell(2).value; // Set to null if 'null' string
    const parentCategoryName = row.getCell(3).value || '';
    const description = row.getCell(4).value;

    // Create a data object with the mapped fields
    const newData = {
      categoryName,
      parentCategoryId,
      parentCategoryName,
      description,
    };

    dataToInsert.push(newData);
  });

  // Insert the data into the database
  await Category.insertMany(dataToInsert);
}

// Function to process CSV file
async function processCSV(buffer) {
  const dataToInsert = [];

  // Assuming the CSV file has a header row
  const results = await new Promise((resolve, reject) => {
    const resultsArray = [];
    const readableStream = Readable.from(buffer.toString());

    readableStream
      .pipe(csv())
      .on('data', (row) => {
        resultsArray.push(row);
      })
      .on('end', () => {
        resolve(resultsArray);
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  for (const row of results.slice(1)) {
    // Map CSV columns to your schema fields
    const categoryName = row.categoryName;
    const parentCategoryId = row.parentCategoryId === 'null' ? null : row.parentCategoryId; // Set to null if 'null' string
    const parentCategoryName = row.parentCategoryName || '';
    const description = row.description;

    // Create a data object with the mapped fields
    const newData = {
      categoryName,
      parentCategoryId,
      parentCategoryName,
      description,
    };

    dataToInsert.push(newData);
  }

  // Insert the data into the database
  await Category.insertMany(dataToInsert);
}




// API endpoint for uploading an image
router.post('/uploadImage', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      const errorMessage = 'No image uploaded';
      return res.status(400).json({
        status: -1,
        message: errorMessage,
        data: null,
      });
    }

    const imageBuffer = req.file.buffer;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

    // Use the correct categoryPath when calling uploadImage
    const imageUrl = await commonFunctions.uploadImage(imageBuffer, fileExtension,  process.env.categoryPath);

    // You can now save the imageUrl to the database or perform any other necessary actions
      // Extract the file name from the imageUrl
      const imageFileName = path.basename(imageUrl);

    const successMessage = 'Image uploaded successfully';
    res.status(200).json({
      status: 1,
      message: successMessage,
      data: { imageUrl:imageFileName },
    });
  } catch (error) {
    console.error(error);
    const errorMessage = 'Internal server error';
    res.status(500).json({
      status: -1,
      message: errorMessage,
      data: null,
    });
  }
});

  
module.exports = router;
