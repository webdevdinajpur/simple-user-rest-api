const express = require('express');
const router = express.Router();
const {
    getHomePage, getLoginPage, getRegisterPage,
    getNoticesPage, getAdmissionPage, submitAdmission
} = require('../controllers/index.controller');

const { registerUser, loginUser, logoutUser } = require('../controllers/user.controller');

router.get('/', getHomePage);

// Auth routes
router.get('/login', getLoginPage);
router.post('/login', loginUser);
router.get('/register', getRegisterPage);
router.post('/register', registerUser);
router.get('/logout', logoutUser);

// Other public routes
router.get('/notices', getNoticesPage);
router.get('/admission', getAdmissionPage);
router.post('/admission', submitAdmission);

module.exports = router;
