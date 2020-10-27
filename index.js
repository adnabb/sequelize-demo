const { Sequelize } = require('sequelize');
const {host, database, user, password} = require('./config/mysql')

// const sequelize = new Sequelize('postgres://blog:@59.110.70.85:5432/development')
const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql'
});

const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectPostgres()
