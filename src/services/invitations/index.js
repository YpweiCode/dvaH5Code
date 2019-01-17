import { request, config } from 'utils'

export async function joinus (params) {
  return request({
    url: '/api/staff/service/confirmJoinDepartment',
    method: 'post',
    data: params,
  })
}
export async function queryStatus (params) {
  return request({
    url: '/api/staff/service/checkInvitation',
    method: 'post',
    data: params,
  })
}
