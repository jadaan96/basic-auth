'use strict';
const express = require('express');
const router = express.Router();

const { User } = require('./models');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const basicAuthMiddleWare = require('./middleware/ basic');

router.post('/signup', handelSignup);

async function handelSignup(req,res){
  req.body.password= await bcrypt.hash(req.body.password,10);
  const record = await User.create(req.body);
  res.status(201).json(record);
}//

router.post('/signin',basicAuthMiddleWare, handelSignin); 
async function handelSignin(req,res){
  res.status(200).json(req.user);
}


router.get('/allUsers', handelAllUsers);
async function handelAllUsers(req,res){
  const allUsers=await User.findAll();
  res.status(200).json(allUsers)
}


module.exports=router;