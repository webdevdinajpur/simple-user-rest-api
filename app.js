require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Route files
const indexRoute = require('./routes/index.route.js');
const studentRoute = require('./routes/student.route.js');
const authRoute = require('./routes/auth.route.js');

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/school';
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(MONGODB_URI)
      .then(() => console.log('MongoDB connected to school db'))
      .catch(err => console.error('MongoDB connection error:', err));
}

const app = express();

// Security and Rate Limiting
app.use(helmet());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session configuration
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'school-management-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
};

if (process.env.NODE_ENV !== 'test') {
    sessionConfig.store = MongoStore.create({
        mongoUrl: MONGODB_URI,
        collectionName: 'sessions'
    });
}

app.use(session(sessionConfig));

// Use routes
app.use('/auth', authRoute);
app.use('/', indexRoute);
app.use('/', studentRoute);

// invalid path handeling message
app.use((req,res,next)=>{
   res.status(404).send('<h1 style="text-align:center;"> Invalid Route </h1>');
});

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// export app from this module
module.exports = app;
