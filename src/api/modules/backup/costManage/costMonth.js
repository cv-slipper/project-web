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

/**
 * 获取月账单详情
 * @param {Object} data
 */
export function getCostMonthDetail(data) {
  return axios({
    url: '/cvCostMonth/detailsList',
    method: 'post',
    data: data
  })
}
