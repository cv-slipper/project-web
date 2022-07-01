<template>
  <div class='client-ranking'>
    <div class='trend-chart-title'>
      <div>
        客户端前端许可用量排名
      </div>
      <div v-if='domain!="prod"' class='info-text'>
        当前：{{ branchName }}
      </div>
      <div class='little-title'></div>
    </div>
    <a-spin v-if='loading' size='large'
            style='position: absolute;left:0;right:0;top:0;bottom: 0;margin:auto;display: flex;align-items: center;justify-content: space-around'>

    </a-spin>
    <div v-else class='table-box mt-10'>
      <a-table
        :columns='columns'
        :data-source='tableData'
        :pagination='false'
      >
        <template #ranking='row'>
          <div class='rank-slot'>
            <span class='rank-num'>{{ row.index + 1 }}</span>
            <img class='ranking-bg' v-if='row.index<3' :src="require('@/assets/top'+(row.index+1) +'.png')" alt=''>
            <img class='ranking-bg' v-else src='@/assets/top4.png' alt=''>
          </div>

        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'clientRanking',
  props: {
    branchName: {
      type: String,
      default: ''
    },
    domain: {
      type: String,
      deafult: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '',
      columns: [
        {
          title: ' ',
          scopedSlots: {
            customRender: 'ranking'
          }
        },
        {
          title: '客户端名称',
          dataIndex: 'clientName'

        },
        {
          title: '分行名称',
          dataIndex: 'belongName'

        },
        {
          title: '前端容量',
          dataIndex: 'foreSize'
        },
        {
          title: '环比上月',
          dataIndex: 'ratio'
        }
      ],
      tableData: []
    }
  },
  methods: {
    initTableData(data) {
      data.forEach((item, index) => {
        item.index = index
        item.ratio = item.ratio < 0 ? item.ratio + '%' : '+' + item.ratio + '%'
      })
      this.tableData = data
    }
  }
}
</script>

<style scoped lang='less'>
.client-ranking {
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

.table-box {
  height: calc(100% - 55px);
  overflow-y: auto;
}

/deep/ .table-box table thead tr th {
  padding: 5px 10px;
  background: rgba(10, 51, 126, 0.09) !important;
}

/deep/ .table-box .ant-table-placeholder {
  background: rgba(0, 0, 0, 0) !important;
  border-bottom: none !important;
}

/deep/ .table-box table {
  border: none !important;
}

/deep/ .table-box .ant-table-tbody > tr:nth-child(2n) {
  background: rgba(10, 51, 126, 0.09) !important;
}

/deep/ .table-box .ant-table-tbody > tr > td {
  border-bottom: none !important;
  padding: 10px 10px !important;
}

/deep/ .table-box::-webkit-scrollbar, .info::-webkit-scrollbar {
  height: 9px;
  width: 5px;
  background-color: #4d64bd;
}

// 滚动条颜色
/deep/ .table-box::-webkit-scrollbar-thumb, .info::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #3475EF;
}

.rank-slot {
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .rank-num {
    z-index: 99;
    color: white;
  }

  .ranking-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 24px;
    height: 20px;
    object-fit: fill;
  }
}

@media screen and(max-width: 1700px) {
  /deep/ .table-box table thead tr th {
    padding: 15px 5px !important;
    font-size: 12px !important;
  }

  /deep/ .table-box table tbody tr td {
    padding: 15px 5px !important;
    font-size: 12px !important;
  }

  /deep/ .table-box .ant-table-tbody > tr > td {
    border-bottom: none !important;
    padding: 15px 5px !important;
  }
}

/deep/ .ant-select-dropdown {
  z-index: 9999;
}
</style>