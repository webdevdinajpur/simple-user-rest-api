// calling packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


// route files calling
const userRoute = require('./routes/user.route.js');

// use packages and more
const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// route file use
app.use('/api/user',userRoute);

// home route
app.get('/', (req, res)=>{
   res.sendFile(__dirname+'/views/update user.html');
});

// signup route
app.get('/signup', (req, res)=>{
   res.sendFile(__dirname+'/views/newUser.html');
});

// invalid path handeling message
app.use((req,res,next)=>{
   res.send('<h1 style="text-align:center;"> Invalid Route </h1>');
});

// export app from this module
module.exports = app;