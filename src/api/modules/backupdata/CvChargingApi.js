import { axios } from '@/utils/request'

/**
 * 计费设置列表接口方法
 */
export function getChargingList(parameter) {
  return axios({
    url: '/cvChargingSet/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加计费设置接口方法
 * @param parameter
 */
export function addCharging(parameter) {
  return axios({
    url: '／cvChargingSet/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 根据id获取计费设置详情接口方法
 * @param parameter
 */
export function getChargingDetail(id) {
  return axios({
    url: '/cvChargingSet/queryById',
    method: 'get',
    params: { id }
  })
}

/**
 *通过id删除计费设置接口方法
 * @param parameter
 */
export function deleteCharging(id) {
  return axios({
    url: '/cvChargingSet/delete',
    method: 'DELETE',
    data: { id }
  })
}

/**
 * 修改计费设置接口方法
 * @param parameter
 */
export function updateCharging(parameter) {
  return axios({
    url: '/cvChargingSet/edit',
    method: 'put',
    data: parameter
  })
}