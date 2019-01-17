import { request, config } from 'utils'

export async function query (params) {
  return request({
    url: '/api/warehouse/searchShareWarehouse',
    method: 'post',
    data: params,
  })
}
