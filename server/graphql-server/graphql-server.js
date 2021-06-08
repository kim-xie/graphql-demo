const { graphql, buildSchema } = require('graphql');
 
/**
 * 1、类型描述
 */
const schema = buildSchema(`
  type User {
    id: String
    name: String
  } 
  type Query {
    getUser(id: String): User
  }
  type Mutation {
    addUser(id: String,name: String): User
  }
`);
 
/**
 * 2、resolver处理器
 */
const root = { 
  getUser: (args) => ({name: "kim1",id: "1"}), 
  addUser: (args) => {
    console.log("args",args)
  }
};

/**
 * 3、查询语句
 */
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
/**
 * 4、执行
 */
graphql(schema, query || mutation, root).then((response) => {
  console.log('response', response);
});