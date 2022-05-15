<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card
          title="前端许可使用量总览"
          descriptions="截止昨日使用占比"
          :loading="loading"
          :total="frontendTotal"
          :totalText="frontendTotalText"
        >
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o"/>
          </a-tooltip>
          <div>
            <mini-progress color="rgb(19, 194, 194)" :target="85" :percentage="frontendPercentage" :height="8"/>
          </div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="前端许可使用量趋势" descriptions="截止昨日使用量" :total="`${(frontendToday | NumberFormat)}TB`">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o"/>
          </a-tooltip>
          <div>
            <mini-area :dataSource="frontendDataSource"/>
          </div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card
          title="备份存储使用量总览"
          descriptions="截止昨日使用占比"
          :loading="loading"
          :total="backendTotal"
          :totalText="backendTotalText"
        >
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o"/>
          </a-tooltip>
          <div>
            <mini-progress color="rgb(19, 194, 194)" :target="80" :percentage="backendPercentage" :height="8"/>
          </div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="备份存储使用量趋势" descriptions="截止昨日使用量" :total="`${(backendToday | NumberFormat)}TB`">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o"/>
          </a-tooltip>
          <div>
            <mini-area :dataSource="backendDataSource"/>
          </div>
        </chart-card>
      </a-col>

    </a-row>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-row>
          <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <a-card title="使用量月度趋势" :bordered="false">
              <!--                todo 暂时隐藏-->
              <!--                <template slot="extra">-->
              <!--                  <a-button-group>-->
              <!--                    <a-button value="large" :type="prodBtnType" @click="handleFieldChange('prod')">-->
              <!--                      {{getDomainText('prod')}}-->
              <!--                    </a-button>-->
              <!--                    <a-button value="default" :type="branchBtnType" @click="handleFieldChange('branch')">-->
              <!--                      {{getDomainText('branch')}}-->
              <!--                    </a-button>-->
              <!--                  </a-button-group>-->
              <!--                </template>-->
              <storage-chart id-name="month" :data-source="histogramData"/>
            </a-card>
          </a-col>
          <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <a-card title="使用量季度趋势" :bordered="false">
              <storage-chart id-name="season" :data-source="histogramDataSeason"/>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <br/>
    <a-row>
      <a-col :span="24">
        <a-card title="分行概览" :bordered="false">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o"/>
          </a-tooltip>
          <a-col :span="8">
            <branch-pie-chart :data-source="chartData1"/>
          </a-col>
          <a-col :span="8">
            <branch-pie-chart :data-source="chartData2"/>
          </a-col>
          <a-col :span="8">
            <front-trend id-name="line-1" title="前端备份增长趋势" :data-source="usageLineData"/>
          </a-col>

        </a-card>
      </a-col>
    </a-row>

    <a-row style="background-color: #FFFFFF">
      <a-col :span="12">
        <a-card title="使用前端容量TOP5" :bordered="false">
          <a-table :dataSource="rankList" size="default" rowKey="id" :columns="columns">
            <template slot="flowRate" slot-scope="text, record, index">
              <a-progress
                :strokeColor="getPercentColor(record.progress)"
                :format="getPercentFormat"
                :percent="getFlowRateNumber(record.progress)"
                style="width:80px"/>
            </template>
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="使用客户端数量TOP5" :bordered="false">
          <a-table :dataSource="dataSource2" size="default" rowKey="id" :columns="columns2">
            <template slot="flowRate" slot-scope="text, record, index">
              <a-progress
                :strokeColor="getPercentColor(record.progress)"
                :format="getPercentFormat"
                :percent="getFlowRateNumber(record.progress)"
                style="width:80px"/>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <a-card title="客户端概览" :bordered="false">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o"/>
          </a-tooltip>
          <a-col :span="8">
            <branch-pie-chart :data-source="clientBranchPie"/>
          </a-col>
          <a-col :span="8">
            <branch-pie-chart :data-source="clientTypePie"/>
          </a-col>
          <a-col :span="8">
            <front-trend id-name="line-2" title="客户端增长趋势" :data-source="clientLineData"/>
          </a-col>

        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import ChartCard from '@/components/ChartCard'
  import ACol from 'ant-design-vue/es/grid/Col'
  import ATooltip from 'ant-design-vue/es/tooltip/Tooltip'
  import MiniArea from '@/components/chart/MiniArea'
  import MiniBar from '@/components/chart/MiniBar'
  import MiniProgress from '@/components/chart/MiniProgress'
  import RankList from '@/components/chart/RankList'
  import Bar from '@/components/chart/Bar'
  import LineChartMultid from '@/components/chart/LineChartMultid'
  import HeadInfo from '@/components/tools/HeadInfo.vue'
  import Trend from '@/components/Trend'
  import { getLoginfo, getVisitInfo } from '@/api/api'
  import StorageChart from './StorageChart'
  import BranchPieChart from './BranchPieChart'
  import FrontTrend from './FrontTrend'
  import { getAction } from '@/api/manage'
  import dayjs from 'dayjs'
  import LineArea from './LineArea'
  import { keepTwoDecimal } from '@/utils/util'
  import TempletCombinationStyle from '../../modules/online/graphreport/auto/template/TempletCombinationStyle'
  import { initDictOptions } from '@/components/dict/JDictSelectUtil'

  const dataCol1 = [{
    title: '行号',
    dataIndex: '',
    key: 'rowIndex',
    width: 60,
    align: 'center',
    customRender: function(t, r, index) {
      return parseInt(index) + 1
    }
  }, {
    title: '客户端名称',
    align: 'center',
    dataIndex: 'name'
  }, {
    title: '容量',
    align: 'center',
    dataIndex: 'total'
  }

  // },{
  //   title: '剩余',
  //   align:"center",
  //   dataIndex: 'surplus'
  // },{
  //   title: '图例',
  //   align:"center",
  //   dataIndex: 'progress',
  //   scopedSlots: { customRender: 'flowRate' }
  // }
  ];

  const dataCol2 = [{
    title: '行号',
    align: 'center',
    dataIndex: 'reBizCode'
  }, {
    title: '部门',
    align: 'center',
    dataIndex: 'dept'
  }, {
    title: '台数',
    align: 'center',
    dataIndex: 'num'
  }, {
    title: '比例',
    align: 'center',
    dataIndex: 'proportion'
  }];
  export default {
    name: 'IndexChart',
    components: {
      TempletCombinationStyle,
      ATooltip,
      ACol,
      ChartCard,
      MiniArea,
      MiniBar,
      MiniProgress,
      RankList,
      Bar,
      Trend,
      LineChartMultid,
      HeadInfo,
      StorageChart,
      BranchPieChart,
      FrontTrend,
      LineArea
    },
    data() {
      return {
        NumberFormat: 0,
        loading: true,
        center: null,
        todayFrontendData: { percentage: 0, weekCompare: 0, dailyCompare: 0 },
        todayBackendData: { percentage: 0, weekCompare: 0, dailyCompare: 0 },
        prodBtnType: 'primary',
        branchBtnType: 'default',
        domain: 'branch',
        dailyReportData: {},
        frontendDataSource: [],
        backendDataSource: [],
        frontendToday: 0,
        backendToday: 0,
        frontendIncrease: 0,
        backendIncrease: 0,
        histogramData: {
          column: [],
          frontend: [],
          backend: []
        },
        histogramDataSeason: {
          column: [],
          frontend: [],
          backend: []
        },
        usageLineData: {
          column: [],
          data: []
          // prodData:[],
          // branchData:[],
        },
        clientLineData: {
          column: [],
          data: []
          // prodData:[],
          // branchData:[],
        },
        hisTag: 'month',
        selectTime: [],
        clientBranchPie: {
          idName: 'chart-3',
          title: '客户端数量',
          total: 0,
          data: []
        },
        clientTypePie: {
          idName: 'chart-4',
          title: '客户端类型',
          total: 0,
          data: []
        },
        rankList: [],
        chartData1: {
          idName: 'chart-1',
          title: '前端许可使用量',
          total: 0,
          data: []
        },
        chartData2: {
          idName: 'chart-2',
          title: '备份存储使用量',
          total: 0,
          data: []
        },
        dataSource1: [],
        dataSource2: [],
        columns: dataCol1,
        columns2: dataCol2,
        url: {
          UsageReportList: '/cvUsageReport/dataList',
          getUsageReportPresentCard: '/cvUsageReport/getUsageReportPresentCard',
          getUsageReportIncrease: '/cvUsageReport/getUsageReportIncrease',
          getUsageReportMonth: '/cvUsageReport/getUsageReportMonth',
          getUsageReportSeason: '/cvUsageReport/getUsageReportSeason',
          getSizeTop: '/job/getSizeTop',
          getClientType: '/cvUsageReport/getClientType',
          getUsageReportFrontend: '/cvUsageReport/getUsageReportFrontend',
          getUsageReportBackend: '/cvUsageReport/getUsageReportBackend',
          getTopClient: '/cvUsageReport/getTopClient'
        },
        indicator: <a-icon type="loading" style="font-size: 24px" spin />
      }
    },
    created() {
      setTimeout(() => {
        this.loading = !this.loading
      }, 1000)
      this.initDictConfig()
      this.loadData()
    },
    computed: {
      frontendPercentage() {
        return this.dailyReportData.frontendPersent ? Number.parseFloat(this.dailyReportData.frontendPersent) : 0
      },
      frontendTotal() {
        return `${(this.dailyReportData.frontendPersent ? this.dailyReportData.frontendPersent : 0)}%`
      },
      frontendTotalText() {
        return `(前端许可总容量：${this.dailyReportData.frontendTotalSize || ''}TB)`
      },
      backendPercentage() {
        return this.dailyReportData.backendPersent ? Number.parseFloat(this.dailyReportData.backendPersent) : 0
      },
      backendTotal() {
        return `${(this.dailyReportData.backendPersent ? this.dailyReportData.backendPersent : 0)}%`
      },
      backendTotalText() {
        return `(后端存储总容量：${this.dailyReportData.backendTotalSize || ''}TB)`
      }
    },
    methods: {
      getDomainText(domain) {
        let text = ''
        this.dictDomainList.forEach((item) => { if (item.value == domain) { text = item.text } })
        return text
      },
      initDictConfig() {
        // 备份域
        initDictOptions('domain').then((res) => {
          if (res.success) {
            this.dictDomainList = res.result
            console.log('this.dictDomainList', this.dictDomainList)
          }
        })
      },
      loadData() {
        this.loadTodayReportData()
        this.loadWeekReportData()
        this.loadUsageReportIncrease()
        this.loadHistogramMonth()
        this.loadHistogramSeason()
        this.loadUsageReportFrontend()
        this.loadUsageReportBackend()
        this.loadRankList()
        this.loadBranchClientNum()
        this.loadClientBranch()
        this.loadTopClient()
      },
      getPercentColor(value) {
        let p = Number(value)
        if (p >= 90 && p < 100) {
          return 'rgb(244, 240, 89)'
        } else if (p >= 100) {
          return 'red'
        } else {
          return 'rgb(16, 142, 233)'
        }
      },
      getPercentFormat(value) {
        if (value == 100) {
          return '超时'
        } else {
          return value + '%'
        }
      },
      getFlowRateNumber(value) {
        return Number(value)
      },
      loadTodayReportData() {
        getAction(this.url.getUsageReportPresentCard, { domain: this.domain }).then((res) => {
          if (res.success) {
            if (res.result) {
              this.dailyReportData = res.result
              this.dailyReportData.frontendPersent = keepTwoDecimal(this.dailyReportData.frontendPersent)
              this.dailyReportData.backendDailyPersent = keepTwoDecimal(this.dailyReportData.backendDailyPersent)
              this.dailyReportData.backendPersent = keepTwoDecimal(this.dailyReportData.backendPersent)
            }
          }
        })
      },
      loadWeekReportData() {
        let params = {}
        params.domain = this.domain
        let nowTime = new Date()
        let findTime = dayjs(nowTime).subtract(8, 'day').format('YYYY-MM-DD HH:mm:ss')
        params.triggerTime_start = findTime
        getAction(this.url.UsageReportList, params).then((res) => {
          if (res.success) {
            let nowTime = new Date()
            // today = dayjs(today).format('YYYY-MM-DD')
            let todayFrontendSize = 0
            let todayBackendSize = 0
            let yesFrontendSize = 0
            let yesBackendSize = 0
            for (let i = 7; i > 0; i--) {
              let fontTime = dayjs(nowTime).subtract(i, 'day').format('YYYY-MM-DD')
              let resultFlag = true
              let frontendUsageSize = 0
              let backendUsageSize = 0
              for (let item of res.result.records) {
                let triggerTime = dayjs(item.triggerTime).format('YYYY-MM-DD')
                let today = dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD')
                let yesterday = dayjs(new Date()).subtract(2, 'day').format('YYYY-MM-DD')

                if (triggerTime == fontTime) {
                  frontendUsageSize += item.frontendUsageSize
                  backendUsageSize += item.backendUsageSize
                  resultFlag = false
                }
                if (yesterday == triggerTime) {
                  yesFrontendSize += item.frontendUsageSize
                  yesBackendSize += item.backendUsageSize
                } else if (today == triggerTime) {
                  todayFrontendSize += item.frontendUsageSize
                  todayBackendSize += item.backendUsageSize
                }
              }
              this.frontendIncrease = (todayFrontendSize - yesFrontendSize) / 7
              this.backendIncrease = (todayBackendSize - yesBackendSize) / 7
              this.frontendToday = todayFrontendSize / 7
              this.backendToday = todayBackendSize / 7
              if (resultFlag) {
                this.frontendDataSource.push({ x: fontTime, y: 0 })
                this.backendDataSource.push({ x: fontTime, y: 0 })
              } else {
                this.frontendDataSource.push({ x: fontTime, y: frontendUsageSize })
                this.backendDataSource.push({ x: fontTime, y: backendUsageSize })
              }
            }
          }
        })
      },
      loadUsageReportIncrease() {
        let params = {}
        params.domain = this.domain
        getAction(this.url.getUsageReportIncrease, {}).then((res) => {
          if (res.success) {
            let nowTime = new Date()
            let data = []
            for (let item of res.result) {
              if (item.buName == 'prod') {
                continue
              }
              if (data.length == 0 || (data.findIndex(i => i.name == item.buName) == -1)) {
                this.usageLineData.data.push({
                  name: item.buName,
                  data: [],
                  type: 'line',
                  smooth: true
                })
                this.clientLineData.data.push({
                  name: item.buName,
                  data: [],
                  type: 'line',
                  smooth: true
                })
                data.push({
                  name: item.buName
                })
              }
            }

            for (let i = 30; i >= 0; i--) {
              let findTime = dayjs(nowTime).subtract(i, 'day').format('YYYY-MM-DD')
              this.usageLineData.column.push(findTime)
              this.clientLineData.column.push(findTime)
              for (let k = 0; k < data.length; k++) {
                let flag = true
                for (let item of res.result) {
                  let triggerTime = dayjs(item.triggerTime).format('YYYY-MM-DD')
                  if (findTime == triggerTime && item.buName == data[k].name) {
                    this.usageLineData.data[k].data.push(item.frontendUsageIncrease)
                    this.clientLineData.data[k].data.push(item.clientIncrease)
                    flag = false
                  }
                }
                if (flag) {
                  this.usageLineData.data[k].data.push(0)
                  this.clientLineData.data[k].data.push(0)
                }
              }
            }
          }
        })
      },
      loadHistogramMonth() {
        getAction(this.url.getUsageReportMonth, { domain: this.domain }).then((res) => {
          if (res.success) {
            console.log('histogramData', res)
            if (this.hisTag == 'month') {
              let nowTime = new Date()
              let nowMonth = dayjs(nowTime).month()
              for (let item of res.result) {
                this.histogramData.column.push(item.triggerTime)
                this.histogramData.frontend.push(item.frontend)
                this.histogramData.backend.push(item.backend)
              }
            }
          }
        })
      },
      loadHistogramSeason() {
        getAction(this.url.getUsageReportSeason, { domain: this.domain }).then((res) => {
          if (res.success) {
            for (let item of res.result) {
              this.histogramDataSeason.column.push(item.triggerTime)
              this.histogramDataSeason.frontend.push(item.frontend)
              this.histogramDataSeason.backend.push(item.backend)
            }
          }
          console.log(res)
        })
      },
      loadRankList() {
        let params = {}
        params.domain = this.domain
        if (this.selectTime.length > 0) {
          params.startTime = dayjs(this.selectTime[0]._d).format('YYYY-MM-DD HH:mm:ss')
          params.endTime = dayjs(this.selectTime[1]._d).format('YYYY-MM-DD HH:mm:ss')
        } else {
          let nowTime = new Date()
          let startTime = dayjs(nowTime).subtract(21, 'day').format('YYYY-MM-DD HH:mm:ss')
          let endTime = dayjs(nowTime).format('YYYY-MM-DD HH:mm:ss')
          params.startTime = startTime
          params.endTime = endTime
        }
        getAction(this.url.getSizeTop, params).then((res) => {
          if (res.success) {
            for (let item of res.result) {
              this.rankList.push({ name: item.client, total: item.size })
            }
          }
        })
      },
      loadUsageReportFrontend() {
        let params = {}
        getAction(this.url.getUsageReportFrontend, params).then((res) => {
          if (res.success && res.result.length > 0) {
            for (let item of res.result) {
              this.chartData1.data.push({ value: item.frontendUsageSize, name: item.buName })
              this.chartData1.total += item.frontendUsageSize
            }
          }
        })
      },
      loadUsageReportBackend() {
        let params = {}
        getAction(this.url.getUsageReportBackend, params).then((res) => {
          if (res.success && res.result.length > 0) {
            for (let item of res.result) {
              this.chartData2.data.push({ value: item.backendUsageSize, name: item.buName })
              this.chartData2.total += item.backendUsageSize
            }
          }
        })
      },
      loadTopClient() {
        getAction(this.url.getTopClient, {}).then((res) => {
          if (res.success && res.result.length > 0) {
            for (let i = 0; i < res.result.length; i++) {
              this.dataSource2.push({ reBizCode: i + 1, dept: res.result[i].buName, num: res.result[i].clientNumber, proportion: res.result[i].frontendTotalSize })
            }
          }
        })
      },
      loadClientBranch() {
        let params = {}
        params.domain = 'branch'
        params.triggerTime = dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD')
        getAction(this.url.UsageReportList, params).then((res) => {
          if (res.success) {
            let result = res.result.records
            let clientList = []
            for (let item of result) {
              let client = {}
              client.value = item.clientNumber
              client.name = item.buName
              this.clientBranchPie.total += item.clientNumber
              clientList.push(client)
            }
            for (let item of clientList) {
              let name = item.name + '|' + (Math.floor(item.value / this.clientBranchPie.total * 10000) / 100) + '%  ' + item.value
              this.clientBranchPie.data.push({ value: item.value, name: name })
            }
            // this.clientBranchPie
          }
        })
      },
      loadBranchClientNum() {
        let params = { domain: this.domain }
        getAction(this.url.getClientType, params).then((res) => {
          if (res.success) {
            let result = res.result
        //     let result = { output: "华夏银行兰州分行,Mysql,1\n华夏银行兰州分行,Database,2\n华夏银行杭州分行,Mysql,1\n华夏银行杭州分行,Database,2" }
            if (result.output != '') {
              let clientTypeList = []
              if (this.domain === 'branch') {
                let outputMap = new Map();
                for (let item of result.output.split('\n')) {
                  let clientType = item.split(',')
                  if (outputMap.has(clientType[1])) {
                    outputMap.set(clientType[1], outputMap.get(clientType[1]) + Number(clientType[2]))
                  } else {
                    outputMap.set(clientType[1], Number(clientType[2]))
                  }
                }
                for (let [key, value] of outputMap.entries()) {
                  let clientType = [key, value]
                  clientTypeList.push(clientType)
                  this.clientTypePie.total += Number(clientType[1])
                }
                console.log('loadBranchClientNum', outputMap, clientTypeList.length)
              } else {
                for (let item of result.output.split('\n')) {
                  let clientType = item.split(',')
                  clientTypeList.push(clientType)
                  this.clientTypePie.total += Number(clientType[1])
                }
              }
              for (let typeEntity of clientTypeList) {
                let name = typeEntity[0] + '|' + (Math.floor(typeEntity[1] / this.clientTypePie.total * 10000) / 100) + '%  ' + typeEntity[1]
                this.clientTypePie.data.push({ value: typeEntity[1], name: name })
              }
            }
          }
        })
      },
      handleFieldChange(domain) {
        this.domain = domain
        this.prodBtnType = domain === 'prod' ? 'primary' : 'default'
        this.branchBtnType = domain === 'branch' ? 'primary' : 'default'
        // if(this.prodBtnType ==='primary'){
        //   this.prodBtnType = 'default'
        // }else {
        //   this.prodBtnType = 'primary'
        // }
        // if(this.branchBtnType ==='primary'){
        //   this.branchBtnType = 'default'
        // }else {
        //   this.branchBtnType = 'primary'
        // }
        this.clearData()
        this.loadData()
      },
      clearData() {
        this.dailyReportData = {}
        this.frontendDataSource = []
        this.backendDataSource = []
        this.frontendToday = 0
        this.backendToday = 0
        this.frontendIncrease = 0
        this.backendIncrease = 0
        this.usageLineData = {
          column: [],
          data: []
          // prodData:[],
          // branchData:[],
        }
        this.clientLineData = {
          column: [],
          data: []
          // prodData:[],
          // branchData:[],
        }
        this.histogramData = {
          column: [],
          frontend: [],
          backend: []
        }
        this.histogramDataSeason = {
          column: [],
          frontend: [],
          backend: []
        }
        this.rankList = []
        this.clientBranchPie = {
          idName: 'chart-3',
          title: '客户端数量',
          total: 0,
          data: []
        }
        this.clientTypePie = {
          idName: 'chart-4',
          title: '客户端类型',
          total: 0,
          data: []
        }
        this.chartData1 = {
          idName: 'chart-1',
          title: '前端许可使用量',
          total: 0,
          data: []
        }
        this.chartData2 = {
          idName: 'chart-2',
          title: '备份存储使用量',
          total: 0,
          data: []
        }
        this.dataSource1 = []
        this.dataSource2 = []
      },
      handleHisTagChange(activeKey) {
        this.histogramData = {
          column: [],
          frontend: [],
          backend: []
        }
        this.hisTag = activeKey
        this.loadHistogramMonth()
      },
      handleSelectTimeChange() {
        this.rankList = []
        this.loadRankList()
      }
    }
  }
</script>

<style lang="less" scoped>
  .circle-cust {
    position: relative;
    top: 28px;
    left: -100%;
  }

  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  /* 首页访问量统计 */
  .head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
      text-align: center;
      padding: 0 32px;
    }

    span {
      color: rgba(0, 0, 0, .45);
      display: inline-block;
      font-size: .95rem;
      line-height: 42px;
      margin-bottom: 4px;
    }

    p {
      line-height: 42px;
      margin: 0;

      a {
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }
</style>
