## How to setup project

1. Make clone of directory
2. Change directory to `server` and install dependencies and dev-dependencies ( make sure you have installed sequelize globally)
3. Create MySql database `employees`
4. Configure database environment in `config/config.json`
5. Run migrations `sequelize db:migrate`
6. Run seeder `sequelize db:seed:all`
7. Start a server: `npm start`

8. Change directory to `client` and install dependencies and dev-dependencies
9. Start client side `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.