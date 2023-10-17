// const mongoose = require('mongoose');

// const coverageSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   icon: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },

// });

// const Coverage = mongoose.model('coverage', coverageSchema);

// module.exports = Coverage;


const mongoose = require('mongoose');

const coverageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
    minlength: [1, 'Name must be at least 1 character long'], // Minimum length
    maxlength: [100, 'Name cannot exceed 100 characters'], // Maximum length
  },
  description: {
    type: String,
    minlength: [1, 'Description must be at least 1 character long'], // Minimum length
    maxlength: [500, 'Description cannot exceed 500 characters'], // Maximum length
  },
  icon: {
    type: String,
    validate: {
      validator: function(value) {
        // You can implement a custom validation function here.
        // For example, check if the value is a valid URL.
        return isValidURL(value);
      },
      message: 'Invalid URL format for icon',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Custom validation function for URL format
function isValidURL(url) {
  // Implement your validation logic here
  // You can use a regular expression or a library like 'validator'
  // For example, using a regular expression:
  const urlPattern = /^https?:\/\/.+/;
  return urlPattern.test(url);
}

const Coverage = mongoose.model('Coverage', coverageSchema);

module.exports = Coverage;
