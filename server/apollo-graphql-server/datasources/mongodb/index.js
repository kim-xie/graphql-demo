const { MongoClient } = require('mongodb')

const Users = require('./user.js')

const client = new MongoClient('mongodb://localhost:27017/graphql-demo')
client.connect(function(err) {
  if(err){
		console.error(err);
		return;
	}else{
		console.log("数据库连接成功！");
	}
})

module.exports = () => ({
  users: new Users(client.db().collection('users'))
  // OR
  // users: new Users(UserModel)
})
