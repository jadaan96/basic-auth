'use strict'
const { Sequelize, DataTypes } = require("sequelize");

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URI;


let sequelize = new Sequelize(DATABASE_URL, {}); 


const User = require('./users-model')

module.exports ={
    db:sequelize, 
    User:User(sequelize, DataTypes)  
}