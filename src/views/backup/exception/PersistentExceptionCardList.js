const continuedJobColumns = [
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
    title: '备份域',
    width: 120,
    align: 'center',
    dataIndex: 'domain_dictText'
  },
  {
    title: '作业ID',
    width: 120,
    align: 'left',
    dataIndex: 'workId'
  },
  {
    title: '状态',
    width: 120,
    align: 'left',
    dataIndex: 'state'
  },
  {
    title: '操作类型',
    width: 120,
    align: 'left',
    dataIndex: 'operationType_dictText'
  },
  {
    title: '作业类型',
    width: 120,
    align: 'left',
    dataIndex: 'workType'
  },
  {
    title: '客户端',
    width: 120,
    align: 'left',
    dataIndex: 'client'
  },
  {
    title: '代理类型',
    width: 120,
    align: 'left',
    dataIndex: 'agentType'
  },
  {
    title: '实例',
    width: 120,
    align: 'left',
    dataIndex: 'instance'
  },
  {
    title: '存储策略',
    width: 120,
    align: 'left',
    dataIndex: 'storageStrategy'
  },
  {
    title: '开始时间',
    width: 120,
    align: 'left',
    dataIndex: 'startTime'
  },
  {
    title: '结束时间',
    width: 120,
    align: 'left',
    dataIndex: 'endTime',
    scopedSlots: {customRender: 'endTime'}
  },
  {
    title: '持续',
    width: 120,
    align: 'left',
    dataIndex: 'duration',
    scopedSlots: { customRender: 'duration' }
  },
  {
    title: '应用程序大小',
    width: 120,
    align: 'left',
    dataIndex: 'programSize',
    scopedSlots: { customRender: 'programSize' }
  },
  // {
  //   title: '平均吞吐量',
  //   width: 120,
  //   align: 'left',
  //   dataIndex: 'speed'
  // },
  // {
  //   title: '保留直到',
  //   width: 120,
  //   align: 'left',
  //   dataIndex: 'saveUntil'
  // },
  {
    title: '发生次数',
    width: 120,
    align: 'left',
    dataIndex: 'qty'
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
const shortageColumns=[
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
    title:'备份域',
    align:'left',
    dataIndex:'domain_dictText'
  },
  {
    title:'暂存池(Scratch Pool)',
    align:'left',
    dataIndex:'scratchPool'
  },
  {
    title:'库(Library)',
    align:'left',
    dataIndex:'library'
  },
  {
    title:'可用介质数量(Number of Media)',
    align:'left',
    dataIndex:'mediaNumber'
  },
  {
    title:'水位线(Watermark)',
    align:'left',
    dataIndex:'watermark'
  },
  {
    title:'介质类型(Default Media Type)',
    align:'left',
    dataIndex:'mediaType'
  },
  // {
  //   title:'Priority',
  //   align:'left',
  //   dataIndex:'priority'
  // },
  // {
  //   title:'Media Selection Criteria',
  //   align:'left',
  //   dataIndex:'mediaSelection'
  // },
  {
    title:'发生次数',
    align:'left',
    dataIndex:'qty'
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 80,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
];
const resourceOfflineColumns=[
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
    title: '备份域',
    align: 'center',
    dataIndex: 'domain_dictText'
  },
  {
    title:'库',
    align:'left',
    dataIndex:'library'
  },
  {
    title:'库状态',
    align:'left',
    dataIndex:'libraryState'
  },
  {
    title:'驱动器',
    align:'left',
    dataIndex:'driver'
  },
  {
    title:'型号',
    align:'left',
    dataIndex:'model'
  },
  {
    title:'驱动器状态',
    align:'left',
    dataIndex:'driverState'
  },
  {
    title:'发生次数',
    align:'left',
    dataIndex:'qty'
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 80,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
];
const repeatEvent2Columns = [
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
    title:'备份域',
    align:'left',
    width: 120,
    dataIndex:'domain_dictText'
  },
  // {
  //   title:'是否处理 ',
  //   align:'left',
  //   width: 120,
  //   dataIndex:'handled_dictText'
  // },
  {
    title:'重要性',
    align:'left',
    width: 120,
    dataIndex:'severity_dictText'
  },
  {
    title:'事件代码',
    align:'left',
    width: 120,
    dataIndex:'eventCode'
  },
  {
    title:'事件出现次数',
    align:'left',
    width: 120,
    dataIndex:'qty'
  },
  {
    title:'发生时间',
    align:'left',
    width: 120,
    dataIndex:'triggerTime'
  },
  {
    title:'明细',
    align:'left',
    dataIndex:'details',
    scopedSlots: { customRender: 'details' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 80,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export {
  shortageColumns,
  resourceOfflineColumns,
  repeatEvent2Columns,
  continuedJobColumns
}