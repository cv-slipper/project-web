<template>
  <div class='reportCenter'>
    <div class='center-inner'>
      <div class='title'>
        <div class='left'>
          {{ getWeekDay() }}
        </div>
        <div class='center'>
          <div class='center_inner'>
            备份运维平台报告看板
          </div>
          <div class='domain'>
            <div :class='{active:domain=="prod"}'>生产域</div>
            <div :class='{active:domain !="prod"}'>分行域</div>
          </div>
        </div>
        <div class='right'>
          {{ dateNow }}
        </div>
      </div>
      <div style='display: flex;height:100%;position: relative'>
        <div class='main-left'>
          <div class='item'>
            <trend-chart></trend-chart>
          </div>
          <div class='item'>
            <front-end-capacity></front-end-capacity>
          </div>
          <div class='item'>
            <pie-chart></pie-chart>
          </div>
        </div>
        <div class='main-center'>

          <div class='main-center-top'>
            <div class='center-ele'>
              <img src='@/assets/data-center-ele.png' alt='' />
            </div>
            <div class='group'>
              <div class='item' v-for='(item,index) in itemList' :key='index'>

                <div>
                  <div class='num'>{{ item.num }}</div>
                  <div class='name'>{{ item.name }}</div>
                </div>
                <div class='year'>
                  <template v-if='item.type==1'>
                    <div>环比上月 <span
                      :class='{success:item.month.indexOf("-")!=-1,error:item.month.indexOf("-"==-1)}'>{{ item.month
                      }}</span></div>
                    <div>环比去年 <span
                      :class='{success:item.year.indexOf("-")!=-1,error:item.year.indexOf("-")==-1}'>{{ item.year
                      }}</span></div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class='main-center-bottom'>
            <div class='useage-box'>
              <repository-usage></repository-usage>
            </div>
          </div>
        </div>
        <div class='main-left'>
          <div class='item'>
            <client-ranking></client-ranking>
          </div>
          <div class='item'>
            <app-ranking></app-ranking>
          </div>
          <div class='item'>
            <capacity-ratio></capacity-ratio>
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

export default {
  name: 'index',
  components: {
    TrendChart,
    FrontEndCapacity,
    PieChart,
    RepositoryUsage,
    ClientRanking,
    AppRanking,
    CapacityRatio
  },
  data() {
    return {
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
      dateNow: ''

    }
  },
  created() {
    this.getDate()
    setInterval(() => {
      this.getDate()
    }, 1000)
  },
  methods: {
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

@media screen and (max-width: 1700px) {
  .group {
    .item {
      width: calc(33% - 10px);

      .year {
        transform: scale(0.9);
        line-height: 20px;
      }
    }

    .item:nth-child(n+4) {
      margin-top: 10px;
    }
  }

  .reportCenter {
    overflow-y: auto;

    .center-inner {
      height: calc(100% + 200px);
    }
  }


}

.useage-box {
  width: 90%;
  height: 100%;
  padding-bottom: 20px;
  margin: 0 auto;
}

/deep/ .reportCenter .ant-select-dropdown {
  z-index: 999999999 !important;
}

</style>