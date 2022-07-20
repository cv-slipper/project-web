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

/**
 * 获取用户列表
 */
export function getUserList() {
  return axios({
    url: '/sys/user/list',
    method: 'get'
  })
}

/**
 * 初始化接口
 */
export function initSystem(params) {

  return axios({
    url: '/cvAppSystem/initInfo',
    method: 'get',
    params
  })
}

/**
 * 获取手机验证码
 */
export function getPhoneCode(params) {

  return axios({
    url: '/cvAppSystem/initInfo',
    method: 'get',
    params
  })
}