'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */
    await queryInterface.bulkInsert('Departments', [
      {
        name: 'SEDO',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'QAO',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'PMO',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'PDO',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'PMO',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'BAO',
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ], {});

    const departments = await queryInterface.sequelize.query(
        `SELECT id from Departments;`
    );

    const departmentsRows = departments[0];

    return await queryInterface.bulkInsert('Employees', [
      {
        name: 'Roman Zvyazok',
        active: (Math.random() >= 0.5) ? 1 : 0,
        departmentId: departmentsRows[0].id,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Bred Pitt',
        active: (Math.random() >= 0.5) ? 1 : 0,
        departmentId: departmentsRows[1].id,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'John Doe',
        active: (Math.random() >= 0.5) ? 1 : 0,
        departmentId: departmentsRows[2].id,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Bill Gates',
        active: (Math.random() >= 0.5) ? 1 : 0,
        departmentId: departmentsRows[3].id,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Marshall Mathers',
        active: (Math.random() >= 0.5) ? 1 : 0,
        departmentId: departmentsRows[4].id,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Monica Bellucci',
        active: (Math.random() >= 0.5) ? 1 : 0,
        departmentId: departmentsRows[5].id,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Cristiano Ronaldo',
        active: (Math.random() >= 0.5) ? 1 : 0,
        departmentId: departmentsRows[0].id,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
          name: 'Jeff Bezos',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[0].id,
          createdAt : new Date(),
          updatedAt : new Date()
      },
      {
          name: 'Bill Gates',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[0].id,
          createdAt : new Date(),
          updatedAt : new Date()
      },
      {
          name: 'Jack Nicholson',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[1].id,
          createdAt : new Date(),
          updatedAt : new Date()
      },
      {
          name: 'Marlon Brando',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[2].id,
          createdAt : new Date(),
          updatedAt : new Date()
      },
      {
          name: 'Robert De Niro',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[3].id,
          createdAt : new Date(),
          updatedAt : new Date()
      },
      {
          name: 'Al Pacino',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[4].id,
          createdAt : new Date(),
          updatedAt : new Date()
      },
      {
          name: 'Daniel Day-Lewis',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[5].id,
          createdAt : new Date(),
          updatedAt : new Date()
      },
      {
          name: 'Dustin Hoffman',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[3].id,
          createdAt : new Date(),
          updatedAt : new Date()
      },
      {
          name: 'Thomas Jeffrey Hanks',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[0].id,
          createdAt : new Date(),
          updatedAt : new Date()
      },
      {
          name: 'Anthony Hopkins',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[0].id,
          createdAt : new Date(),
          updatedAt : new Date()
      },
      {
          name: 'Paul Newman',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[0].id,
          createdAt : new Date(),
          updatedAt : new Date()
      },
      {
          name: 'Denzel Washington',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[0].id,
          createdAt : new Date(),
          updatedAt : new Date()
      },
      {
          name: 'Spencer Tracy',
          active: (Math.random() >= 0.5) ? 1 : 0,
          departmentId: departmentsRows[0].id,
          createdAt : new Date(),
          updatedAt : new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      */

    await queryInterface.bulkDelete('Employees', null, {});
    await queryInterface.bulkDelete('Departments', null, {});
  }
};
