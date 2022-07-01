<template>
  <div class='reportCenter'>
    <div class='center-inner' ref='reportCenter'>
      <div class='title'>
        <div class='left'>
          <span v-if='domain=="prod"'>
          {{ getWeekDay() }}
            </span>
          <a-select v-else style='width:150px' v-model='branchId'>
            <a-select-option v-for='item in branchList' :value='item.id' :key='item.id'>
              {{ item.abbreviation }}
            </a-select-option>
          </a-select>
        </div>
        <div class='center'>
          <div class='center_inner'>
            备份运维平台报告看板
          </div>
          <div class='domain'>
            <div @click='domainClick("prod")' :class='{active:domain=="prod"}'>生产域</div>
            <div @click='domainClick("branch")' :class='{active:domain !="prod"}'>分行域</div>
          </div>
        </div>
        <div class='right'>
          {{ dateNow }}
        </div>
      </div>
      <div style='display: flex;height:100%;position: relative'>
        <div class='main-left'>
          <div class='item'>
            <trend-chart :loading='trendChartLoading' :domain='domain' ref='trendChart'
                         :branch-name='branchName'></trend-chart>
          </div>
          <div class='item'>
            <!--            数据类型分布-客户端数量区-->
            <front-end-capacity :loading='frontEndLoading' :domain='domain' ref='clientTrend' :data='clientNumData'
                                :branch-name='branchName'></front-end-capacity>
          </div>
          <div class='item'>
            <pie-chart :loading='pieChartLoading' :domain='domain' ref='frontPie' v-if='!branchId || domain=="prod"'
                       :branch-name='branchName'></pie-chart>
          </div>
        </div>
        <div class='main-center'>

          <div class='main-center-top'>
            <div class='center-ele'>
              <img src='@/assets/data-center-ele.png' alt='' />
            </div>
            <div class='group'>
              <div class='item' v-for='(item,index) in itemList' :key='index'>
                <template v-if='index==0 && branchId && domain=="branch"'>
                  <div class='branch-name'>{{ branchName }}</div>
                </template>
                <template v-else>
                  <div>
                    <div class='num'>{{ item.num }}</div>
                    <div class='name'>{{ item.name }}</div>
                  </div>
                  <div class='year'>
                    <template v-if='item.type==1'>
                      <div>环比上月
                        <span v-if='parseFloat(item.month)*1==0' style='color: black'>{{ item.month }}</span>
                        <span v-if='parseFloat(item.month)*1>0' class='success'>{{ item.month }}</span>
                        <span v-if='parseFloat(item.month)*1<0' class='error'>{{ item.month }}</span>
                        <!--                        <span-->
                        <!--                          :class='{success:item.month.indexOf("-")==-1,error:item.month.indexOf("-"!=-1)}'>{{-->
                        <!--                            item.month-->
                        <!--                          }}</span>-->
                      </div>
                      <div>环比去年
                        <span v-if='parseFloat(item.year)*1==0' style='color: black'>{{ item.year }}</span>
                        <span v-if='parseFloat(item.year)*1>0' class='success'>{{ item.year }}</span>
                        <span v-if='parseFloat(item.year)*1<0' class='error'>{{ item.year }}</span>
                      </div>
                    </template>
                  </div>
                </template>

              </div>
            </div>
          </div>
          <div class='main-center-bottom'>
            <div :class='["useage-box",{branchActive:branchId && domain=="branch"}]'>
              <repository-usage :loading='repositoryUseageLoading' ref='repositoryUeage' :domain='domain'
                                :branch-name='branchName'></repository-usage>
            </div>
          </div>
        </div>
        <div class='main-left'>
          <div class='item'>
            <client-ranking :loading='clilentRankingLoading' :domain='domain' ref='clientRanking'
                            :branch-name='branchName'></client-ranking>
          </div>
          <div class='item'>
            <pie-chart :loading='pieChartLoading' v-if='branchId && domain=="branch"' ref='frontPie'
                       :branch-name='branchName'></pie-chart>
            <app-ranking :loading='appRankingLoading' :domain='domain' ref='appRanking' v-else
                         v-model='branchRankType'></app-ranking>
          </div>
          <div class='item'>

            <stack-chart :loading='stackChartLoading' ref='stackChart' class='stack-chart'
                         v-if='branchId && domain=="branch"'
                         :branch-name='branchName'></stack-chart>
            <capacity-ratio :loading='capacityRatioLoading' ref='capacityRatio' :domain='domain' v-model='areaPropType'
                            v-else></capacity-ratio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrendChart from '@views/backup/reportCenter/components/TrendChart'
