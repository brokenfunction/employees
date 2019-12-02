const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const employeesRouter = require('./routes/employees');
const departmentRouter = require('./routes/departnemt');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/employees', employeesRouter);
app.use('/departments', departmentRouter);

module.exports = app;
