<template>
  <div class='repository-usage'>
    <div class='trend-chart-title'>
      <div>
        存储库使用信息
      </div>
      <div v-if='domain!="prod"' class='info-text'>当前：{{ branchName }}</div>
      <div class='little-title'></div>
    </div>
    <a-spin v-if='loading' size='large'
            style='position: absolute;left:0;right:0;top:0;bottom: 0;margin:auto;display: flex;align-items: center;justify-content: space-around'>

    </a-spin>
    <div class='useage-table' v-else>
      <a-table
        :columns='columns'
        :data-source='tableData'
        :pagination='false'
        :scroll='{y:"100%"}'
      ></a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepositoryUsageTable',
  props: {
    branchName: {
      type: String,
      default: ''
    },
    domain: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    domain: {
      handler(val) {
        if (val == 'prod') {
          this.columns = [
            {
              title: '序号',
              customRender: (text, record, index) => {
                return index + 1
              },
              width: 60
            },
            {
              title: '存储库',
              dataIndex: 'libName',
              align: 'center',
              width: 120
            },
            {
              title: '使用量',
              dataIndex: 'diskUsed',
              align: 'center'
            },
            {
              title: '环比上月',
              dataIndex: 'ratio',
              align: 'center'
            },
            {
              title: '总容量',
              dataIndex: 'diskTotal',
              align: 'center'
            },
            {
              title: '预计扩容日期',
              dataIndex: 'expansionDate',
              align: 'center'
            }
          ]
        } else {
          this.columns = [
            {
              title: '序号',
              customRender: (text, record, index) => {
                return index + 1
              },
              width: 60
            },
            {
              title: '存储库',
              dataIndex: 'libName',
              align: 'center',
              width: 180
            },
            {
              title: '所属分行',
              dataIndex: 'branchName',
              align: 'center'
            },
            {
              title: '使用量',
              dataIndex: 'diskUsed',
              align: 'center'
            },
            {
              title: '环比上月',
              dataIndex: 'ratio',
              align: 'center'
            },
            {
              title: '总容量',
              dataIndex: 'diskTotal',
              align: 'center'
            },
            {
              title: '预计扩容日期',
              dataIndex: 'dateToBeFull',
              align: 'center'
            }
          ]
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      columns: [
        {
          title: '序号',
          customRender: (text, record, index) => {
            return index + 1
          },
          width: 60
        },
        {
          title: '存储库',
          dataIndex: 'libName',
          align: 'center'
        },
        {
          title: '所属分行',
          dataIndex: 'branchName',
          align: 'center'
        },
        {
          title: '使用量',
          dataIndex: 'diskUsed',
          align: 'center'
        },
        {
          title: '环比上月',
          dataIndex: 'ratio',
          align: 'center'
        },
        {
          title: '总容量',
          dataIndex: 'diskTotal',
          align: 'center'
        },
        {
          title: '预计扩容日期',
          dataIndex: 'dateToBeFull',
          align: 'center'
        }
      ],
      tableData: []
    }
  },
  methods: {
    initTableData(data) {

      if (data.length > 0) {
        data.forEach(item => {
          item.ratio = item.ratio < 0 ? item.ratio + '%' : '+' + item.ratio + '%'
        })
      }
      this.tableData = data
    }
  }
}
</script>

<style scoped lang='less'>
.repository-usage {
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

.useage-table {
  height: calc(100% - 35px);
}

/deep/ .ant-table-body::-webkit-scrollbar, .info::-webkit-scrollbar {
  height: 9px;
  width: 5px;
  background-color: #4d64bd;
}

// 滚动条颜色
/deep/ .ant-table-body::-webkit-scrollbar-thumb, .info::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #3475EF;
}

/deep/ .useage-table .ant-table-thead > tr > th {
  background: rgba(0, 0, 0, 0) !important;
  border-bottom: none
}

/deep/ .useage-table table {
  border: none !important;
}

/deep/ .useage-table .ant-table-placeholder {
  border: none !important;
  background: rgba(0, 0, 0, 0) !important;
}

/deep/ .useage-table .ant-table-tbody > tr > td {
  border-bottom: none !important;
}

/deep/ .useage-table .ant-table-tbody > tr {
  background: rgba(0, 0, 0, 0) !important;
}

/deep/ .useage-table .ant-table-tbody > tr:nth-child(2n-1) {
  background: rgba(10, 51, 126, 0.09) !important;
}

/deep/ .ant-table-wrapper {
  height: 100% !important;
}

/deep/ .ant-spin-container {
  height: 100%;
}

/deep/ .ant-spin-nested-loading {
  height: 100%;
}

/deep/ .ant-table {
  height: 100%;
}

/deep/ .ant-table-content {
  height: 100%;
}

/deep/ .ant-table-scroll {
  height: 100%;
  overflow: hidden;
}

/deep/ .ant-table-header {
  background: rgba(0, 0, 0, 0) !important;
}

/deep/ .ant-table-body {
  height: calc(100% - 44px);
  overflow-y: auto !important;
  background: rgba(0, 0, 0, 0) !important;
}
</style>