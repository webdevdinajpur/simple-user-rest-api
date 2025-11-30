const path = require('path');
const cuid = require('cuid');
let allUsers = require('../models/user.model.js');

const getAllUser = (req, res)=>{
   res.status(200).json(allUsers);
};

const newUser = (req, res)=>{
   let name = req.body.name;
   let email = req.body.email;
   let newUser = {
      id: cuid(),
      name: name,
      email: email
   };
   allUsers.push(newUser);
   res.status(201).json(allUsers);
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  
  allUsers
    .filter((user)=>user.id===userId)
    .map((selecteduser)=>{
       selecteduser.name = name,
       selecteduser.email = email;
    });
  res.json(allUsers);
};

const deleteUser = (req, res)=>{
   const userId = req.params.id;
   allUsers = allUsers
    .filter((user)=>user.id!==userId);
    res.json(allUsers);
};


module.exports = {
   getAllUser,
   newUser,
   updateUser,
   deleteUser
};