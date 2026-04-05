const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cookieParser());// To set data in the cookies

module.exports = app;