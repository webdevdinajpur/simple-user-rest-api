const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

class AuthService {
    static async registerUser(username, password, role = 'student') {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hashedPassword,
            role
        });
        await user.save();
        return user;
    }

    static async authenticateUser(username, password) {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('Invalid Credentials');
        }

        if (user.status !== 'active') {
             throw new Error('Account is not active');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid Credentials');
        }

        return user;
    }
}

module.exports = AuthService;
