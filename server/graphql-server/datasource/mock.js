const faker = require('faker/locale/zh_CN')
    
function generateMockDatas () {
  let users = []
  let companies = []
  for (let id = 0; id < 10; id++) {
    users.push({
      "id": id,
      "name": faker.name.firstName() + faker.name.lastName(),
      "companyId": id%3
    })
  }
  for (let id = 0; id < 3; id++) {
    companies.push({
      "id": id,
      "name": faker.company.companyName(),
    })
  }
  return { users, companies }
}

module.exports = generateMockDatas