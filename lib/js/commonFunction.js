const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();
const categoryPath = process.env.categoryPath;


// const uploadImage = async (imageBuffer, fileExtension, categoryPath) => {
//     try {
//       // Generate a unique filename for the image
//       const imageFileName = `${uuidv4()}.${fileExtension}`;
  
//       // Construct the full path to save the image
//       const imagePath = path.join(__dirname, '..', categoryPath, imageFileName);
  
//       // Write the image data to the specified path
//       fs.writeFileSync(imagePath, imageBuffer);
  
//       // Return the relative path to the saved image
//       return imageFileName;
//     } catch (error) {
//       // Handle any errors that occur during image upload
//       console.error('Error uploading image:', error);
//       throw error;
//     }
//   };
const uploadImage = async (imageBuffer, fileExtension, categoryPath) => {
    try {
      // Generate a unique filename for the image
      const imageFileName = `${uuidv4()}.${fileExtension}`;
  
      // Construct the full path to save the image based on categoryPath
      const imagePath = path.join(__dirname, '..', '..', categoryPath, imageFileName);
  
      // Write the image data to the specified path
      fs.writeFileSync(imagePath, imageBuffer);
  
      // Return the relative path to the saved image
      return `${categoryPath}/${imageFileName}`;
    } catch (error) {
      // Handle any errors that occur during image upload
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.productPath); // Use the productPath from the .env file
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const uploadImages = multer({ storage: storage }).array('images', 10);
  
  function uploadMultiImages(req, res) {
    uploadImages(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
  
      const multiFileNames = req.files.map((file) => file.filename);
  
      return res.json({
        status: 'Images uploaded successfully',
        imageUrls: multiFileNames,
      });
    });
  }
  
  module.exports = {
    uploadImage,
    uploadMultiImages
  }