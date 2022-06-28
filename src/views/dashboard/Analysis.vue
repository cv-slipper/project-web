<template>

  <div class='main-analysis' ref='mainAnalysis'>
    <div class='tabs'>
      <div class='tab-list'>
        <a-tabs class='my-tabs' v-model='domain' @change='changeDomain'>
          <a-tab-pane key='prod' tab='生产域'>

          </a-tab-pane>
          <a-tab-pane key='branch' tab='分行域'>

          </a-tab-pane>
        </a-tabs>
      </div>
      <div class='reload mr-20' style='cursor:pointer'>
        <div class='flex-center'>
          <!--          <div class='flex-center'>-->
          <!--            <img src='@/assets/reseterror.png' width='20px' height='20px' alt=''>-->
          <!--            <span style='margin-left:5px'>同步异常</span>-->
          <!--          </div>-->
          <div class='flex-center ml-10 ' @click='init()'>
            <img src='@/assets/reload.png' width='20px' height='20px' alt=''>
            <span style='margin-left:5px'>同步正常</span>
          </div>
        </div>
      </div>
    </div>
    <div class='wrapper mt-20' style='height:calc(100% - 60px)'>
      <div style='display:flex;justify-content:space-between;height:100%'>
        <div style='width:20.83333%;height: 100%'>
          <div style='height:100%'>
            <div class='left-top'>
              <div class='one'>
                <a-card :bordered='false' style='width: 100%'>
                  <div slot='title'>
                    <div class='flex-center' style='justify-content:space-between'>
                      <div class='flex-center fl'>
                        <img class='fl' style='width:20px;height:20px' src='@/assets/dailyWork.png' alt=''>
                        <span class='ml-5 fl' style='font-size:14px'>当前作业</span>
                        <div class='fl ml-5' @click='refreshWork()'>
                          <span class='reset'>刷新</span>
                        </div>
                      </div>
                      <div class='fr'>
                        <div class='work-control' @click='gotoWorkControl("")'>
                          <img class='mr-5' src='@/assets/workCon.png' alt='' />
                          作业控制器
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style='height: 100%'>
                    <div class='flex-box ' style='margin:0;height:100%'>
                      <div class='item' @click='gotoWorkControl("Running")'>
                        <div class='content'>
                          <div class='title'>运行</div>
                          <div class='num'>{{ currentWorkDetail.runningNum }}</div>
                        </div>
                      </div>
                      <div class='item' @click='gotoWorkControl("Waiting,Queued")'>
                        <div class='content'>
                          <div class='title'>等待</div>
                          <div class='num'>{{ currentWorkDetail.waitingNum }}</div>
                        </div>
                      </div>
                      <div class='item ' @click='gotoWorkControl("Suspend,Suspended")'>
                        <div class='content'>
                          <div class='title'>暂停</div>
                          <div class='num'>{{ currentWorkDetail.suspendedNum }}</div>
                        </div>
                      </div>
                      <div class='item ' @click='gotoWorkControl("Pending")'>
                        <div class='content'>
                          <div class='title'>未决</div>
                          <div class='num'>{{ currentWorkDetail.pendingNum }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a-card>
              </div>
              <div style='height:10px'></div>
              <div class='two'>
                <a-card :bordered='false'>
                  <div slot='title'>
                    <div class='flex-center'>
                      <img src='@/assets/24h.png' style='width:20px;height:20px' alt=''>
                      <span class='ml-5'>24小时作业</span>
                    </div>
                  </div>
                  <div style='height:100%'>
                    <div class='flex-box tfh'>
                      <div class='item' style='cursor:default'>
                        <div class='content'>
                          <div class='title'>完成</div>
                          <div class='num'>{{ dailyWorkDetail.completedNum }}</div>
                        </div>
                      </div>
                      <div class='item' @click='()=>{if(dailyWorkDetail.failedNum>0) failedWorkVisible = true}'>
                        <div class='content'>
                          <div class='title'>失败</div>
                          <div class='num'>{{ dailyWorkDetail.failedNum }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a-card>
              </div>

            </div>
            <div style='height:10px'></div>
            <a-card :bordered='false' class='rate'>
              <div slot='title'>
                <div class='flex-center'>
                  <div class='flex-center' style='width:100%'>
                    <img src='@/assets/currentSuccess.png' style='width:20px;height:20px' alt=''>
                    <span class='ml-5'>备份成功率</span>

                  </div>
                  <div class='fr'>
                    <a-select style='min-width:100px' v-model='rateTime' @change='getBackupSuccessRate'>
                      <a-select-option value='604800'>最近一周</a-select-option>
                      <a-select-option value='2592000'>最近一月</a-select-option>
                    </a-select>
                  </div>
                </div>
              </div>
              <backup-success-rate :detail='workRate'></backup-success-rate>
            </a-card>
          </div>
        </div>
        <div style='width:calc(58.36% - 20px)'>
          <div class='content-top'>
            <div class='flex-between top-list'>
              <div class='item' v-for='(item,index) in listData' :key='index'>
                <div>

                  <div class='title fs-12' style='color:#666666'>{{ item.title }}</div>
                  <div style='clear:both'></div>
                  <div class='fs-12 '>
                    <div class='num fl'> {{ item.num }}
                      <div class='increase-num fl'
                           v-if='item.increaseNum!=null'>+{{
                          item.increaseNum
                        }}
                      </div>
                    </div>
                    <div
                      class='total fl'
                      v-if='item.total!=null'>/{{
                        item.total
                      }}
                    </div>
                    <div style='clear:both'></div>
                  </div>
                </div>

                <img :src='item.src' alt='' />

              </div>
            </div>
          </div>
          <div class='center-content'>
            <div v-if='domain=="prod"' style='height:100%'>
              <template v-if='view=="system"'>
                <system-distribution
                  :system-list='systemList'
                  v-if='!systemItem'
                  :system-loading='systemLoading'
                  @gotoSystemInfo='gotoSystemInfo' ref='main' @checkView='view="dataCenter"'></system-distribution>
                <system-info v-else :system-item='systemItem' @back='systemBack' ref='mainInfo'></system-info>
              </template>
              <template v-else>
                <data-center-view @checkView='view="system"'></data-center-view>
              </template>
            </div>
            <div v-else style='height: 100%'>
              <main-map @checkBranch='checkBranch' ref='mainMap'></main-map>
            </div>
          </div>
          <div style='height:10px'></div>
          <div class='table-box' style='position:relative'>
            <div class='no-error-message ' style='padding-top:48px' v-if='errorMessageTotal==0'>
              <div class='success-text'>
                <div>
                  <img src='@/assets/error-message-success-logo.png' alt='' />
                  <span>当前无处理异常信息</span>
                </div>
              </div>
              <div class='info-text mt-20'>如有未处理的异常信息，将会在此处进行提示，管理员需及时处理新增异常信息以保证系统正常运行。</div>
              <div class='mt-20'>
                <a-button type='primary' @click='gotoDealwith'>查看处理记录</a-button>
              </div>
            </div>
            <a-card :bordered='false' v-else>
              <div slot='title'>
                <div class='flex-center flex-between' style='height:32px'>
                  <div>
                    <img src='@/assets/abnormal.png' style='width:20px;height:20px' alt=''>
                    <span class='ml-5'> {{ errorMessageTotal > 0 ? '未处理异常信息' : '无未处理异常信息' }}   <span
                      v-if='errorMessageTotal'
                      style='color:#DC2929'>  （{{
                        errorMessageTotal
                      }}）</span></span>
                  </div>
                  <div>
                    <a-icon
                      @click='openErrorMessageModal'
                      style='font-size:16px;color:#999999;cursor:pointer'
                      type='fullscreen' />
                  </div>
                </div>

              </div>
              <div style='height:100%;overflow-y:scroll' class='my-scroll'>

                <a-table
                  :columns='columns'
                  :data-source='data'
                  :loading='loading'
                  :pagination='false'
                  :scroll='{y:true}'
                >
                  <template #tooltip='data'>
                    <a-tooltip :title='data' arrowPointAtCenter>
                      <div class='text-ellipsis'>{{ data }}</div>
                    </a-tooltip>
                  </template>
                  <template #action='row'>
                    <div class='error-action'>
                      <div>
                        <span class='fl' @click='exceptionInfo(row)'>详情</span>
                        <!--                        <span class='fl ml-5' @click='dealWith(row)'>处理</span>-->
                      </div>
                    </div>
                  </template>
                </a-table>
              </div>
            </a-card>
          </div>
        </div>
        <div style='width:20.833333%' class='right-chart'>
          <div class='item'>
            <a-card :bordered='false'>
              <div slot='title'>
                <div>
                  <img src='@/assets/worknum.png' style='width:20px;height:20px' alt=''>
                  <span class='ml-5'>每日备份作业数</span>
                </div>
              </div>
              <div style='width:100%;' class='chart'>
                <main-trend id-name='first' ref='worknum' type='one'></main-trend>
              </div>
            </a-card>
          </div>
          <div style='height:10px'></div>
          <div class='item'>
            <a-card :bordered='false'>
              <div slot='title'>
                <div>
                  <img src='@/assets/worknum.png' style='width:20px;height:20px' alt=''>
                  <span class='ml-5'>每日备份数据量（TB）</span>
                </div>
              </div>
              <div style='width:100%;' class='chart'>
                <main-trend id-name='second' ref='datanum' type='two'></main-trend>
              </div>
            </a-card>
          </div>

          <div style='height:10px'></div>
          <div class='item'>
            <a-card :bordered='false'>
              <div slot='title'>
                <div>
                  <img src='@/assets/clound.png' style='width:20px;height:20px' alt=''>
                  <span class='ml-5'>每日磁盘/云储存占用量（TB）</span>
                </div>
              </div>
              <div style='width:100%;' class='chart'>
                <main-trend ref='disknum' id-name='third' type='third'></main-trend>
              </div>
            </a-card>
          </div>
        </div>


      </div>

    </div>
    <error-message-modal
      :domain='domain'
      :visible='errorMessageVisible'
      :id='branchId'
      @cancel='errorMessageVisible = false'
      @dealWithSuccess='dealWithSuccess'></error-message-modal>
    <failed-work-modal
      :domain='domain'
      :branchId='branchId'
      :visible='failedWorkVisible'
      @cancel='failedWorkVisible = false'></failed-work-modal>
    <deal-with-modal :visible='dealWithVisible' @cancel='dealWithVisible = false' @ok='dealWithOk'></deal-with-modal>
    <exception-info-modal
      :detail-item='exceptionItem'
      :visible='exceptionVisible'
      @cancel='exceptionVisible = false'></exception-info-modal>
  </div>

</template>

<script>
import HeadCard from './HeadCard'
import WeekCard from './WeekCard'
import CurrentWork from './CurrentWork'
import MainMap from '@views/dashboard/components/MainMap'
import BackupSuccessRate from '@views/dashboard/components/BackupSuccessRate'
import MainTrend from '@views/dashboard/components/MainTrend'
import SystemDistribution from '@views/dashboard/components/SystemDistribution'
import SystemInfo from '@views/dashboard/components/SystemInfo'
import ErrorMessageModal from '@views/dashboard/components/modal/ErrorMessageModal'
import { getCurrentWork, get24HoursWork, getBackupSuccessRate, refreshWork } from '@/api/modules/workcontrol/index.js'
import FailedWorkModal from '@views/dashboard/components/modal/FailedWorkModal'
import DealWithModal from '@views/dashboard/components/modal/DealWithModal'
import ExceptionInfoModal from '@views/dashboard/components/modal/ExceptionInfoModal'
import DataCenterView from '@views/dashboard/components/DataCenterView'
import {
  getDomainScale,
  getDomainTrend,
  getSystemList,
  getExceptionList,
  handleException
} from '@api/modules/dashboard/analysis.js'

export default {
  name: 'Analysis',
  components: {
    HeadCard,
    WeekCard,
    CurrentWork,
    MainMap,
    BackupSuccessRate,
    MainTrend,
    SystemDistribution,
    SystemInfo,
    ErrorMessageModal,
    FailedWorkModal,
    DealWithModal,
    ExceptionInfoModal,
    DataCenterView
  },
  watch: {
    domain: {
      handler: function(val) {
        this.init()
        if (val == 'prod') {
          this.listData = [
            {
              title: '应用系统',
              num: '0',
              unit: '个',
              src: require('@/assets/app.png')
            },
            {
              title: '客户端',
              num: '0',
              unit: '个',
              src: require('@/assets/client.png')
            },
            {
              title: '介质服务器',
              num: '0',
              unit: '个',
              src: require('@/assets/server.png')
            },
            {
              title: '前端许可',
              num: '0',
              total: '0',
              unit: 'TB',
              src: require('@/assets/front.png')
            },
            {
              title: '磁盘存储／云存储',
              num: '0',
              total: '0',
              unit: 'TB',
              src: require('@/assets/storage.png')

            }
          ]
          this.columns[1].title = '应用系统'
          this.columns[1].key = 'appSystemName'
          this.columns[1].dataIndex = 'appSystemName'
        } else {

          this.listData[0] = {
            title: '分行',
            num: '0',
            unit: '个',
            src: require('@/assets/branch-logo.png')
          }
          this.columns[1].title = '分行'
          this.columns[1].key = 'branchName'
          this.columns[1].dataIndex = 'branchName'
        }
      },
      immediate: true
    },
    '$route': {
      handler: function(val) {
        this.getDomainTrend()
      }
    }
  },
  data() {
    return {
      view: 'system',
      exceptionItem: {},
      errorMessageTotal: 0,
      dealWithVisible: false,
      failedWorkVisible: false,
      indexStyle: 1,
      domain: 'prod',
      branchId: '',
      rateTime: '604800',
      exceptionVisible: false,
      exceptionId: '',
      listData: [
        {
          title: '应用系统',
          num: '0',
          unit: '个',
          src: require('@/assets/app.png')
        },
        {
          title: '客户端',
          num: '0',
          unit: '个',
          src: require('@/assets/client.png')
        },
        {
          title: '介质服务器',
          num: '0',
          unit: '个',
          src: require('@/assets/server.png')
        },
        {
          title: '前端许可',
          num: '0',
          total: '0',
          unit: 'TB',
          src: require('@/assets/front.png')
        },
        {
          title: '磁盘存储／云存储',
          num: '0',
          total: '0',
          unit: 'TB',
          src: require('@/assets/storage.png')

        }
      ],
      branchListData: [
        {
          title: '',
          src: require('@/assets/app.png')
        },
        {
          title: '客户端',
          num: '0',
          unit: '个',
          src: require('@/assets/client.png')
        },

        {
          title: '前端许可',
          num: '0',
          total: '0',
          unit: 'TB',
          src: require('@/assets/front.png')
        },
        {
          title: '总行存储',
          num: '0',
          total: '-',
          unit: 'TB',
          src: require('@/assets/storage.png')
        },
        {
          title: '分行存储',
          num: '0',
          total: '0',
          unit: 'TB',
          src: require('@/assets/storage.png')
        }
      ],
      columns: [
        {
          title: '异常ID',
          key: 'id',
          width: 80,
          align: 'center',
          dataIndex: 'id',
          scopedSlots: {
            customRender: 'tooltip'
          }
        },
        {
          title: '应用系统',
          key: 'appSystemName',
          width: 100,
          align: 'center',
          dataIndex: 'appSystemName',
          scopedSlots: {
            customRender: 'tooltip'
          }
        },
        {
          title: '发生时间',
          key: 'occurrenceTime',
          width: 120,
          align: 'center',
          dataIndex: 'occurrenceTime',
          scopedSlots: {
            customRender: 'tooltip'
          }
        },
        {
          title: '异常类型',
          key: 'exceptionType',
          width: 100,
          align: 'center',
          dataIndex: 'exceptionType'
        },
        {
          title: '描述',
          key: 'description',
          width: 80,
          align: 'center',
          dataIndex: 'description',
          scopedSlots: {
            customRender: 'tooltip'
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          align: 'center',
          scopedSlots: {
            customRender: 'action'
          }
        }

      ],
      data: [],
      loading: false,
      systemItem: null,
      errorMessageVisible: false,
      currentWorkLoading: false,
      currentWorkDetail: {
        pendingNum: 0,
        runningNum: 0,
        waitingNum: 0,
        suspendedNum: 0
      },
      dailyWorkDetail: {
        completedNum: 0,
        failedNum: 0
      },
      workRate: {
        failedNum: 0,
        finishedNum: 0,
        successRatio: 0,
        totalNum: 0
      },
      systemList: [],
      timer: null,
      systemLoading: false,
      dealWithRow: {},
      exceptionType: ''
    }
  },

  created() {
    //十分钟刷新一次
    this.init()
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        this.init()
      }, 600000)
    }
  },
  mounted() {
    this.getScreenWidth()
  },
  methods: {
    /**
     * 刷新作业
     */
    async refreshWork() {
      try {
        const res = await refreshWork({ domain: this.domain })
        if (res.code === 200) {
          console.log(res, 'res')
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {

      } finally {
        setTimeout(() => {
          this.getCurrentWork()
        }, 3000)
      }
    },
    /**
     * 处理异常
     */
    async handleException(params) {

      try {
        const res = await handleException(params)
        if (res.code == 200) {
          this.$message.success('处理成功')
          this.getExceptionList()
          this.dealWithSuccess()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('处理失败')
      } finally {
        this.dealWithVisible = false
      }
    },
    /**
     * 获取异常信息列表
     * @param {Number} page
     */
    async getExceptionList() {
      this.loading = true
      try {
        let params = {
          domain: this.domain,
          branchId: this.branchId
        }
        let res = await getExceptionList(params)
        if (res.code == 200) {
          this.data = res.result || []
          this.errorMessageTotal = res.result.length || 0
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('请求失败')
      } finally {
        this.loading = false
      }
    },
    /**
     * 获取系统列表
     */
    async getSystemList() {
      this.systemLoading = true
      try {
        let params = {
          domain: this.domain
        }
        const res = await getSystemList(params)
        if (res.code === 200) {
          this.systemList = res.result
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('获取系统列表失败')

      } finally {
        this.systemLoading = false
      }
    },
    /**
     * 获取系统趋势图作业数
     */
    async getDomainTrend() {
      try {
        let params = {
          domain: this.domain,
          branchId: this.branchId
        }
        const res = await getDomainTrend(params)
        if (res.code == 200) {
          if (res.result.metricsChartVos) {
            let workData = res.result.metricsChartVos.filter(item => item.name == '每日备份作业数')[0]
            let dataData = res.result.metricsChartVos.filter(item => item.name == '每日备份数据量')[0]
            let diskData = res.result.metricsChartVos.filter(item => item.name == '每日磁盘/云储存占用量')[0]
            let xdataDataTime = dataData.itemList.filter(item => item.name == '本周')[0].label
            let xdiskDataTime = diskData.itemList.filter(item => item.name == '本周')[0].label
            let xDataTime = workData.itemList.filter(item => item.name == '本周')[0].label
            let xData = xDataTime.map(item => new Date(item * 1).getMonth() + 1 + '/' + new Date(item * 1).getDate())
            let xdataData = xdataDataTime.map(item => new Date(item * 1).getMonth() + 1 + '/' + new Date(item * 1).getDate())
            let xdiskData = xdiskDataTime.map(item => new Date(item * 1).getMonth() + 1 + '/' + new Date(item * 1).getDate())
            let yData = workData.itemList.map((item) => {
              return {
                name: item.name,
                data: item.name == '本周' ? item.value.map((ele, index) => ({
                  value: ele,
                  symbol: index % 3 == 0 ? null : 'none'
                })) : item.value.map((ele, i) => ({ value: ele, symbol: 'none', text: item.label[i] })),
                itemStyle: {
                  normal: {
                    lineStyle: {
                      type: item.name == '上周' ? 'dotted' : 'solid'
                    }
                  }
                }
              }
            })
            let ydataData = dataData.itemList.map((item) => {
              return {
                name: item.name,
                data: item.name == '本周' ? item.value.map((ele, index) => ({
                  value: ele,
                  symbol: index % 3 == 0 ? null : 'none'
                })) : item.value.map((ele, i) => ({ value: ele, symbol: 'none', text: item.label[i] })),
                itemStyle: {
                  normal: {
                    lineStyle: {
                      type: item.name == '上周' ? 'dotted' : 'solid'
                    }
                  }
                }
              }
            })
            let ydiskData = diskData.itemList.map((item) => {
              if (item.name == '本周') {
                return {
                  name: item.name,
                  data: item.value.map((ele, index) => ({
                    value: ele,
                    symbol: index % 3 == 0 ? null : 'none'
                  })),
                  itemStyle: {
                    normal: {}
                  }
                }
              }
            })
            let formatter = (params) => {

              let month = params[0].axisValueLabel.substring(0, params[0].axisValueLabel.indexOf('/'))
              let day = params[0].axisValueLabel.substring(month.length + 1, params[0].axisValueLabel.length)
              let oldMonth = new Date(params[1].data.text * 1).getMonth() + 1
              let oldDay = new Date(params[1].data.text * 1).getDate()
              //获取增加或减少百分比
              let percent = (params[0].value * 1 - params[1].value * 1) / (params[1].value * 1)
              if (params[0].value * 1 - params[1].value * 1 == 0) {
                percent = 0
              }
              if (params[1].value * 1 == 0) {
                percent = params[0].value * 1
              }
              let percentStr = percent >= 0 ? '+' + (percent * 100).toFixed(2) + '%' : (percent * 100).toFixed(2) + '%'
              let res = `<div>
                <div style='color:#27AFF3'>
                  ${month}月 ${day} 日：${params[0].value} <span style='font-size:12px;color:#989696'>${percentStr}</span>
                </div>
                <div>
                  ${oldMonth}月 ${oldDay} 日：${params[1].value}
                </div>
              </div>`
              return res

            }
            this.$nextTick(() => {
              setTimeout(() => {
                this.$refs.worknum.init(xData, yData, formatter)
                this.$refs.datanum.init(xdataData, ydataData, formatter)
                this.$refs.disknum.init(xdiskData, ydiskData.filter(item => item))
              }, 100)

            })
          }

        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e, 'e')
        this.$message.error('获取系统趋势图失败')
      }
    },
    /**
     * 获取系统规模值
     */
    async getDomainScale() {
      try {
        let params = {
          domain: this.domain,
          branchId: this.branchId
        }

        const res = await getDomainScale(params)
        if (res.code == 200) {
          this.listData[0].num = res.result.appSystemNum || 0
          this.listData[1].num = res.result.clientNum || 0
          this.listData[2].num = res.result.mediaAgentNum || 0
          this.listData[3].num = res.result.foreLicenseUsed || 0
          this.listData[3].total = res.result.foreLicenseTotal || 0
          this.listData[4].num = res.result.diskStorageUsed || 0
          this.listData[4].total = res.result.diskStorageTotal || 0
          this.listData[1].increaseNum = res.result.increaseClient || 0
          this.listData[4].increaseNum = res.result.increaseDisk || 0
          if (this.domain == 'prod') {

          } else {
            if (!this.branchId) {
              this.listData[0].num = res.result.branchNum || 0
              this.listData[1].num = res.result.clientNum || 0
              this.listData[2].num = res.result.mediaAgentNum || 0
              this.listData[3].num = res.result.foreLicenseUsed || 0
              this.listData[3].total = res.result.foreLicenseTotal || 0
              this.listData[4].num = res.result.diskStorageUsed || 0
              this.listData[4].total = res.result.diskStorageTotal || 0
              this.listData[1].increaseNum = res.result.increaseClient || 0
              this.listData[4].increaseNum = res.result.increaseDisk || 0
            } else {
              this.listData[2].num = res.result.foreLicenseUsed
              this.listData[2].total = res.result.foreLicenseTotal
              this.listData[0].num = ''
              this.listData[4].num = res.result.branchStorageUsed || 0
              this.listData[4].total = res.result.branchStorageTotal || 0
              this.listData[4].increaseNum = res.result.branchStorageInc || 0
              this.listData[3].num = res.result.headStorage || 0
              this.listData[3].increaseNum = res.result.headStorageInc || 0
              this.listData[3].total = '-'
            }

          }

        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e, 'e')
        this.$message.error('获取系统规模值失败')
      }


    },
    /**
     * 获取备份成功率
     */
    async getBackupSuccessRate() {
      try {
        let res = await getBackupSuccessRate({
          domain: this.domain,
          branchId: this.branchId,
          searchTime: this.rateTime
        })
        if (res.code == 200) {
          this.workRate = res.result
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('获取备份成功率失败')
      }
    },
    /**
     * 获取24小时作业
     */
    async get24HoursWork() {
      let params = {
        domain: this.domain,
        branchId: this.branchId
      }
      try {
        let res = await get24HoursWork(params)
        if (res.code == 200) {
          this.dailyWorkDetail = res.result || {}
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('获取24小时作业失败')
      } finally {

      }
    },
    /**
     * 获取当前工作
     */
    async getCurrentWork(type = 1) {
      this.currentWorkLoading = type === 1 ? true : false

      try {
        let params = {
          domain: this.domain,
          branchId: this.branchId
        }
        const res = await getCurrentWork(params)
        if (res.code == 200) {
          this.currentWorkDetail = res.result || {}
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e, 'e')
        this.$message.error('获取当前工作失败')
      } finally {
        this.currentWorkLoading = false
      }
    },
    /**
     * 环境改变
     */
    changeDomain() {
      this.branchId = ''
    },
    /**
     *   判断屏幕分辨率和缩放比
     */
    getScreenWidth() {
      let ratio = window.devicePixelRatio
      let screenWidth = window.screen.width * ratio
      // if (screenWidth == 1920) {
      //   this.$refs.mainAnalysis.style.height = '100%'
      // } else {
      //   this.$refs.mainAnalysis.style.height = 'calc(100% + 200px)'
      // }

    },
    /**
     * 获取分行
     * @param item
     */
    checkBranch(item) {

      if (item) {
        this.listData = this.branchListData
        this.listData[0].title = item.name
        this.branchId = item.branchId
      } else {
        this.listData = [
          {
            title: '分行',
            num: '0',
            unit: '个',
            src: require('@/assets/branch-logo.png')
          },
          {
            title: '客户端',
            num: '0',
            unit: '个',
            src: require('@/assets/client.png')
          },
          {
            title: '介质服务器',
            num: '0',
            unit: '个',
            src: require('@/assets/server.png')
          },
          {
            title: '前端许可',
            num: '0',
            total: '0',
            unit: 'TB',
            src: require('@/assets/front.png')
          },
          {
            title: '磁盘存储／云存储',
            num: '0',
            total: '0',
            unit: 'TB',
            src: require('@/assets/storage.png')

          }
        ]
        this.branchId = ''
      }
      this.init()
    },
    /**
     * 页面初始化
     */
    init() {
      this.getCurrentWork()
      this.get24HoursWork()
      this.getBackupSuccessRate()
      this.getDomainScale()
      this.getDomainTrend()
      this.getSystemList()
      this.getExceptionList()
    },
    /**
     * 查看处理记录
     */

    gotoDealwith() {
      this.$router.push({
        name: 'backup-exception-ProcessHistoryList'
      })
    },
    gotoWorkControl(state = '') {
      this.$router.push({
        name: 'backup-workControl',
        params: {
          domain: this.domain,
          branchId: this.branchId,
          state: state
        }
      })
      // this.$router.push({
      //   path: '/backup/workControl',
      //   query: {
      //     state: state,
      //     domain: this.domain
      //   }
      // })
    },
    exceptionInfo(row) {
      this.exceptionItem = row
      this.exceptionVisible = true
    },
    /**
     * 处理
     * @param row
     */
    dealWith(row) {
      this.dealWithRow = row
      this.dealWithVisible = true
    },
    dealWithSuccess() {
      if (this.domain == 'prod') {
        if (!this.systemItem) {
          this.getSystemList()
        } else {
          this.$nextTick(() => {
            this.$refs.mainInfo.getSystemDetail()
          })
        }
      } else {
        this.$nextTick(() => {
          this.$refs.mainMap.getBranchMapList()
        })
      }

    },
    dealWithOk(reason) {
      let params = {
        ids: this.dealWithRow.id,
        type: 1,
        handledDesc: reason
      }
      this.handleException(params)
    },
    openErrorMessageModal() {
      console.log(123)
      this.errorMessageVisible = true
    },
    gotoSystemInfo(item) {
      this.systemItem = item
    },
    handleDomainChange(domain) {
      this.domain = domain
    },
    systemBack() {
      this.systemItem = null
    }

  }
}
</script>
<style scoped lang='less'>
.tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
}

/deep/ .my-tabs .ant-tabs-tab {
  margin: 0 !important;
  background: #F4F5F7;
  color: #9C9A9A;
  padding: 10px 30px;
  border-radius: 5px;
}

/deep/ .my-tabs .ant-tabs-tab-active {
  border: none !important;
  background: #3475EF;
  color: white
}

/deep/ .my-tabs .ant-tabs-bar {
  margin-bottom: 0 !important;
}

/deep/ .my-tabs .ant-tabs-nav-container {
  margin-top: 0 !important;
}

/deep/ .my-tabs .ant-tabs-ink-bar-animated {
  display: none !important;
}

.reset {
  background: rgba(26, 186, 113, 0.09);
  border: 1px solid #1ABA71;
  border-radius: 4px;
  color: #1ABA71;
  font-size: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2px 4px;
  cursor: pointer;
}

.work-control {
  border: 1px solid #76A3F9;
  background: linear-gradient(71deg, #9FC1F0 0%, #5087F0 75%);
  border-radius: 5px;
  font-size: 12px;
  color: white;
  padding: 3px 6px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer
}

/deep/ .wrapper .ant-card-head {
  padding: 0 15px !important;
  font-size: 14px !important
}

/deep/ .wrapper .ant-card-body {
  padding: 15px !important
}

.flex-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .item {
    width: calc(50% - 5px);
    padding: 10px 0;
    background-size: 100% 100% !important;
    cursor: pointer;
    float: left;

    .content {
      margin-left: 20%;
      text-align: center;
      display: inline-block;

      .title {
        margin-top: 10px;
        font-weight: 400;
        color: #333333;
        font-size: 18px;
      }

      .num {
        margin-top: 20px;
        font-size: 36px;
      }


    }
  }

  .item:first-child {
    background: url("../../assets/run.png") no-repeat;

    .num {
      font-weight: 500;
      color: #6C81FF;
    }
  }

  .item:nth-child(2) {
    background: url("../../assets/wait.png") no-repeat;

    .num {
      font-weight: 500;
      color: #36BDF5;
    }
  }

  .item:nth-child(3) {
    background: url("../../assets/pause.png") no-repeat;

    .num {
      font-weight: 500;
      color: #F5C551;
    }
  }

  .item:nth-child(4) {
    background: url("../../assets/unstart.png") no-repeat;

    .num {
      font-weight: 500;
      color: #F7B464;
    }
  }
}

.tfh {
  margin: 0;
  height: 100%;

  .item {
    padding: 10px 0;
  }

  .item:first-child {
    background: url("../../assets/finish.png") no-repeat;

    .num {
      color: #5CC8BB !important;
    }

  }

  .item:nth-child(2) {
    background: url("../../assets/error.png") no-repeat;

    .num {
      color: #F17366 !important;
    }

  }
}

.top-list {
  width: 100%;

  .item:nth-child(2) {
    width: calc(16% - 5px);

    .increase-num {
      top: 0;
      transform: scale(0.9);
    }
  }

  .item:first-child {
    width: calc(17% - 5px);
  }

  .item:nth-child(3) {
    width: calc(16% - 10px);
  }

  .item:nth-child(4) {
    width: calc(24% - 10px);
  }

  .item:last-child {
    width: calc(27% - 10px);

    .increase-num {
      color: #1ABA71;
      top: 15px
    }
  }

  .item {
    width: calc(20% - 10px);
    overflow-x: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 20px 15px;
    border-radius: 5px;
    margin-bottom: 10px;
    text-align: left;
    line-height: 20px;

    .title {
      margin-bottom: 5px;
    }

    .num {

      font-weight: bold;
      color: #333333;
      position: relative;
      font-size: 14px;
      margin-top: 10px;

    }

    .increase-num {
      position: absolute;
      top: 10px;
      right: -20px;
      color: #FF8C00;
      font-size: 12px;

    }

    .total {

      font-weight: 400;
      margin-top: 10px;
    }

    img {
      width: 45px;
      object-fit: cover;
    }
  }
}

.center-content {
  width: 100%;
  height: calc(100% - 33% - 115px);
  background: white;
}

.table-box {
  width: 100%;
  height: calc(33% - 6.66px);
  background: url("../../assets/error-message-success-right.png") no-repeat white;
  background-position: right bottom;

  .ant-card {
    height: 100% !important;
  }
}

/deep/ .table-box .ant-card-body {
  height: calc(100% - 60px) !important;
  padding: 30px 10px !important;
}

/deep/ .table-box table thead th {
  padding: 5px 0 !important;
  background: #EDF3FE !important;
  font-size: 14px !important;
  color: #3E3E3E !important;
}

/deep/ .my-scroll::-webkit-scrollbar, .info::-webkit-scrollbar {
  height: 9px;
  width: 5px;
  background-color: #4d64bd;
}

// 滚动条颜色
/deep/ .my-scroll::-webkit-scrollbar-thumb, .info::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #3475EF;
}


.right-chart {
  height: 100%;

  .item {
    height: calc(33% - 6px);
  }

  .ant-card {
    width: 100%;
    height: 100% !important;
  }

  .chart {
    height: 100%
  }
}

/deep/ .right-chart .ant-card-body {
  height: calc(100% - 53px) !important;
}

/deep/ .right-chart .ant-card-head {

  display: flex !important;
  align-items: center !important;
}

/deep/ .one .ant-card .ant-card-body {
  height: calc(100% - 53px) !important;
  padding: 15px !important;
  line-height: 1 !important;
}

.left-top {
  height: calc(100% - 33% - 10px);

  .one {
    height: calc(58% - 5px);

    .item {
      width: calc(50% - 7.5px);
      height: calc(50% - 10px);
      line-height: 20px;
    }
  }

  .two {
    height: calc(42% - 5px);

    .tfh {

    }

    .item {
      height: calc(100% - 10px);
      cursor: pointer
    }
  }

  .ant-card {
    height: 100%;
  }
}

/deep/ .two .ant-card-body {
  height: calc(100% - 53px) !important;
}

.rate {
  height: calc(33% - 6.66px)
}

/deep/ .rate .ant-card-body {
  padding: 30px 15px !important;
}

.error-action {
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}

.no-error-message {
  text-align: center;

  .success-text {
    font-size: 16px;
    color: #1ABA71;
    display: flex;
    justify-content: space-around;
    align-items: center;

    div {
      display: flex;
      align-items: center;
    }
  }

  .info-text {
    font-size: 12px;
    color: rgba(173, 173, 173, 1)
  }
}

// 判断分辨率是否低于1920
.main-analysis {
  height: 100%;
}

//@media (max-width: 1700px) {
//  .main-analysis {
//
//    .flex-box {
//      .item {
//        .title {
//          margin-top: 5px;
//          font-size: 14px;
//        }
//
//        .content {
//          .num {
//            font-size: 25px;
//          }
//        }
//      }
//
//    }
//
//    .center-content {
//      height: calc(100% - 33% - 80px);
//    }
//
//    .top-list {
//      font-size: 12px;
//
//      .item:first-child {
//        width: calc(14% - 5px);
//      }
//
//      .item:nth-child(2) {
//        .increase-num {
//          top: 0;
//        }
//      }
//
//      .item:nth-child(3) {
//        width: calc(16% - 5px);
//      }
//
//      .item:nth-child(4) {
//        width: calc(27% - 5px);
//      }
//
//      .item:last-child {
//        width: calc(27% - 5px);
//
//        .increase-num {
//          color: #1ABA71;
//        }
//      }
//
//      .item {
//        width: calc(16% - 5px);
//        padding: 10px 5px;
//        height: 60px;
//        line-height: 1;
//
//        .title {
//          //transform: scale(0.8);
//        }
//
//        .num {
//          //transform: scale(0.9);
//          font-weight: bold;
//          color: #333333;
//          position: relative;
//          margin: 0;
//          font-size: 12px;
//
//        }
//
//        .increase-num {
//          position: absolute;
//          top: 10px;
//          right: -20px;
//          color: #FF8C00;
//          transform: scale(0.7);
//        }
//
//        .total {
//          font-weight: 100;
//          transform: scale(0.8);
//          font-weight: 400;
//          margin: 0;
//        }
//
//        img {
//          width: 30px;
//          object-fit: cover;
//        }
//      }
//    }
//  }
//}

.error-message-success {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>