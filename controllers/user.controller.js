const AuthService = require('../services/auth.service');

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Default role is always student for public registration to prevent mass assignment
        const role = 'student';
        await AuthService.registerUser(username, password, role);
        res.redirect('/login');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await AuthService.authenticateUser(username, password);

        req.session.userId = user._id;
        req.session.role = user.role;
        res.redirect('/dashboard');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
