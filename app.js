var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")
var tweetRouter = require('./routes/tweet');
var userRouter = require('./routes/user');
var interactionRouter = require('./routes/interaction');

var app = express();
app.use(cors({origin: '*'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tweet', tweetRouter);
app.use('/user', userRouter);
app.use('/interaction', interactionRouter);

module.exports = app;
