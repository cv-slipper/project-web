import { axios } from '@/utils/request'

/**
 * 获取分行列表
 * @param {Object} params
 */
export function getBranchList(params) {
  return axios({
    url: '/cvChargingSet/info',
    method: 'post',
    data: params
  })
}