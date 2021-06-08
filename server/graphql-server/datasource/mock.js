const faker = require('faker')
require('faker/locale/zh_CN')
    
function generateMockDatas () {
  let users = []
  let companies = []
  for (let id = 0; id < 10; id++) {
    const name = faker.name.findName()
    users.push({
      "id": id,
      "name": name,
      "companyId": id%3
    })
  }
  for (let id = 0; id < 3; id++) {
    const name = faker.company.companyName(1)
    companies.push({
      "id": id,
      "name": name,
    })
  }
  return { users, companies }
}

module.exports = generateMockDatas