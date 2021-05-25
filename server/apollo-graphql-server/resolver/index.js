const {books} = require("../datasources")
const {dateScalar} = require('../typeDefs/scalarType.js')

/**
 * Resolver arguments (parent, args, context, info)
 * 
 * Resolver chains
 */
const resolvers = {
  // Date: dateScalar,
  Query: {
    books: () => books,
    users: (parent,args,{dataSources: { db }}) => db.getAllUsers()
  },
};

module.exports = resolvers
