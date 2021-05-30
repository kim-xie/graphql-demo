const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const db = require('./datasource/mysql/mysql.config')

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
      authScope: req.headers.authorization || ''
    }),
    tracing: true,
    // dataSources: () => ({ db }),
    // mocks: true,
  });
  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

// 启动服务
startApolloServer()
