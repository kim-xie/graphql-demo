const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// 数据源
const datasource = {
  users: [
    {
      id: '1',
      name: 'kim',
      companyId: '1'
    },
    {
      id: '2',
      name: 'kim2',
      companyId: '2'
    }
  ],
  companys: [
    {
      id: '1',
      name: '顺丰科技'
    },
    {
      id: '2',
      name: '腾讯科技'
    }
  ]
}

// 使用 GraphQL Schema Language 创建一个 schema
const schema = buildSchema(`
  type User {
    id: String
    name: String
    company: Company
  }
  type Company {
    id: String
    name: String
  }
  type Query {
    getUser(id: String): User
    getCompany(id: String): Company
  }
`);

// root 提供所有 API 入口端点相应的解析器函数
const root = {
  getCompany: (args, request, source) => {
    console.log('args request source',args,source)
    return datasource.companys[0];
  },
  getUser: (args, request, source) => {
    console.log('args request source',args,source)
    root.getCompany(datasource.users[0].companyId)
    return datasource.users[0];
  },
  User: {
    company:(parent,args) => {
      console.log('parant',parent)
    }
  }
};

const loggingMiddleware = (req, res, next) => {
  console.log('req:');
  next();
}

const app = express();

// 中间件
app.use(loggingMiddleware);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
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

app.listen(4000,() => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
