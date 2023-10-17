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

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  parentCategoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  parentCategoryName: { type: String },
  description: { type: String },
  label: { type: String },
  status: { type: Number, default: 1, enum: [1, 2] },
  image: { type: String }, // URL or reference to an image/icon
  order: { type: Number, default: 0 }, // Default order or priority
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  type: { type: Number, default: 0, enum: [1, 2] }, // 1-main category, 2- subcategory
  attribute:  [attributeSchema], // Include the 'attribute' subdocument
  attributeCondition: [attributeConditionSchema], // Include the 'attributeCondition' subdocument
}, {
  toJSON: { getters: true },
  toObject: { getters: true },
});

categorySchema.set('toJSON', {
  transform: function (doc, ret, options) {
    // Exclude 'label' field from JSON output
    delete ret.label;
    return ret;
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

