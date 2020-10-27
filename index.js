const { Sequelize, DataTypes } = require('sequelize');
const {host, database, user, password} = require('./config/mysql')

// const sequelize = new Sequelize('postgres://blog:@59.110.70.85:5432/development')
const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql'
})

const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

// connectPostgres()

const User = sequelize.define('User', {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: 'green'
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER
}, {
  freezeTableName: true
})

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User) // true

const synchronization = async () => {
  await User.sync()
  console.log("The table for the User model was just (re)created!")
}

// synchronization()

const jane = User.build({ name: "Jane" })
console.log(jane instanceof User) // true
console.log(jane.name);// "Jane"

const saveData = async() => {
  await jane.save()
  console.log('Jane was saved to the database!')
}

// saveData()

const deleteData = async() => {
  const id = User.build({id: 4})
  await id.destroy()
  console.log('Jane was deleted from the database!')
}

// deleteData()

const reloadData = async() => {
  const lucy = await User.create({ name: "lucy" });
  console.log(lucy.name); // "lucy"
  console.log(lucy.favoriteColor); // "green"
  lucy.name = "lucy II";
  lucy.favoriteColor = "blue";
  await lucy.save({ fields: ['name'] });
  console.log(lucy.name); // "lucy II"
  console.log(lucy.favoriteColor); // "blue"
  // The above printed blue because the local object has it set to blue, but
  // in the database it is still "green":
  await lucy.reload();
  console.log(lucy.name); // "lucy II"
  console.log(lucy.favoriteColor); // "green"
}

// reloadData()

const findData = async() => {
  const users = await User.findAll();
  console.log(users.every(user => user instanceof User)); // true
  console.log("All users:", JSON.stringify(users, null, 2));
}

findData()

