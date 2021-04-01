import request from '@/utils/request'
import request1 from '@/utils/request1'
export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getManageList(params) {
  return request1({
    url: '/manager/getPageData',
    method: 'get',
    params
  })
}

export function getNewsList(params) {
  return request1({
    url: '/News/getPageData',
    method: 'get',
    params
  })
}

export function getMemberList(params) {
  return request1({
    url: '/member/getPageData',
    method: 'get',
    params
  })
}

export function getAchieveList(params) {
  return request1({
    url: '/achieve/getPageData',
    method: 'get',
    params
  })
}
