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
          {{ getDate() }}
        </div>
      </div>
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
    </div>
  </div>
</template>

<script>
import TrendChart from '@views/backup/reportCenter/components/TrendChart'
import FrontEndCapacity from '@views/backup/reportCenter/components/FrontEndCapacity'
import PieChart from '@views/backup/reportCenter/components/PieChart'

export default {
  name: 'index',
  components: {
    TrendChart,
    FrontEndCapacity,
    PieChart
  },
  data() {
    return {
      domain: 'prod'
    }
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

      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
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
  z-index: 99999;
  background-image: url("../../../assets/report-bg.png");
  background-color: rgba(255, 255, 255, 1);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 20px 40px;

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
      width: calc(25% + 50px);
    }

    .right {
      text-align: right;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #666666;
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
    height: 33%;
  }
}

.center-inner {
  height: 100%;
}

@media screen and (max-width: 1440px) {
  .reportCenter {
    overflow-y: auto;

    .center-inner {
      height: calc(100% + 200px);
    }
  }


}
</style>