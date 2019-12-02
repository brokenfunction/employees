const express = require('express');
const router = express.Router();
const departmentController = require('../controllers').department;

router.get('/', departmentController.selectAll);

module.exports = router;
