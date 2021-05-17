const {books} = require("../datasources")
const {dateScalar} = require('../typeDefs/scalarType.js')

const resolvers = {
  // Date: dateScalar,
  Query: {
    books: () => books,
  },
};

module.exports = resolvers
