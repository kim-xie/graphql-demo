const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
// const dataSources = require('./datasources/mongodb')
const db = require('./datasources/mysql/mysql.config')

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'kim hello',
};

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    schema,
    dataSources: () => ({ db }),
    mocks,
  });
  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

// 启动服务
startApolloServer()
