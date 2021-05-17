const { makeExecutableSchema } = require('apollo-server-express')
const typeDefs = require('../typeDefs')
const resolvers = require('../resolver')
const {UpperCaseDirective} = require('../directives')

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    upper: UpperCaseDirective,
  }
})