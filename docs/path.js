const createCategory = require('./categories/create-category');
const listCategory = require('./categories/list-category');
const getByIdCategory = require('./categories/getById-category');
const updateCategory = require('./categories/update-category');
const deleteCategory = require('./categories/delete-category');
const updateStatusCategory = require('./categories/updateStatus-category');
const uploadCategory = require('./categories/upload-category');
const uploadImageCategory = require('./categories/uploadImage-category');
const createCoverage = require('./coverages/create-coverage');
const listCoverage = require('./coverages/list-coverage');
const getByIdCoverage = require('./coverages/getById-coverage');
const updateCoverage = require('./coverages/update-coverage');
const deleteCoverage = require('./coverages/delete-coverage');
const createProduct = require('./products/create-product');
const listProduct = require('./products/list-product');
const getByIdProduct = require('./products/getById-product');
const updateProduct = require('./products/update-product');
const deleteProduct = require('./products/delete-product');
const updateStatusProduct = require('./products/updateStatus-product');
const uploadProduct = require('./products/upload-product');
const uploadMultiImages= require('./products/uploadMultiImage-product');

module.exports = {
    paths: {
        '/category/create': {
            ...createCategory
        },
        '/category/list': {
            ...listCategory
        },
        '/category/getById': {
            ...getByIdCategory
        },
        '/category/update': {
            ...updateCategory
        },
        '/category/delete': {
            ...deleteCategory
        },
        '/category/updateStatus': {
            ...updateStatusCategory
        },
        '/category/upload': {
            ...uploadCategory
        },
        '/category/uploadImage': {
            ...uploadImageCategory
        },
        '/coverage/create': {
            ...createCoverage,
        },
        '/coverage/list': {
            ...listCoverage,
        },
        '/coverage/update': {
            ...updateCoverage,
        },
        '/coverage/delete': {
            ...deleteCoverage,
        },
        '/coverage/getById': {
            ...getByIdCoverage,
        },
        '/product/create': {
            ...createProduct
        },
        '/product/list': {
            ...listProduct
        },
        '/product/getById': {
            ...getByIdProduct
        },
        '/product/update': {
            ...updateProduct
        },
        '/product/delete': {
            ...deleteProduct
        },
        '/product/updateStatus': {
            ...updateStatusProduct
        },
        '/product/upload': {
            ...uploadProduct
        },
        '/product/uploadMultiImages': {
            ...uploadMultiImages
        },
    }
}