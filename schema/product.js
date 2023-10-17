const mongoose = require('mongoose');
const { Schema } = mongoose;
// Define the subdocument schema for 'attributeItem'
const attributeItemSchema = new mongoose.Schema({
  attributeName: { type: String },
  groupName: { type: String },
  type: { type: [String] },
  componentType: { type: String },
  recommended: { type: Boolean },
  required: { type: Boolean },
});

// Define the subdocument schema for 'attributeTitle'
const attributeSchema = new mongoose.Schema({
  attributeTitle: { type: String },
  item: [attributeItemSchema],
});
// Define the subdocument schema for 'attributeCondition'
const attributeConditionSchema = new mongoose.Schema({
  groupName: { type: String },
  attributeName: { type: String },
  operator: { type: String },
  isShown: { type: Boolean },
  condition: { type: String },
});
const productSchema = new Schema({
  code: { type: String }, 
  name: { type: String, required: true },
  variantName: { type: String }, 
  variantSegregationBy: { type: String }, 
  tags: { type: String }, 
  shortDescription: { type: String }, 
  longDescription: { type: String },
  packedDate: { type: Date }, 
  packingTime: { type: String },
  productCoverage: { type: Array }, 
  expiryDate: { type: String }, 
  quantity: { type: Number, min: 0 }, // Should be a non-negative number
  weight: { type: String }, 
  stockStatus: { type: Number, default: 0, enum: [0, 1, 2] }, // 1->stock in and 2->stock out
  status: { type: Number, default: 0, enum: [0, 1, 2] }, //1->Active ,2->Inactive
  availableCount: { type: Number, default: 0, min: 0 }, // Should be a non-negative number
  type: { type: String }, // 'food', 'clothing', 'books', 'grocery
  sellingPrice: { type: Number, min: 1 }, // Should be a non-negative number
  discountPrice: { type: Number, min: 1 }, // Should be a non-negative number
  mrp: { type: Number, min: 1 }, // Should be a non-negative number
  currency: { type: String },
  sku: { type: String }, 
  brand: { type: String },
  specification: { type: Object, default: {} },
  vendorId: { type: String }, 
  vendorName: { type: String }, 
  rating: { type: Number, default: 0, min: 0, max: 5 }, 
  image: { type: Array }, 
  bannerImage: { type: Array },
  barCode: { type: String }, 
  categoryId: { type: String },
  categoryName: { type: String },
  createdAt: { type: Date, default: Date.now }, // Automatically set to the current date
  updatedAt: { type: Date, default: Date.now }, // Automatically set to the current date
  attribute:  [attributeSchema], 
  attributeCondition: [attributeConditionSchema],
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
