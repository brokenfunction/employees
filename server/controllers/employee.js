const Sequelize = require('sequelize');
const { Employee } = require('../models');

module.exports = {
    create(req, res) {
        return Employee
            .create({
                name: req.body.name,
                active: req.body.active,
                departmentID: req.body.departmentID
            })
            .then(employee => res.status(201).send(employee))
            .catch(error => {
                if(error instanceof Sequelize.ForeignKeyConstraintError ) {
                    res.status(400).json({
                        error: 'Department ID is not valid'
                    });
                }
            });
    },
    selectByPage(req, res) {
        const limit = parseInt(req.query.limit, 10) || 50;
        const page = ( parseInt(req.query.page, 10) > 0 ) ? parseInt(req.query.page, 10) : 1;
        const offset = ( page - 1) * limit;
        const searchQuery = (search) => {
            if(!search) return;
            return {
                where: {
                    name: {
                        like: `${search}%`
                    }
                }
            }
        };

        return Employee
            .findAndCountAll ({
                attributes: ['id', 'name', 'active', 'departmentID'],
                ...searchQuery(req.query.s),
                offset,
                limit
            })
            .then(employee => {
                const pagination = {
                    totalPages: Math.ceil(employee.count / limit),
                    currentPage: page,
                    limit
                };
                res.status(201).send({employee: employee.rows, pagination});
            })
            .catch(error => res.status(400).send(error))
    },
    selectByID(req, res) {
        return Employee
            .findOne({
                attributes: ['id', 'name', 'active', 'departmentID'],
                where: {
                    id: parseInt(req.params.id, 10)
                },
                rejectOnEmpty: true
            })
            .then(employee => res.status(200).send(employee))
            .catch(error => res.status(404).json({ err: `Employee with id = [${req.params.id}] doesn\'t exist.`}))
    },
    deleteEmployee(req, res) {
        return Employee
            .destroy({
                where: {
                    id: parseInt(req.params.id, 10)
                }
            })
            .then(function (deletedRecord) {
                if(deletedRecord === 1) {
                    res.status(201).json({message:`Employee with id = [${req.params.id}] deleted successfully.`});
                }
                else {
                    res.status(404).json({message:`Employee with id = [${req.params.id}] doesn\'t exist.`})
                }
            })
    },
    updateEmployee(req, res) {
        return Employee
            .update({
                name: req.body.name,
                active: req.body.active,
                departmentID: req.body.departmentID
                },
                {
                    where: {
                        id: parseInt(req.params.id, 10)
                    }
                })
            .then(() => Employee.findOne({
                attributes: ['id', 'name', 'active', 'departmentID'],
                where: {
                    id: parseInt(req.params.id, 10)
                }}))
            .then(employee =>
                res.status(201).json(employee)
            )
            .catch(err =>
                res.status(500).send(err.message)
            )
    }
};