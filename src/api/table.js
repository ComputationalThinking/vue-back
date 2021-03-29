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
