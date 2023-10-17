
const basicInfo = require('./basicInfo');
const servers = require('./server');
const components = require('./component');
const tags = require('./tags');
// // const todos = require('./categories/index.js');
const categories = require('./path');
const coverages = require('./path');
const products = require('./path');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    // ...basicComponent,
    ...tags,
    ...categories,
    ...coverages,
    ...products
};