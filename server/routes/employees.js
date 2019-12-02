const express = require('express');

const router = express.Router();
const employeeController = require('../controllers').employee;

router.get('/:id', employeeController.selectByID);
router.post('/', employeeController.create);
router.get('/', employeeController.selectByPage);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
