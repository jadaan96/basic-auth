'use strict'

const express=require('express');
const cors = require('cors');
const authRouter = require("./auth/router");

const pageNotFound = require('./middleware/404')
const serverError = require('./middleware/500')

const app = express();
app.use(cors());
app.use(express.json());

const users = require('./auth/models/users-model');

app.get('/', (req, res)=>{ //home endpoint
    res.status(200).json({
        message: 'Hello World!!😎'
    })
})

app.use(authRouter);


function start(port){
    app.listen(port, ()=> console.log(`Up an running on port: ${port}`))
}
app.use('*' , pageNotFound)
app.use(serverError)

module.exports={
    start, 
    app 
}