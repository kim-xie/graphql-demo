const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios')

// 使用 GraphQL Schema Language 创建一个 schema
const schema = buildSchema(`
  type Company {
    id: String
    name: String
  }
  type User {
    id: String
    name: String
    company: Company
  }
  type Query {
    getUser(id: String): User
    getCompany(id: String): Company
  }
`);

// root 提供所有 API 入口端点相应的解析器函数
const root = {
  getCompany: (args, request, source) => {
    return axios.get(`http://localhost:3000/companies/${args.id}`).then(res => res.data)
  },
  getUser: (args, request, source) => {
    return axios.get(`http://localhost:3000/users/${args.id}`).then(res => res.data)
  }
  
};

// 中间件拦截
const loggingMiddleware = (req, res, next) => {
  console.log('loggingMiddleware:',req);
  next();
}

const app = express();

// 使用中间件
app.use(loggingMiddleware);

// 拦截/graphql请求
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
  formatError: (error) => {
    console.log('error',error)
  }
}));

/**
 * graphqlHTTP({
    schema: GraphQLSchema,
    graphiql?: ?boolean,
    rootValue?: ?any,
    context?: ?any,
    pretty?: ?boolean,
    formatError?: ?Function,
    validationRules?: ?Array<any>,
  }): Middleware
 */

app.listen(8888,() => {
  console.log('Running a GraphQL API server at http://localhost:8888/graphql');
});
