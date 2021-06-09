const express = require('express');
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const db = require('./datasource/mysql/mysql.config')

/**
 * 自定义mock数据
 * 可借助faker.js | mock.js造模拟数据
 **/

// const mocks = {
//   Int: () => 6,
//   Float: () => 22.1,
//   String: () => 'kim hello',
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

  app.use(cors())
  
  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

// 启动服务
startApolloServer()
