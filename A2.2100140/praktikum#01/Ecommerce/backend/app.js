const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config')
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')

//CORS
app.use(cors());
app.options('*', cors());


//Middlewaree
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler)


//Router
const categoriesRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database connection is ready')
})
.catch((err)=> {
    console.log(err);
})

app.listen(3000, ()=>{
    console.log('server is running http://localhost:3000');
})