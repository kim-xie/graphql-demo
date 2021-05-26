var { graphql, buildSchema } = require('graphql');
 
var schema = buildSchema(`
  type User {
    id: String
    name: String
  } 
  type Query {
    hello: String
    world: String
    getUser(id: String): User
  }
  type Mutation {
    hello: String
    world: String
    addUser(id: String,name: String): User
  }
`);
 
var root = { 
  hello: () => 'Hello world!', 
  world: () => 'World', 
  getUser: (args) => ({name: "kim1",id: "1"}), 
  addUser: (args) => {
    console.log("args",args)
  }
};

const query = `
  query {
    getUser(id: "1"){
      name
    }
  }
`

const mutation = `
  mutation {
    addUser(id: "1",name: "kim2"){
      name
    }
  }
`
 
graphql(schema, query || mutation, root).then((response) => {
  console.log('response', response);
});