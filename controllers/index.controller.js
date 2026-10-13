const Notice = require('../models/notice.model');
const Admission = require('../models/admission.model');

const getHomePage = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 }).limit(5);
        res.render('home', { notices, user: req.session.userId });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

const getLoginPage = (req, res) => {
    if (req.session.userId) return res.redirect('/dashboard');
    res.render('login', { user: null });
};

const getRegisterPage = (req, res) => {
    if (req.session.userId) return res.redirect('/dashboard');
    res.render('register', { user: null });
};

const getNoticesPage = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 });
        res.render('notices', { notices, user: req.session.userId });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

const getAdmissionPage = (req, res) => {
    res.render('admission', { user: req.session.userId });
};

const submitAdmission = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const admission = new Admission({ name, email, phone });
        await admission.save();
        res.send('Admission application submitted successfully! <a href="/">Go Home</a>');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getHomePage,
    getLoginPage,
    getRegisterPage,
    getNoticesPage,
    getAdmissionPage,
    submitAdmission
};
