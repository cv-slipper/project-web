import { axios } from '@/utils/request.js'

/**
 * 获取客户端趋势数据（数据类型分布）
 */
export const getClientTrends = (data) => {
  return axios({
    url: '/cvReport/clientType',
    method: 'post',
    data
  })
}
/**
 * 获取前端许可（数据类型分布）
 */
export const getFrontPie = (data) => {
  return axios({
    url: '/cvReport/licType',
    method: 'post',
    data
  })
}
/**
 * 获取规模值
 */
export const getDomainScale = (data) => {
  return axios({
    url: '/cvReport/scale',
    method: 'post',
    data
  })
}
/**
 * 获取前端许可排行
 */
export const getFrontRank = (data) => {
  return axios({
    url: '/cvReport/foreRankByClient',
    method: 'post',
    data
  })
}
/**
 * 获取分行排名情况
 */
export const getBranchRank = (data) => {
  return axios({
    url: '/cvReport/volRankByBranch',
    method: 'post',
    data
  })
}
/**
 * 获取应用系统排名
 */
export const getAppSystemRank = (data) => {
  return axios({
    url: '/cvReport/volRankBySystem',
    method: 'post',
    data
  })
}
/**
 * 获取区域占比区数据
 */
export const getAreaPropData = (data) => {
  return axios({
    url: '/cvReport/volRankByRegion',
    method: 'post',
    data
  })
}
/**
 * 获取区域占比生产域
 */
export const getAreaPropDataProd = (data) => {
  return axios({
    url: '/cvReport/volRankByGroup',
    method: 'post',
    data
  })
}