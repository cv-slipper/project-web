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

/**
 * 获取异常信息列表
 * @param {Object} data
 */
export function getExceptionPage(data) {
  return axios({
    url: '/cvException/page',
    method: 'post',
    data
  })
}

/**
 * 获取异常信息列表
 * @param {Object} data
 */
export function getExceptionList(data) {
  return axios({
    url: '/cvException/list',
    method: 'post',
    data
  })
}

/**
 * 处理异常信息
 * @param {Object} data
 */
export function handleException(params) {
  return axios({
    url: '/cvException/handle',
    method: 'post',
    data: params
  })
}

/**
 * 获取分行列表
 * @param {Object} data
 */
export function getBranchList() {
  return axios({
    url: '/prodDomain/branchList',
    method: 'get'
  })
}

/**
 * 获取系统列表
 */
export function getSystemListByBranch() {
  return axios({
    url: '/prodDomain/appSystemInfoList',
    method: 'get'
  })
}

/**
 * 获取异常详情
 * @param {Object} data
 */
export function getExceptionDetail(data) {
  return axios({
    url: '/cvException/details',
    method: 'post',
    data
  })
}


