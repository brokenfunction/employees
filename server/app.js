const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

require('./middleware/passport');


const employeesRouter = require('./routes/employees');
const departmentRouter = require('./routes/departnemt');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));

app.use('/employees', employeesRouter);
app.use('/departments', departmentRouter);
app.use('/users', usersRouter);

module.exports = app;
