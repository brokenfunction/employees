const express = require('express');

const router = express.Router();
const userController = require('../controllers').user;

router.get('/:id', userController.selectByID);
router.post('/', userController.register);
router.post('/login', userController.login);

module.exports = router;
