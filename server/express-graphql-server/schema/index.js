const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql')
const _ = require('lodash')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt}
  }
})

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {type: UserType},
    args: {id: {type: GraphQLString}},
    resolve: (parentValue, args) => {
      return _.find(users,{id: args.id})
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQueryType
})