import FrontEndCapacity from '@views/backup/reportCenter/components/FrontEndCapacity'
import PieChart from '@views/backup/reportCenter/components/PieChart'
import RepositoryUsage from '@views/backup/reportCenter/components/RepositoryUsage'
import ClientRanking from '@views/backup/reportCenter/components/ClientRanking'
import AppRanking from '@views/backup/reportCenter/components/AppRanking'
import CapacityRatio from '@views/backup/reportCenter/components/CapacityRatio'
import StackChart from '@views/backup/reportCenter/components/StackChart'
import { getBranchList } from '@api/modules/dashboard/analysis'
import {
  getClientTrends,
  getFrontPie,
  getDomainScale,
  getFrontRank,
  getBranchRank,
  getAreaPropData,
  getAreaPropDataProd,
  getAppSystemRank,
  getDiskUesdData,
  getAppTrendData,
  getDiskTrendData
} from '@api/modules/backup/reportCenter/index'

export default {
  name: 'index',
  components: {
    TrendChart,
    FrontEndCapacity,
    PieChart,
    RepositoryUsage,
    ClientRanking,
    AppRanking,
    CapacityRatio,
    StackChart
  },
  data() {
    return {
      trendChartLoading: true,
      frontEndLoading: true,
      pieChartLoading: true,
      repositoryUseageLoading: true,
      clilentRankingLoading: true,
      appRankingLoading: true,
      stackChartLoading: true,
      capacityRatioLoading: true,
      domain: 'prod',
      itemList: [
        {
          num: 141,
          name: '应用系统数量'
        },
        {
          num: 1090,
          name: '客户端数量',
          type: 1,
          month: '+16.8%',
          year: '+16.8%'
        },
        {
          num: '140TB',
          name: '许可使用量',
          type: 1,
          month: '+16.8%',
          year: '-16.8%'
        },
        {
          num: '150TB',
          name: '存储用量',
          type: 1,
          month: '+16.8%',
          year: '+16.8%'
        },
        {
          num: 1963,
          name: '日均备份作业量',
          type: 1,
          month: '+16.8%',
          year: '+16.8%'
        },
        {
          num: 1963,
          name: '日均备份数据量',
          type: 1,
          month: '+16.8%',
          year: '+16.8%'
        }
      ],
      branchList: [],
      branchId: '',
      branchName: '',
      dateNow: '',
      clientNumData: [],
      branchRankType: 1,
      areaPropType: 1

    }
  },
  created() {
    this.getDate()
    setInterval(() => {
      this.getDate()
    }, 1000)
  },
  watch: {

    domain: {
      handler(val) {
        if (val == 'branch') {
          this.getBranchList()
        }
        this.getBranchName()
      }
    },
    branchId: {
      handler(val) {
        this.getBranchName()
        console.log(12)
        this.initCharts()
      }
    },
    branchRankType: {
      handler(val) {
        if (this.domain == 'branch') {
          this.getBranchRank()
        } else {
          this.getAppSystemRank()
        }

      }
    },
    areaPropType: {
      handler(val) {
        if (this.domain == 'branch' && !this.branchId) {
          this.getAreaPropData()
        } else {
          this.getAreaPropDataProd()
        }

      }
    }
  },
  mounted() {
    // if (window.devicePixelRatio * window.screen.width == 1920) {
    //   this.$refs.reportCenter.style.height = 'calc(100%)'
    // } else {
    //   this.$refs.reportCenter.style.height = 'calc(100% + 200px)'
    // }
    this.initCharts()
  },
  methods: {
    /**
     * 获取存储库增长趋势
     */
    async getDiskTrendData() {
      this.stackChartLoading = true
      try {
        let params = {
          domain: this.domain,
          branchId: this.domain == 'prod' ? '' : this.branchId
        }
        const res = await getDiskTrendData(params)
        if (res.code == 200) {
          this.stackChartLoading = false
          setTimeout(() => {
            if (this.$refs.stackChart) {
              this.$refs.stackChart.inintChartData(res.result)
            }
          }, 100)
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e, 'e')
        this.$message.error('获取存储库增长趋势失败')
      } finally {
        this.stackChartLoading = false
      }
    },
    /**
     * 获取容量及客户端数量趋势图
     */
    async getAppTrendData() {
      this.trendChartLoading = true
      try {
        let params = {
          domain: this.domain,
          branchId: this.domain == 'prod' ? '' : this.branchId
        }
        const res = await getAppTrendData(params)
        if (res.code == 200) {
          if (this.$refs.trendChart) {
            this.$nextTick(() => {
              this.$refs.trendChart.initChartData(res.result)
            })

          }
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e, 'e')
        this.$message.error('获取容量及客户端数量失败')
      } finally {
        this.trendChartLoading = false
      }
    },
    /**
     * 获取存储库使用信息
     */
    async getDiskUesdData() {
      this.repositoryUseageLoading = true
      try {
        let params = {
          domain: this.domain,
          branchId: this.domain == 'prod' ? '' : this.branchId
        }
        const res = await getDiskUesdData(params)
        if (res.code == 200) {
          this.$nextTick(() => {
            if (this.$refs.repositoryUeage) {
              this.$refs.repositoryUeage.initTableData(res.result)
            }
          })
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e, 'e')
        this.$message.error('获取存储库数据失败')
      } finally {
        this.repositoryUseageLoading = false
      }
    },
    /**
     * 获取应用系统排名
     */
    async getAppSystemRank() {
      this.appRankingLoading = true
      try {
        let params = {
          domain: this.domain,
          type: this.branchRankType
        }
        const res = await getAppSystemRank(params)
        if (res.code == 200) {
          this.$nextTick(() => {
            if (this.$refs.appRanking) {
              this.$refs.appRanking.initAppRankList(res.result)
            }
          })
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e)
        this.$message.error('获取应用系统排名失败')
      } finally {
        this.appRankingLoading = false
      }
    },
    /**
     * 获取区域占比数据 生产域
     */
    async getAreaPropDataProd() {
      this.capacityRatioLoading = true
      try {
        let params = {
          type: this.areaPropType
        }
        const res = await getAreaPropDataProd(params)
        if (res.code == 200) {
          setTimeout(() => {
            if (this.$refs.capacityRatio) {
              this.$refs.capacityRatio.initData(res.result)
            }
          }, 100)

        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e)
        this.$message.error('获取区域占比数据失败')
      } finally {
        this.capacityRatioLoading = false
      }
    },
    /**
     * 获取区域占比区数据
     */
    async getAreaPropData() {
      try {
        let params = {
          type: this.areaPropType
        }
        const res = await getAreaPropData(params)
        if (res.code == 200) {
          if (this.$refs.capacityRatio) {
            this.$refs.capacityRatio.initData(res.result)
          }
        } else {
          this.$message.error(res.message)
        }

      } catch (e) {
        console.log(e, 'e')
        this.$message.error('获取区域占比区数据失败')
      }
    },
    /**
     * 获取分行排名
     */
    async getBranchRank() {
      try {
        let params = {
          domain: this.domain,
          branchId: this.domain == 'prod' ? '' : this.branchId,
          type: this.branchRankType
        }
        const res = await getBranchRank(params)
        if (res.code == 200) {
          if (this.$refs.appRanking) {
            this.$refs.appRanking.initAppRankList(res.result)
          }
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e)
        this.$message.error('获取分行排名失败')
      }
    },
    /**
     * 获取前端许可排行
     */
    async getFrontRank() {
      this.clilentRankingLoading = true
      try {
        let params = {
          domain: this.domain,
          branchId: this.domain == 'prod' ? '' : this.branchId
        }

        const res = await getFrontRank(params)
        if (res.code == 200) {
          this.$nextTick(() => {
            if (this.$refs.clientRanking) {
              this.$refs.clientRanking.initTableData(res.result)
            }
          })
        } else {
          this.$message.error('获取失败')
        }
      } catch (e) {
        this.$message.error('获取失败')
      } finally {
        this.clilentRankingLoading = false
      }
    },
    /**
     * 获取规模值
     */
    async getDomainScale() {
      try {
        let params = {
          domain: this.domain,
          branchId: this.domain == 'prod' ? '' : this.branchId
        }
        const res = await getDomainScale(params)
        if (res.code == 200) {
          if (this.domain == 'prod') {
            this.itemList[0].num = res.result.appSystemNum || 0

          } else {
            this.itemList[0].num = res.result.branchNum || 0
          }
          this.itemList[1].num = res.result.clientNum | 0
          this.itemList[1].month = this.setProp(res.result.clientMonthlyInc) || ''
          this.itemList[1].year = this.setProp(res.result.clientYearlyInc) || ''
          this.itemList[2].num = res.result.licenseUsed || 0
          this.itemList[2].month = this.setProp(res.result.licUsedMonthlyInc) || ''
          this.itemList[2].year = this.setProp(res.result.licUsedYearlyInc) || ''
          this.itemList[3].num = res.result.diskUsed || 0
          this.itemList[3].month = this.setProp(res.result.diskUsedMonthlyInc) || ''
          this.itemList[3].year = this.setProp(res.result.diskUsedYearlyInc) || ''
          this.itemList[4].num = res.result.backupJobNum || 0
          this.itemList[4].month = this.setProp(res.result.jobNumMonthlyInc) || ''
          this.itemList[4].year = this.setProp(res.result.jobNumYearlyInc) || ''
          this.itemList[5].num = res.result.backupJobSize || 0
          this.itemList[5].month = this.setProp(res.result.backupSizeMonthlyInc) || ''
          this.itemList[5].year = this.setProp(res.result.backupSizeYearlyInc) || ''
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('获取失败')
      }
    },
    /**
     * 获取前端许可数据（数据类型分布）
     */
    async getFrontPie() {
      this.pieChartLoading = true
      try {
        let params = {
          domain: this.domain,
          branchId: this.domain == 'prod' ? '' : this.branchId
        }
        const res = await getFrontPie(params)
        if (res.code == 200) {
          setTimeout(() => {
            if (this.$refs.frontPie) {
              this.$refs.frontPie.initChart(res.result)
            }
          }, 100)
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('获取数据')
      } finally {
        this.pieChartLoading = false
      }
    },
    /**
     * 获取客户端趋势数据
     */
    async getClientTrends() {
      this.frontEndLoading = true
      try {
        let params = {
          domain: this.domain,
          branchId: this.domain == 'prod' ? '' : this.branchId
        }
        const res = await getClientTrends(params)
        if (res.code == 200) {
          this.$nextTick(() => {
            if (this.$refs.clientTrend) {
              this.$refs.clientTrend.initDataSource(res.result)
            }
          })

        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('获取数据失败')
      } finally {
        this.frontEndLoading = false
      }
    },
    /**
     * 获取分行列表
     */
    async getBranchList() {
      try {
        const res = await getBranchList()
        if (res.code == 200) {
          this.branchList = res.result || []
          this.branchList.unshift({
            id: '',
            abbreviation: '全域'
          })
          console.log(this.branchList, 'this.branchList')
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.branchList = []
      }
    },
    /**
     * 设置百分比
     */
    setProp(num) {
      return num ? num < 0 ? num + '%' : '+' + num + '%' : ''
    },
    /**
     * 初始化echarts图例
     */
    initCharts() {
      this.getClientTrends()
      this.getFrontPie()
      this.getDomainScale()
      this.getFrontRank()
      if (this.domain == 'branch') {
        this.getBranchRank()
      } else {
        this.getAppSystemRank()
      }
      if (this.domain == 'branch' && !this.branchId) {
        this.getAreaPropData()
      } else {
        this.getAreaPropDataProd()
      }
      this.getDiskUesdData()
      this.getAppTrendData()
      this.getDiskTrendData()

    },

    /**
     * 获取分行名称
     */
    getBranchName() {
      if (this.branchId) {
        const branch = this.branchList.find(item => item.id == this.branchId)
        if (branch && this.domain == 'branch') {
          this.branchName = branch.abbreviation
        } else {
          this.branchName = '全域'
        }
      } else {
        this.branchName = '全域'
      }
      this.initCharts()

    },
    /**
     * 获取今天星期几中文
     * @returns {string}
     */
    getWeekDay() {
      let weekDay = ['日', '一', '二', '三', '四', '五', '六']
      let date = new Date()
      let day = date.getDay()
      return '星期' + weekDay[day]
    },
    /**
     * 切换域
     * @param {string} domain
     */
    domainClick(domain) {
      this.domain = domain
      if (domain == 'prod') {
        this.itemList[0].name = '应用系统数量'
      } else {
        this.itemList[0].name = '分行数量'
      }
      this.initCharts()

    },
    /**
     * 获取当前日期精确到秒
     * @returns {string}
     */
    getDate() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      //补零
      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      hour = hour < 10 ? '0' + hour : hour
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second

      this.dateNow = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }
  }
}
</script>

<style scoped lang='less'>
.reportCenter {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-image: url("../../../assets/report-bg.png");
  background-color: rgba(255, 255, 255, 1);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 20px 20px;


  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      width: calc(25% - 50px);
    }

    .left {
      text-align: left;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #666666;
      width: 25%;
    }

    .right {
      text-align: right;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #666666;
      width: 25%;
    }

    .center {
      width: 50%;
      text-align: center;
      position: relative;

      .center_inner {
        width: 100%;
        margin: 0 auto;
        background-image: url("../../../assets/report-title-bg.png");
        background-size: 100% 100%;
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #364663;
        padding-bottom: 10px;
      }

      .domain {
        position: absolute;
        right: 0;
        bottom: 0;
        width: calc(30% - 10px);
        height: 80%;
        display: flex;
        justify-content: space-between;

        div {
          width: calc(50% - 5px);
          height: 100%;
          text-align: center;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #666666;
          transform: skewX(-30deg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666666;
          border: 1px solid #666666;
          background: white;
          cursor: pointer;
        }

        .active {
          background: #3C6BE3;
          border: 1px solid #3C6BE3;
          color: white;
        }
      }

    }
  }
}

.main-left {
  width: 25%;
  height: calc(100% - 20px);
  margin-top: 20px;

  .item {
    height: calc(33% - 4px);
    margin-top: 6px;
  }

  .item:first-child {
    margin-top: 0;
  }
}

.center-inner {
  width: 100%;
  height: 100%;
}

.main-center {
  width: 50%;
  height: calc(100% - 20px);
  margin-top: 20px;

  .main-center-top {
    height: calc(66% - 2px);
    overflow: hidden;
    background: url("../../../assets/data-center-bg.png") no-repeat;
    background-size: 100% 100%;
    position: relative;

    .center-ele {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      text-align: center;

      img {
        width: 80%;
        object-fit: fill;
      }
    }
  }

  .main-center-bottom {
    height: calc(33% - 4px);
    margin-top: 6px;
  }

}

.group {
  padding: 20px;
  padding-top: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .item {
    width: calc(25% - 5px);
    box-shadow: 0px 5px 24px 0px rgba(21, 57, 148, 0.13);
    opacity: 0.8;
    border-radius: 5px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;

    .num {
      color: #3C6BE3;
      font-size: 20px;
      font-weight: bold;
    }

    .name {
      font-size: 12px;
      font-weight: bold;
      color: black
    }

    .year {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #666666;
    }
  }

  .item:nth-child(n+5) {
    margin-top: 10px;
  }
}

.success {
  color: #1BC78B;
  font-weight: bold;
}

.error {
  color: #FF5252;
  font-weight: bold;
}

//@media (max-width: 1700px) {
//  .group {
//    .item {
//      width: calc(33% - 10px);
//
//      .year {
//        transform: scale(0.9);
//        line-height: 20px;
//      }
//    }
//
//    .item:nth-child(n+4) {
//      margin-top: 10px;
//    }
//  }
//
//  .reportCenter {
//    overflow-y: auto;
//
//    .center-inner {
//      //height: calc(100% + 200px);
//    }
//  }
//
//
//}

.useage-box {
  width: 90%;
  height: 100%;
  padding-bottom: 20px;
  margin: 0 auto;
}

/deep/ .reportCenter .ant-select-dropdown {
  z-index: 999999999 !important;
}

.branchActive {
  width: calc(100% - 20px);
  position: relative;
  right: calc(50% + 20px);
  top: 0;
}

.stack-chart {
  width: calc(200% - 20px);
  position: relative;
  right: 100%;
}

.branch-name {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 24px;
  font-family: Noto Sans S Chinese;
  font-weight: 900;
  color: #3C6BE3;
}
</style>