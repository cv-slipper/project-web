<template>
  <div style='height:calc(100% + 153px)'>
    <div class='tabs'>
      <div class='tab-list'>
        <a-tabs class='my-tabs' v-model='domain'>
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
        <div style='width:20.83333%'>
          <div style='height:100%'>
            <div class='left-top'>
              <div class='one'>
                <a-card :bordered='false' style='width: 100%'>
                  <div slot='title'>
                    <div class='flex-center' style='justify-content:space-between'>
                      <div class='flex-center fl'>
                        <img class='fl' style='width:20px;height:20px' src='@/assets/dailyWork.png' alt=''>
                        <span class='ml-5 fl' style='font-size:14px'>当前作业</span>
                        <div class='fl ml-5' @click='getCurrentWork()'>
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
                  <div>
                    <div class='flex-box' style='margin:20px 0'>
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
                      <div class='item mt-15' @click='gotoWorkControl("Suspend,Suspended")'>
                        <div class='content'>
                          <div class='title'>暂停</div>
                          <div class='num'>{{ currentWorkDetail.pendingNum }}</div>
                        </div>
                      </div>
                      <div class='item mt-15' @click='gotoWorkControl("Pending")'>
                        <div class='content'>
                          <div class='title'>未决</div>
                          <div class='num'>{{ currentWorkDetail.suspendedNum }}</div>
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
                      <div class='item'>
                        <div class='content'>
                          <div class='title' style='font-size:16px !important'>完成</div>
                          <div class='num' style='font-size:25px'>{{ dailyWorkDetail.completedNum }}</div>
                        </div>
                      </div>
                      <div class='item' @click='()=>{if(dailyWorkDetail.failedNum>0) failedWorkVisible = true}'>
                        <div class='content'>
                          <div class='title' style='font-size:16px !important'>失败</div>
                          <div class='num' style='font-size:25px'>{{ dailyWorkDetail.failedNum }}</div>
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
                  <div class='fs-12 '>
                    <div class='num fl'> {{ item.num }}{{ item.unit }}
                      <div class='increase-num fl'
                           v-if='item.increaseNum'>+{{ item.increaseNum
                        }}
                      </div>
                    </div>
                    <div
                      class='total fl'
                      v-if='item.total!=null'>/{{ item.total
                      }}{{ item.unit }}
                    </div>
                  </div>
                </div>
                <div>
                  <img :src='item.src' alt='' />
                </div>
              </div>
            </div>
          </div>
          <div class='center-content'>
            <div v-if='domain=="prod"' style='height:100%'>
              <system-distribution
                :system-list='systemList'
                v-if='!systemItem'
                :system-loading='systemLoading'
                @gotoSystemInfo='gotoSystemInfo'></system-distribution>
              <system-info v-else :system-item='systemItem' @back='systemBack'></system-info>
            </div>
            <div v-else style='height: 100%'>
              <main-map></main-map>
            </div>
          </div>
          <div style='height:10px'></div>
          <div class='table-box'>
            <a-card :bordered='false'>
              <div slot='title'>
                <div class='flex-center flex-between' style='height:32px'>
                  <div>
                    <img src='@/assets/abnormal.png' style='width:20px;height:20px' alt=''>
                    <span class='ml-5'> {{ errorMessageTotal > 0 ? '未处理异常信息' : '无未处理异常信息' }}   <span
                      v-if='errorMessageTotal'
                      style='color:#DC2929'>  （{{ errorMessageTotal
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
                <div class='no-error-message' v-if='errorMessageTotal==0'>
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
                <a-table
                  v-else
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
                        <span class='fl'>详情</span>
                        <span class='fl ml-5' @click='dealWith(row)'>处理</span>
                      </div>
                    </div>
                  </template>
                </a-table>
              </div>
            </a-card>
          </div>
        </div>
        <div style='width:20.833333%' class='right-chart'>
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
          <div style='height:10px'></div>
          <a-card :bordered='false'>
            <div slot='title'>
              <div>
                <img src='@/assets/worknum.png' style='width:20px;height:20px' alt=''>
                <span class='ml-5'>每日备份数据量</span>
              </div>
            </div>
            <div style='width:100%;' class='chart'>
              <main-trend id-name='second' ref='datanum' type='two'></main-trend>
            </div>
          </a-card>
          <div style='height:10px'></div>
          <a-card :bordered='false'>
            <div slot='title'>
              <div>
                <img src='@/assets/clound.png' style='width:20px;height:20px' alt=''>
                <span class='ml-5'>每日磁盘/云储存占用量</span>
              </div>
            </div>
            <div style='width:100%;' class='chart'>
              <main-trend ref='disknum' id-name='third' type='third'></main-trend>
            </div>
          </a-card>
        </div>


      </div>

    </div>
    <error-message-modal :visible='errorMessageVisible' @cancel='errorMessageVisible = false'></error-message-modal>
    <failed-work-modal :domain='domain' :visible='failedWorkVisible'
                       @cancel='failedWorkVisible = false'></failed-work-modal>
    <deal-with-modal :visible='dealWithVisible' @cancel='dealWithVisible = false' @ok='dealWithOk'></deal-with-modal>

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
import { getCurrentWork, get24HoursWork, getBackupSuccessRate } from '@/api/modules/workcontrol/index.js'
import FailedWorkModal from '@views/dashboard/components/modal/FailedWorkModal'
import DealWithModal from '@views/dashboard/components/modal/DealWithModal'
import { getDomainScale, getDomainTrend, getSystemList, getExceptionList } from '@api/modules/dashboard/analysis.js'

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
    DealWithModal
  },
  watch: {
    domain: {
      handler: function(val) {
        this.init()
        if (val == 'prod') {
          this.listData[0] = {
            title: '应用系统',
            num: '0',
            unit: '个',
            src: require('@/assets/app.png')
          }
        } else {
          this.listData[0] = {
            title: '分行',
            num: '0',
            unit: '个',
            src: require('@/assets/branch-logo.png')
          }
        }
      },
      immediate: true
    }
  },
  data() {
    return {

      errorMessageTotal: 0,
      dealWithVisible: false,
      failedWorkVisible: false,
      indexStyle: 1,
      domain: 'prod',
      branchId: '',
      rateTime: '604800',
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
      systemLoading: false
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
  methods: {
    /**
     * 获取异常信息列表
     * @param {Number} page
     */
    async getExceptionList() {
      this.loading = true
      try {
        let params = {
          domain: this.domain
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
          domain: this.domain
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
              this.$refs.worknum.init(xData, yData, formatter)
              this.$refs.datanum.init(xdataData, ydataData, formatter)
              this.$refs.disknum.init(xdiskData, ydiskData.filter(item => item))
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
          domain: this.domain
        }

        const res = await getDomainScale(params)
        if (res.code == 200) {
          this.listData[0].num = res.result.appSystemNum || 0
          this.listData[1].num = res.result.clientNum || 0
          this.listData[2].num = res.result.mediaAgentNum || 0
          this.listData[3].num = (res.result.foreLicenseUsed / 1024).toFixed(2) || 0
          this.listData[3].total = (res.result.foreLicenseTotal / 1024).toFixed(2) || 0
          this.listData[4].num = (res.result.diskStorageUsed / 1024).toFixed(2) || 0
          this.listData[4].total = (res.result.diskStorageTotal / 1024).toFixed(2) || 0
          this.listData[1].increaseNum = res.result.increaseClient || 0
          this.listData[4].increaseNum = (res.result.increaseDisk / 1024).toFixed(2) || 0
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
    /**
     * 处理
     * @param row
     */
    dealWith(row) {
      this.dealWithRow = row
      this.dealWithVisible = true
    },
    dealWithOk(reason) {
      console.log(reason)
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
  padding: 0 10px !important;
  font-size: 14px !important
}

/deep/ .wrapper .ant-card-body {
  padding: 10px !important
}

.flex-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .item {
    width: calc(50% - 5px);
    padding: 10px 0;
    background-size: 100% 100% !important;

    .content {
      margin-left: 20%;
      text-align: center;
      display: inline-block;

      .title {
        font-weight: 400;
        color: #333333;
      }

      .num {
        font-size: 20px;
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
    width: calc(18% - 5px);

    .increase-num {
      top: 0;
      transform: scale(0.9);
    }
  }

  .item:first-child {
    width: calc(15% - 5px);
  }

  .item:nth-child(3) {
    width: calc(17% - 5px);
  }

  .item:nth-child(4) {
    width: calc(22% - 5px);
  }

  .item:last-child {
    width: calc(27% - 5px);

    .increase-num {
      color: #1ABA71;
    }
  }

  .item {
    width: calc(19% - 5px);
    overflow-x: hidden;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 10px 5px;
    border-radius: 5px;
    margin-bottom: 10px;

    .title {
      transform: scale(0.8);
    }

    .num {
      transform: scale(0.9);
      font-weight: bold;
      color: #333333;
      position: relative;

    }

    .increase-num {
      position: absolute;
      top: 10px;
      right: -20px;
      color: #FF8C00;
      transform: scale(0.7);
    }

    .total {
      font-weight: 100;
      transform: scale(0.8);
      font-weight: 400;
    }

    img {
      width: 30px;
      object-fit: cover;
    }
  }


}

.center-content {
  width: 100%;
  height: calc(100% - 33% - 76px);
  background: white;
}

.table-box {
  width: 100%;
  height: calc(33% - 6.66px) !important;

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


  .ant-card {
    width: 100%;
    height: calc(33% - 6.66px) !important;
  }

  .chart {
    height: calc(100% - 30px)
  }
}

/deep/ .right-chart .ant-card-body {
  height: calc(100% - 30px) !important;
}

/deep/ .right-chart .ant-card-head {
  height: 64px !important;
  display: flex !important;
  align-items: center !important;
}

.left-top {
  height: calc(100% - 33% - 10px);

  .one {
    height: calc(58% - 5px);
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
  padding: 30px 10px !important;
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
</style>