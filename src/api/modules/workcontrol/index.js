import { axios } from '@/utils/request'

/**
 * 获取作业列表
 * @param {Object} data
 */
export function getWorkList(data) {
  return axios({
    url: '/job/list',
    method: 'post',
    data
  })
}

/**
 * 获取当前作业
 * @param {Object} data
 */
export function getCurrentWork(data) {
  return axios({
    url: '/job/getJobGeneralInfo',
    method: 'post',
    data
  })
}

/**
 * 获取24小时内的作业
 * @param {Object} data
 */
export function get24HoursWork(data) {
  return axios({
    url: '/job/getJobDailyInfo',
    method: 'post',
    data
  })
}

/**
 * 暂停作业
 * @param {Object} data
 */
export function pauseWork(data) {
  return axios({
    url: '/job/pauseJob',
    method: 'get',
    params: data
  })
}

/**
 * 恢复作业
 * @param {Object} data
 */
export function playWork(data) {
  return axios({
    url: '/job/resumeJob',
    method: 'get',
    params: data
  })
}

/**
 * 终止作业
 * @param {Object} data
 */
export function stopWork(data) {
  return axios({
    url: '/job/killJob',
    method: 'get',
    params: data
  })
}

/**
 * 获取作业详情
 * @param {number} id
 */
export function getWorkDetail(jobId) {
  return axios({
    url: '/job/details',
    method: 'post',
    data: { jobId }
  })
}

/**
 *备份成功率
 * @param {Object} data
 */
export function getBackupSuccessRate(data) {
  return axios({
    url: '/job/getBackupRatio',
    method: 'post',
    data
  })
}