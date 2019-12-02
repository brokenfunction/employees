const Department = require('../models').Department;

module.exports = {
    selectAll(req, res) {
        return Department
            .findAll({
                attributes: ['id', 'name']
            })
            .then(department => res.status(201).send(department))
            .catch(error => res.status(400).send(error))
    }
};