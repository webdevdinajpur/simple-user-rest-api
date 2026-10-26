const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user.model');

describe('Authentication Flow', () => {
    beforeAll(async () => {
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/school_test';
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(uri);
        }
    });

    afterAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await User.deleteMany({ username: 'teststudent' });
            await mongoose.disconnect();
        }
    });

    beforeEach(async () => {
        if (mongoose.connection.readyState !== 0) {
            await User.deleteMany({ username: 'teststudent' });
        }
    });

    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                username: 'teststudent',
                password: 'password123',
                role: 'student'
            });

        expect(res.statusCode).toEqual(302); // Redirect to login
        expect(res.header.location).toBe('/login');

        const user = await User.findOne({ username: 'teststudent' });
        expect(user).toBeTruthy();
        expect(user.role).toBe('student');
    });

    it('should not register a duplicate user', async () => {
        await request(app)
            .post('/auth/register')
            .send({
                username: 'teststudent',
                password: 'password123',
                role: 'student'
            });

        const res = await request(app)
            .post('/auth/register')
            .send({
                username: 'teststudent',
                password: 'password123',
                role: 'student'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toBe('User already exists');
    });

    it('should login an existing user', async () => {
        await request(app)
            .post('/auth/register')
            .send({
                username: 'teststudent',
                password: 'password123',
                role: 'student'
            });

        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'teststudent',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(302); // Redirect to dashboard
        expect(res.header.location).toBe('/dashboard');
        expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should fail login with incorrect password', async () => {
        await request(app)
            .post('/auth/register')
            .send({
                username: 'teststudent',
                password: 'password123',
                role: 'student'
            });

        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'teststudent',
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toBe('Invalid Credentials');
    });
});
