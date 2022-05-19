import { axios } from '@/utils/request'

/**
 * 获取月账单列表
 * @param {Object} data
 */
export function getCostMonthList(data) {
  return axios({
    url: '/cvCostMonth/list',
    method: 'post',
    data: data
  })
}
