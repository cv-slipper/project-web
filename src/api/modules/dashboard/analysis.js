import { axios } from '@/utils/request'

/**
 * 获取生产系统列表
 * @param param
 */
export function getSystemList(param) {
  return axios({
    url: '/cvAppSystem/list',
    method: 'post',
    data: param
  })
}

/**
 *获取生产域规模值
 * @param param
 */
export function getDomainScale(param) {
  return axios({
    url: '/prodDomain/prodScale',
    method: 'post',
    data: param
  })
}

/**
 * 获取生产域趋势图
 * @param param
 */
export function getDomainTrend(param) {
  return axios({
    url: '/prodDomain/prodCharts',
    method: 'post',
    data: param
  })
}

/**
 * 获取系统详情
 * @param param
 */
export function getSystemDetail(param) {
  return axios({
    url: '/cvAppSystem/details',
    method: 'post',
    data: param
  })
}