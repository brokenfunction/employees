const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();
const userController = require('../controllers').user;

//router.get('/:id', userController.selectByID);
router.post('/', userController.register);
router.post('/login', userController.login);
router.get('/:id', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.error(err);
        }
        if (info !== undefined) {
            console.error(info.message);
            res.status(403).send(info.message);
        } else {
            console.log('fff')
        }
    })(userController.selectByID);
});


module.exports = router;
