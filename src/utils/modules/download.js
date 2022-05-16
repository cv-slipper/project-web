/**
 * @description 纯前端实现将表格数据导出为csv格式文件
 * @param {Array} headers 表格头配置项，headers中的key值与data中每一个item的属性名一一对应
 * @param {Array} data 表格数据
 * @param {String} fileName 导出的文件名称
 */
export const downloadCsv = (header, data, fileName = '导出结果.csv') => {
  if (!header || !data || !Array.isArray(header) || !Array.isArray(data) || !header.length || !data.length) {
    return
  }
  var csvContent = 'data:text/csv;charset=utf-8,\ufeff'
  const _header = header.map(h => h.title).join(',')
  const keys = header.map(item => item.dataIndex)
  csvContent += _header + '\n'
  data.forEach((item, index) => {
    let dataString = ''
    for (let i = 0; i < keys.length; i++) {
      dataString += item[keys[i]] + ','
    }
    csvContent += index < data.length ? dataString.replace(/,$/, '\n') : dataString.replace(/,$/, '')
  })
  const a = document.createElement('a')
  a.href = encodeURI(csvContent)
  a.download = fileName
  a.click()
  window.URL.revokeObjectURL(csvContent)
}
