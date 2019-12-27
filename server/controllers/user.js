const Sequelize = require('sequelize');
const { User } = require('../models');

module.exports = {
    register(req, res) {
        return User
            .create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            })
            .then(user => {
                return res.status(201).send(user);
            })
            .catch(error => {
                if(error instanceof Sequelize.UniqueConstraintError ) {
                    res.status(400).send(error.errors.message);
                } else {
                    res.status(500).send(error);
                }
            });
    },
    selectByID(req, res) {
        return User
            .findOne({
                attributes: ['id', 'name', 'password', 'email'],
                where: {
                    id: parseInt(req.params.id, 10)
                },
                rejectOnEmpty: true
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(404).json({ err: `User with id = [${req.params.id}] doesn\'t exist.`}))
    },
    login(req, res) {
        return User.findOne({ where: { email: req.body.email } }).then(async function (user) {
            if (!user) {
                res.status(401).json({ message: 'No such user found' });
            } else if (!await user.validPassword(req.body.password)) {
                res.status(401).json({ msg: 'Password is incorrect' });
            } else {
                let payload = { id: user.id };
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({ msg: 'ok', token: token });
            }
        });
    }

};