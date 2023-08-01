const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('trongthuy', 'root', '123456', {
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