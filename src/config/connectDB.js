const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('doctorcare', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Success connect to database.');
    } catch (error) {
        console.error('Error to the datebase.', error);
    }
}

module.exports = connectDB;