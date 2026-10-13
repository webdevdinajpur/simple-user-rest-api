require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

// Route files
const indexRoute = require('./routes/index.route.js');
const studentRoute = require('./routes/student.route.js');

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/school')
  .then(() => console.log('MongoDB connected to school db'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'school-management-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Use routes
app.use('/', indexRoute);
app.use('/', studentRoute);

// invalid path handeling message
app.use((req,res,next)=>{
   res.send('<h1 style="text-align:center;"> Invalid Route </h1>');
});

// export app from this module
module.exports = app;
