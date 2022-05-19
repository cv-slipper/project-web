import { axios } from '@/utils/request'

/**
 * 获取服务费
 * @param param
 */
export function getServiceFee(param) {
  return axios({
    url: '/cvDailyCost/serverPriceList',
    method: 'post',
    data: param
  })
}

/**
 * 获取前端费用
 * @param param
 */
export function getFrontFee(param) {
  return axios({
    url: '/cvDailyCost/forePriceList',
    method: 'post',
    data: param
  })
}

/**
 * 获取后端费用
 * @param param
 */
export function getBackFee(param) {
  return axios({
    url: '/cvDailyCost/backPriceList',
    method: 'post',
    data: param
  })
}