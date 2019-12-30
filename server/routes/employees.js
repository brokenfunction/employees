const express = require('express');
const passport = require('passport');

const router = express.Router();
const employeeController = require('../controllers').employee;

require('../middleware/passport')(passport);

router.get('/:id', passport.authenticate('jwt', {session:false}), employeeController.selectByID);
router.post('/', employeeController.create);
router.get('/', employeeController.selectByPage);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
