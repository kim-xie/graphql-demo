const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql')
const axios = require('axios')

const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt},
    company: {
      type: CompanyType,
      resolve(parentValue, args){
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then(res=>res.data)
      }
    }
  })
})

const CompanyType = new GraphQLObjectType({
  name: 'company',
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    desc: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args){
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`).then(res => res.data)
      }
    }
  }
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve: (parentValue, args) => {
        return axios.get(`http://localhost:3000/users/${args.id}`).then(res=>res.data)
      }
    },
    company: {
      type: CompanyType,
      args: {id: {type: GraphQLString}},
      resolve: (parentValue, args) => {
        return axios.get(`http://localhost:3000/companies/${args.id}`).then(res=>res.data)
      }
    }
  }
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLInt},
        companyId: {type: GraphQLString}
      },
      resolve: (parentValue, {firstName, age, companyId}) => {
        return axios.post(`http://localhost:3000/users`,{firstName, age, companyId}).then(res=>res.data)
      }
    },
    company: {
      type: CompanyType,
      args: {id: {type: GraphQLString}},
      resolve: (parentValue, args) => {
        return axios.get(`http://localhost:3000/companies/${args.id}`).then(res=>res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})