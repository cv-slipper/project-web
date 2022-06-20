<template>
  <div class='app-ranking'>
    <div class='trend-chart-title'>
      <div>
        应用系统前端容量排名
      </div>

      <a-select v-model='value' class='select'>
        <a-select-option v-for='(item,index) in dataList' :value='item.value' :key='index'>{{ item.label }}
        </a-select-option>
      </a-select>

      <div class='little-title'></div>
    </div>
    <div class='app-content'>
      <ul v-if='appRankList.length>0' class='cs'>
        <li v-for='(item,index) in appRankList' :key='index'>
          <div class='ranking-img'>
            <span class='rank-num'>{{ index + 1 }}</span>
            <img class='ranking-bg' v-if='index<3' :src="require('@/assets/top'+(index+1) +'.png')" alt=''>
            <img class='ranking-bg' v-else src='@/assets/top4.png' alt=''>

          </div>
          <div class='ranking-name'>
            {{ item.name }}
          </div>

          <a-progress :percent='30' class='ranking-rate' stroke-color='#3C6BE3' :show-info='false' />
          <div class='ranking-num'>
            {{ item.num }}
          </div>
          <div class='proportion'>
            <span>{{ item.proportion }}</span>
          </div>
        </li>
      </ul>
      <div v-else class='empty'>
        <a-empty />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppRanking',
  data() {
    return {
      value: 1,
      appRankList: [{}, {}, {}],
      dataList: [
        {
          value: 1,
          label: '前端'
        },
        {
          value: 2,
          label: '后端'
        }

      ]
    }
  }
}
</script>

<style scoped lang='less'>
.app-ranking {
  height: 100%;

  .trend-chart-title {
    font-size: 16px;
    font-weight: bold;
    color: #4D555E;
    padding-bottom: 10px;
    border-bottom: 1px solid #666666;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .select {
      width: 80px;
      height: 20px;
      position: absolute;
      right: 0;
      top: 0;
    }

    .info-text {

      font-weight: 400;
      color: #666666;
      font-size: 12px;
    }

    .little-title {
      width: 30px;
      height: 2px;
      background: #3C6BE3;
      position: absolute;
      left: 10%;
      bottom: 0;
    }
  }
}

.app-content {
  width: 100%;
  margin: 20px auto;
  height: calc(100% - 55px);
  overflow-y: auto;
}

/deep/ .app-ranking table {
  border: none !important;
}

/deep/ .app-ranking .ant-table-placeholder {
  border: none !important;
  background: rgba(0, 0, 0, 0) !important;
}

/deep/ .app-ranking .ant-table-tbody > tr > td {
  border-bottom: none !important;
}

/deep/ .app-ranking .ant-table-tbody > tr:nth-child(2n) {
  background: rgba(10, 51, 126, 0.09) !important;
}

/deep/ .select .ant-select-selection {
  height: 25px !important;
  font-size: 12px !important;
  line-height: 25px !important;
}

/deep/ .select .ant-select-selection-selected-value {
  line-height: 25px !important;
}

.ranking-img {
  width: 24px;
  height: 20px;
  position: relative;

  .ranking-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
}

.cs {
  list-style: none;
  padding: 0;

  li:first-child {
    margin-top: 0;
  }

  li {
    display: flex;
    margin-top: 20px;

    .ranking-rate {
      width: 45%;
      height: 7px;
      margin: 0 15px;
    }

    .ranking-num {
      margin-right: 10px
    }

    div {
      .rank-num {
        width: 20px;
        z-index: 9999;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: white;
      }
    }
  }
}
</style>