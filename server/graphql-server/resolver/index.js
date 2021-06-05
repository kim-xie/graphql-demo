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
		getUser: (parent, args, context, info) => {
			return axios
				.get(`http://localhost:3000/users/${args.id}`)
				.then((res) => res.data)
		},
		users: (parent, args, { dataSources }) => {
			console.log('args', args)
			return (
				(dataSources && dataSources.db && db.getAllUsers()) ||
				axios
					.get(
						`http://localhost:3000/users?_page=${
							(args.offset + 1)||0
						}&_limit=${args.limit||100}`
					)
					.then((res) => {
						// console.log('res',res)
						return {
							data: res.data,
							total: Number(res.headers['x-total-count']),
						}
					})
			)
		},
		companies: (parent, args, { dataSources }) => {
			return (
				(dataSources && dataSources.db && db.getAllCompanies()) ||
				axios.get(`http://localhost:3000/companies?_page=${
          (args.offset + 1)||0
        }&_limit=${args.limit||100}
      `).then((res) => {
        return {
          data: res.data,
          total: Number(res.headers['x-total-count']),
        }
      })
			)
		},
		getCompany: (parent, args, context, info) => {
			return axios
				.get(`http://localhost:3000/companies/${args.id}`)
				.then((res) => res.data)
		},
	},
	User: {
		company: (parent,args,context,info) => {
      console.log('User.company',parent,args)
			return axios
				.get(`http://localhost:3000/companies/${parent.companyId}`)
				.then((res) => res.data)
		},
  },
  Company: {
    users: (parent) => {
			return axios
				.get(`http://localhost:3000/companies/${parent.id}/users`)
				.then((res) => res.data)
		},
  },
	Mutation: {
		addCompany: (parent, args, context, info) => {
			console.log('addCompany', args)
			return axios
				.post(`http://localhost:3000/companies`, args)
				.then((res) => res.data)
    },
    updateCompany: (parent, args, context, info) => {
			console.log('updateCompany', args)
			return axios
				.put(`http://localhost:3000/companies/${args.id}`, args)
				.then((res) => res.data)
		},
		deleteCompany: (parent, args, context, info) => {
			console.log('deleteCompany', args)
			return axios
				.delete(`http://localhost:3000/companies/${args.id}`)
				.then((res) => res.data)
		},
		addUser: (parent, args, context, info) => {
      console.log('addUser', args)
			return axios
				.post(`http://localhost:3000/users`, args)
        .then((res) => res.data)
		},
		updateUser: (parent, args, context, info) => {
			return axios
				.put(`http://localhost:3000/users/${args.id}`, args)
				.then((res) => res.data)
		},
		deleteUser: (parent, args, context, info) => {
			return axios
				.delete(`http://localhost:3000/users/${args.id}`)
				.then((res) => res.data)
		},
  },
}

module.exports = resolvers
