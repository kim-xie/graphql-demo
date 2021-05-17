const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = require('./schema/index.js')

// 使用 GraphQL Schema Language 创建一个 schema
// const schema = buildSchema(`
//   type Query {
//     hello: String
//     world: String
//   }
// `);

// root 提供所有 API 入口端点相应的解析器函数


const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000,() => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
