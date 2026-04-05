const cookieParser = require('cookie-parser');
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const app = express();
app.use(express.json());
app.use(cookieParser());// To set data in the cookies

app.use('/api/auth', authRoutes);
module.exports = app;