const express = require('express');
const faker = require('faker/locale/zh_CN')
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const db = require('./datasource/mysql/mysql.config')

/**
 * 自定义mock数据
 * 可借助faker.js | mock.js造模拟数据
 **/

// const mocks = {
//   // Int: () => faker.datatype.number(),
//   // String: () => faker.datatype.string(),
//   User: () => ({
//     id: faker.datatype.number(10),
//     name: faker.name.firstName() + faker.name.lastName(),
//     company: {
//       name: faker.company.companyName()
//     }
//   }),
//   Company: () => ({
//     id: faker.datatype.number(10),
//     name: faker.company.companyName()
//   }),
//   UserList: () => ({
//     data: faker.datatype.array({
//       id: faker.datatype.number(10),
//       name: faker.name.firstName() + faker.name.lastName()
//     }),
//     total: 1
//   }),
//   CompanyList: () => ({
//     data: faker.datatype.array({
//       id: faker.datatype.number(10),
//       name: faker.company.companyName()
//     }),
//     total: 1
//   })
// };

async function startApolloServer() {
  const app = express();

  const server = new ApolloServer({
    schema,
    playground: true,
    cacheControl: false,
    uploads: false,
    context: ({ req }) => ({
      token: req.headers.authorization || ''
    }),
    tracing: false,
    // dataSources: () => ({ db }),
    mocks: false,
    formatError: (error) => {
      console.log('error',error)
    }
  });

  /**
   * Apollo 相关配置项
      context,
      resolvers,
      schema,
      schemaDirectives,
      modules,
      typeDefs,
      parseOptions = {},
      introspection,
      mocks,
      mockEntireSchema,
      extensions,
      subscriptions,
      uploads,
      playground,
      plugins,
      gateway,
      cacheControl,
      experimental_approximateDocumentStoreMiB,
      stopOnTerminationSignals,
      apollo,
      engine,
      ...requestOptions
   * 
   */

  await server.start();

  server.applyMiddleware({ app });
    
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

// 启动服务
startApolloServer()
