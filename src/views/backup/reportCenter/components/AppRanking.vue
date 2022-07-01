<template>
  <div class='app-ranking'>
    <div class='trend-chart-title'>
      <div>
        {{ domain == 'branch' ? '各分行' : '应用系统' }}{{ values == 1 ? '前端许可用量' : values == 2 ? '后端存储用量' : '客户端数量' }}排名
      </div>

      <a-select v-model='values' class='select' @change='selectChange'>
        <a-select-option v-for='(item,index) in dataList' :value='item.value' :key='index'>{{ item.label }}
        </a-select-option>
      </a-select>

      <div class='little-title'></div>
    </div>
    <a-spin v-if='loading'
            size='large'
            style='position: absolute;left:0;right:0;top:0;bottom: 0;margin:auto;display: flex;align-items: center;justify-content: space-around'>

    </a-spin>
    <div class='app-content' v-else>
      <ul v-if='appRankList.length>0' class='cs'>
        <li v-for='(item,index) in appRankList' :key='index'>
          <div class='ranking-img'>
            <span class='rank-num'>{{ index + 1 }}</span>
            <img class='ranking-bg' v-if='index<3' :src="require('@/assets/top'+(index+1) +'.png')" alt=''>
            <img class='ranking-bg' v-else src='@/assets/top4.png' alt=''>

          </div>
          <div :class='{rankingname:domain=="branch",prodName:domain=="prod"}'>
            {{ item.name }}
          </div>

          <a-progress :percent='item.prop' :class='{rankingrate:domain=="branch",prodRate:domain=="prod"}'
                      stroke-color='#3C6BE3' :show-info='false' />
          <div class='ranking-num'>
            {{ item.value }}
          </div>
          <div class='proportion'>
            <span>环比上月{{ item.ratio }}</span>
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
  props: {
    value: {
      type: Number,
      default: 1
    },
    domain: {
      type: String,
      default: 'prod'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.values = val
      },
      immediate: true
    }
  },
  data() {
    return {
      appRankList: [],
      values: 1,
      dataList: [
        {
          value: 1,
          label: '前端'
        },
        {
          value: 2,
          label: '后端'
        },
        {
          value: 3,
          label: '客户端数量'
        }
      ]
    }
  },
  methods: {
    selectChange() {
      this.$emit('input', this.values)
    },
    initAppRankList(data) {
      if (data.length > 0) {
        let max = Math.max(...data.map(item => item.value)) * 1.1
        data.forEach(item => {
          item.prop = parseInt((item.value / max) * 100)
          item.ratio = item.ratio < 0 ? item.ratio + '%' : '+' + item.ratio + '%'
          item.name = this.domain == 'prod' ? item.appSystemName : item.branchName
        })
      }
      this.appRankList = data
    }
  }
}
</script>

<style scoped lang='less'>
.app-ranking {
  height: 100%;
  position: relative;

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
      width: 100px;
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
  font-size: 12px;
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

/deep/ .app-content::-webkit-scrollbar, .info::-webkit-scrollbar {
  height: 9px;
  width: 5px;
  background-color: #4d64bd;
}

// 滚动条颜色
/deep/ .app-content::-webkit-scrollbar-thumb, .info::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #3475EF;
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
      margin-right: 10px;
    }

    .prodRate {
      width: 30%;
      height: 7px;
      margin-right: 10px;
    }

    .rankingrate {
      width: 30%;
      height: 7px;
      margin-right: 10px;
    }

    .ranking-num {
      width: 20%;
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

.rankingname {
  width: 100px;
  font-size: 12px;
  color: #666666;
  margin-left: 10px;
}

.prodName {
  width: 100px;
  font-size: 12px;
  color: #666666;
  margin-left: 10px;
}
</style>