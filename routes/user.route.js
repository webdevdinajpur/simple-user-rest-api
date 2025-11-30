const express = require('express');
const router = express.Router();
const {getAllUser,newUser,updateUser,deleteUser} = require('../controllers/user.controller.js');


router.get('/', getAllUser);
router.post('/', newUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// export router from the module
module.exports = router;