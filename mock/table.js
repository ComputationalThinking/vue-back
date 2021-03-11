const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@increment',
    title: '@sentence(10, 20)',
    author: '张三',
    create_time: '@datetime',
    type: '国内动态'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
