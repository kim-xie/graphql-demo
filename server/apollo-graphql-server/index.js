const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'kim hello',
};

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    schema,
    mocks, // Note: If typeDefs has custom scalar types, resolvers must still contain the serialize, parseValue, and parseLiteral functions
  });
  await server.start();

  server.applyMiddleware({ app });

  app.use((req, res) => {
    console.log('req',req)
    res.status(200);
    res.send('Hello!');
    res.end();
  });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

// 启动服务
startApolloServer()
