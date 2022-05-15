const dataCard= [
  {
    group: "work",
    text: "作业量",
    num: 0,
    icon: "carry-out",
    color: "#2a5caa"
  },
  {
    group: "work",
    text: "失败",
    num: 0,
    icon: "close-circle",
    color: "#ff0000"
  },
  {
    group: "work",
    text: "异常",
    num: 0,
    icon: "info-circle",
    color: "#f58220"
  },
  {
    group: "event",
    text: "事件",
    num: 0,
    icon: "file-word",
    color: "#f58220"
  },
  {
    group: "resources",
    text: "备份资源不足",
    num: 0,
    icon: "pie-chart",
    color: "#ff0000"
  },
  {
    group: "resources",
    text: "备份资源脱机",
    num: 0,
    icon: "minus-circle",
    color: "#a1a3a6"
  },
  {
    group: "resources",
    text: "许可容量超85%",
    num: 0,
    icon: "dashboard",
    color: "#009ad6"
  },
  {
    group: "client",
    text: "客户端脱机",
    num: 0,
    icon: "database",
    color: "#009ad6"
  },
];
const dictSeriousness = [
  {
    text:'严重',
    value:'Critical'
  },
  {
    text:'主要',
    value:'Major'
  },
  {
    text:'次要',
    value:'Minor'
  },
  {
    text:'信息',
    value:'Information'
  },
];
const eventColumns=[
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
    title: '严重性',
    width: 120,
    align: 'center',
    dataIndex: 'seriousness_dictText'
  },
  {
    title: '事件ID',
    width: 120,
    align: 'center',
    dataIndex: 'eventId'
  },
  {
    title: '作业ID',
    width: 120,
    align: 'center',
    dataIndex: 'workId'
  },
  {
    title: '时间',
    width: 120,
    align: 'center',
    dataIndex: 'time'
  },
  // {
  //   title: '程序',
  //   width: 120,
  //   align: 'center',
  //   dataIndex: 'program'
  // },
  // {
  //   title: '计算机',
  //   width: 120,
  //   align: 'center',
  //   dataIndex: 'computer'
  // },
  {
    title: '事件代码',
    width: 120,
    align: 'center',
    dataIndex: 'eventCode'
  },
  // {
  //   title: '客户端',
  //   width: 120,
  //   align: 'center',
  //   dataIndex: 'clientEntity'
  // },
  {
    title: '说明',
    width: 120,
    align: 'center',
    dataIndex: 'description',
    scopedSlots: { customRender: 'descriptionSlot' }
  },
];
const backupColumns= [
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
    scopedSlots: { customRender: 'endTime' }
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
  //     dataIndex: 'saveUntil'
  // },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
];
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
    title: '备份域',
    width: 120,
    align: 'center',
    dataIndex: 'domain_dictText'
  },
  {
    title:'库(Library)',
    width: 120,
    align:'left',
    dataIndex:'library'
  },
  {
    title:'暂存池(Scratch Pool)',
    width: 120,
    align:'left',
    dataIndex:'scratchPool'
  },
  {
    title:'可用介质数量(Number of Media)',
    width: 120,
    align:'left',
    dataIndex:'mediaNumber'
  },
  {
    title:'水位线(Watermark)',
    width: 120,
    align:'left',
    dataIndex:'watermark'
  },
  {
    title:'介质类型(Default Media Type)',
    width: 120,
    align:'left',
    dataIndex:'mediaType'
  },
  {
    title:'发生时间',
    width: 120,
    align:'left',
    dataIndex:'triggerTime'
  },
];
const libraryColumns=[
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
    title:'库',
    width: 120,
    align:'left',
    dataIndex:'library'
  },
  {
    title:'库状态',
    width: 120,
    align:'left',
    dataIndex:'libraryState'
  },
  {
    title:'驱动器',
    width: 120,
    align:'left',
    dataIndex:'driver'
  },
  {
    title:'型号',
    width: 120,
    align:'left',
    dataIndex:'model'
  },
  {
    title:'驱动器状态',
    width: 120,
    align:'left',
    dataIndex:'driverState'
  },
  {
    title:'脱机原因',
    width: 120,
    align:'left',
    dataIndex:'reason',
  },
  {
    title:'发生时间',
    width: 120,
    align:'left',
    dataIndex:'triggerTime'
  },
];
const driverColumns=[
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
    title:'驱动器',
    width: 120,
    align:'left',
    dataIndex:'driver'
  },
  {
    title:'型号',
    width: 120,
    align:'left',
    dataIndex:'model'
  },
  {
    title:'版本',
    width: 120,
    align:'left',
    dataIndex:'version'
  },
  {
    title:'作业ID',
    width: 120,
    align:'left',
    dataIndex:'workId'
  },
  {
    title:'介质',
    width: 120,
    align:'left',
    dataIndex:'medium'
  },
  {
    title:'上次清洁时间',
    width: 120,
    align:'left',
    dataIndex:'lastClearTime'
  },
  {
    title:'状态',
    width: 120,
    align:'left',
    dataIndex:'state'
  },
  {
    title:'已启动',
    width: 120,
    align:'left',
    dataIndex:'enable'
  },
  {
    title:'计程器',
    width: 120,
    align:'left',
    dataIndex:'meter'
  },
  {
    title:'发生时间',
    width: 120,
    align:'left',
    dataIndex:'triggerTime'
  },
];
const mediaAgentColumns = [
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
    title:'MediaAgent',
    width: 120,
    align:'left',
    dataIndex:'mediaAgent'
  },
  {
    title:'索引缓存',
    width: 120,
    align:'left',
    dataIndex:'indexCache'
  },
  {
    title:'就绪状态',
    width: 120,
    align:'left',
    dataIndex:'readyState'
  },
  {
    title:'发生时间',
    width: 120,
    align:'left',
    dataIndex:'triggerTime'
  },
]
const ermittedCapacityColumns = [
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
    title:'数据集',
    width: 120,
    align:'left',
    dataIndex:'dataSource'
  },
  {
    title:'许可名称',
    width: 120,
    align:'left',
    dataIndex:'licenseName'
  },
  {
    title:'许可容量',
    width: 120,
    align:'left',
    dataIndex:'totalCapacity'
  },
  {
    title:'剩余容量',
    width: 120,
    align:'left',
    dataIndex:'balanceCapacity'
  },
  {
    title:'发生时间',
    width: 120,
    align:'left',
    dataIndex:'triggerTime'
  },

]
const clientColumns = [
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
    title:'域',
    width: 120,
    align:'left',
    dataIndex:'domain_dictText'
  },
  {
    title:'客户端名称',
    width: 120,
    align:'left',
    dataIndex:'client'
  },
  {
    title:'客户端Id',
    width: 120,
    align:'left',
    dataIndex:'clientId'
  },
  {
    title:'脱机原因',
    width: 120,
    align:'left',
    dataIndex:'reason'
  },
  {
    title:'ip地址',
    width: 120,
    align:'left',
    dataIndex:'host'
  },
  {
    title:'发生时间',
    width: 120,
    align:'left',
    dataIndex:'triggerTime'
  },
  // {
  //   title:'是否处理',
  //   width: 120,
  //   align:'left',
  //   dataIndex:'handled'
  // },
]
export {
  dictSeriousness,
  backupColumns,
  eventColumns,
  shortageColumns,
  libraryColumns,
  driverColumns,
  mediaAgentColumns,
  clientColumns,
  ermittedCapacityColumns,
  dataCard
}




