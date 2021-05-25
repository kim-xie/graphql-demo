const { SQLDataSource } = require("datasource-sql");

const MINUTE = 60;

class MyDatabase extends SQLDataSource {
  getAllUsers() {
    return this.knex
      .select("*")
      .from("user")
      .cache(MINUTE);
  }
}

module.exports = MyDatabase;