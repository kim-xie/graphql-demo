const { MongoDataSource } = require('apollo-datasource-mongodb')

class Users extends MongoDataSource {
  getUser(userId) {
    return this.findOneById(userId)
  }

  getUsers() {
    console.log('this.Model',this.Model)
    return this.findByFields("name")
  }
}

module.exports = Users