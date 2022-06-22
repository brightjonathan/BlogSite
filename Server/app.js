const express = require('express');
const app = express(); 
require('dotenv').config();
const cors = require('cors');
const colour = require('colors');
const morgan = require("morgan");
const {errorHandler} = require('./Middleware/errorHandle');
const ConnectDB = require('./Config/database');
const sign = require('./routers/UserRouter');
const tour = require('./routers/TourRouter');

//database connection
ConnectDB();


//internal middleware
app.use(morgan("dev"));
app.use(express.json({limit: "30mb"}));
app.use(express.urlencoded({limit: "30mb", extended: false}));

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};

app.use(cors(corsOptions));


//for all routes
app.use('/users', sign);
app.use('/tour', tour);

//for error handler
app.use(errorHandler);



//local host connection
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
 console.log('server is running...');
});

