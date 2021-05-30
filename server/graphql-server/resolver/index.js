const axios = require('axios')
const { dateScalar } = require('../typeDefs/scalarType.js')

/**
 * Resolver arguments (parent, args, context, info)
 * 
 * Resolver chains
 */
const resolvers = {
  // Date: dateScalar,
  Query: {
    getUser: (parent,args,context,info) => {
      return axios.get(`http://localhost:3000/users/${args.id}`).then(res => res.data)
    },
    users: (parent,args,{dataSources}) => {
      return (dataSources && dataSources.db && db.getAllUsers()) || axios.get(`http://localhost:3000/users`).then(res => res.data)
    },
    companies: (parent,args,{dataSources}) => {
      return (dataSources && dataSources.db && db.getAllCompanies()) || axios.get(`http://localhost:3000/companies`).then(res => res.data)
    },
    getCompany: (parent,args,context,info) => {
      return axios.get(`http://localhost:3000/companies/${args.id}`).then(res => res.data)
    },
  },
  User: {
    company: (parent) => {
      return axios.get(`http://localhost:3000/companies/${parent.companyId}`).then(res => res.data)
    }
  },
  Mutation: {
    addCompany: (parent,args,context,info)=>{
      console.log('args',args)
      return axios.post(`http://localhost:3000/companies`,args).then(res=>res.data)
    },
    addUser: (parent,args,context,info)=>{
      console.log('args',args)
      return axios.post(`http://localhost:3000/users`,args).then(res=>res.data)
    },
    updateUser: (parent,args,context,info)=>{
      console.log('args',args)
      return axios.put(`http://localhost:3000/users/${args.id}`, args).then(res=>res.data)
    },
    deleteUser: (parent,args,context,info)=>{
      console.log('args',args)
      return axios.delete(`http://localhost:3000/users/${args.id}`).then(res=>res.data)
    },
  }
};

module.exports = resolvers
