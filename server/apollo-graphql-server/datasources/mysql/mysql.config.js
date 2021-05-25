const MyDatabase = require('./user')

const knexConfig = {
  client: "mysql",
  connection: {
      host: "localhost",
      port: 3306,
      user: "kim",
      password: "P@ssw0rd",
      database: "yuluwenji",
  },
};

const db = new MyDatabase(knexConfig);

module.exports = db;