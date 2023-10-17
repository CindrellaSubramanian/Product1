const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const docs = require('./docs');
const cors = require("cors");

app.get('/', (req, res) => {
	return res.send('Express Js');
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());


const productController = require('./routes/productController')
const categoryController = require('./routes/categoryController')
const coverageController = require('./routes/coverageController')

const swaggerUI = require("swagger-ui-express");



app.use('/category',categoryController);
app.use('/coverage',coverageController);
app.use('/product',productController);

// Port
app.listen(process.env.PORT, () => console.log(`The server is running on port ${process.env.PORT}`));
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));


// DataBase Connection
mongoose.connect(process.env.DBURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('Connection succesfully');
}).catch((error) => {
	console.log('Something went wrong', error);
});