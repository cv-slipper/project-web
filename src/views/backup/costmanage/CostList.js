const columns1 = [
  {
    title: '序号',
    dataIndex: '',
    key: 'rowIndex',
    width: 60,
    align: 'center',
    customRender: function(t, r, index) {
      return parseInt(index) + 1
    }
  },
  {
    title: '公司名',
    width: 120,
    align: 'center',
    dataIndex: 'companyName'
  },
  {
    title: '客户端数量（台）',
    width: 120,
    align: 'center',
    dataIndex: 'number'
  },
  {
    title: '单价',
    width: 120,
    align: 'center',
    dataIndex: 'price'
  },
  {
    title: '小计',
    width: 120,
    align: 'center',
    dataIndex: 'cost'
  },
  {
    title: '日期',
    width: 120,
    align: 'center',
    dataIndex: 'startTime'
  }
]
const columns2 = [
  {
    title: '序号',
    dataIndex: '',
    key: 'rowIndex',
    width: 60,
    align: 'center',
    customRender: function(t, r, index) {
      return parseInt(index) + 1
    }
  },
  {
    title: '公司名',
    width: 120,
    align: 'center',
    dataIndex: 'companyName'
  },
  {
    title: '客户端名',
    width: 120,
    align: 'center',
    dataIndex: 'clientName'
  },
  {
    title: '安装日期',
    width: 120,
    align: 'center',
    dataIndex: 'installTime'
  }
]
const columns3 = [
  {
    title: '序号',
    dataIndex: '',
    key: 'rowIndex',
    width: 60,
    align: 'center',
    customRender: function(t, r, index) {
      return parseInt(index) + 1
    }
  },
  {
    title: '公司名',
    width: 120,
    align: 'center',
    dataIndex: 'companyName'
  },
  {
    title: '前端许可用量（G）',
    width: 120,
    align: 'center',
    dataIndex: 'number'
  },
  {
    title: '单价',
    width: 120,
    align: 'center',
    dataIndex: 'price'
  },
  {
    title: '小计',
    width: 120,
    align: 'center',
    dataIndex: 'cost'
  },
  {
    title: '日期',
    width: 120,
    align: 'center',
    dataIndex: 'startTime'
  }
]
const columns4 = [
  {
    title: '序号',
    dataIndex: '',
    key: 'rowIndex',
    width: 60,
    align: 'center',
    customRender: function(t, r, index) {
      return parseInt(index) + 1
    }
  },
  {
    title: '公司名',
    width: 120,
    align: 'center',
    dataIndex: 'companyName'
  },
  {
    title: '客户端名',
    width: 120,
    align: 'center',
    dataIndex: 'clientName'
  },
  {
    title: '前端许可用量',
    width: 120,
    align: 'center',
    dataIndex: 'number'
  }
]
const columns5 = [
  {
    title: '序号',
    dataIndex: '',
    key: 'rowIndex',
    width: 60,
    align: 'center',
    customRender: function(t, r, index) {
      return parseInt(index) + 1
    }
  },
  {
    title: '公司名',
    width: 120,
    align: 'center',
    dataIndex: 'companyName'
  },
  {
    title: '存储库',
    width: 120,
    align: 'center',
    dataIndex: 'library'
  },
  {
    title: '后端存储用量（G）',
    width: 160,
    align: 'center',
    dataIndex: 'number'
  },
  {
    title: '单价',
    width: 100,
    align: 'center',
    dataIndex: 'price'
  },
  {
    title: '小计',
    width: 100,
    align: 'center',
    dataIndex: 'cost'
  },
  {
    title: '日期',
    width: 120,
    align: 'center',
    dataIndex: 'startTime'
  }
]
const columns6 = [
  {
    title: '序号',
    dataIndex: '',
    key: 'rowIndex',
    width: 60,
    align: 'center',
    customRender: function(t, r, index) {
      return parseInt(index) + 1
    }
  },
  {
    title: '公司名',
    width: 120,
    align: 'center',
    dataIndex: 'companyName'
  },
  {
    title: '客户端名',
    width: 120,
    align: 'center',
    dataIndex: 'clientName'
  },
  {
    title: '存储库',
    width: 120,
    align: 'center',
    dataIndex: 'library'
  },
  {
    title: '作业ID',
    width: 120,
    align: 'center',
    dataIndex: 'jobId'
  },
  {
    title: '后端写入大小',
    width: 120,
    align: 'center',
    dataIndex: 'number'
  }
]
const ipagination = {
  total: 0,
  current: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: (total, range) => {
    return range[0] + '-' + range[1] + ' 共' + total + '条'
  }
}
export {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6,
  ipagination
}