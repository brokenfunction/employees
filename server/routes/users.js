const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controllers').user;
require('../middleware/passport')(passport);

router.get('/:id', userController.selectByID);
router.post('/', userController.register);
router.post('/login', userController.login);

module.exports = router;
