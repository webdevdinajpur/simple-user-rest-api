const User = require('../models/user.model');
const Student = require('../models/student.model');
const Fee = require('../models/fee.model');
const Result = require('../models/result.model');

const getDashboard = async (req, res) => {
    try {
        if (!req.session.userId) return res.redirect('/login');

        const user = await User.findById(req.session.userId).populate('studentId');

        if (!user) {
            req.session.destroy();
            return res.redirect('/login');
        }

        if (user.role === 'admin') {
            return res.render('dashboard', { user, role: 'admin', studentData: null, fees: [], results: [] });
        }

        if (!user.studentId) {
            return res.render('dashboard', { user, role: 'student', studentData: null, fees: [], results: [] });
        }

        const fees = await Fee.find({ studentId: user.studentId._id });
        const results = await Result.find({ studentId: user.studentId._id });

        res.render('dashboard', { user, role: 'student', studentData: user.studentId, fees, results });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getDashboard
};
