<template>
  <div class='repository-usage'>
    <div class='trend-chart-title'>
      <div>
        存储库使用量信息
      </div>
      <div class='info-text'></div>
      <div class='little-title'></div>
    </div>
    <div class='useage-table'>
      <a-table
        style='height: 100%'
        :columns='columns'
        :data-source='tableData'
        :pagination='false'
      ></a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepositoryUsageTable',
  data() {
    return {
      columns: [
        {
          title: '序号',
          customRender: (text, record, index) => {
            return index + 1
          },
          width: 80
        },
        {
          title: '存储库',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '使用量',
          dataIndex: 'num',
          align: 'center'
        },
        {
          title: '环比上月',
          dataIndex: 'month',
          align: 'center'
        },
        {
          title: '总容量',
          dataIndex: 'total',
          align: 'center'
        },
        {
          title: '预计扩容日期',
          dataIndex: 'expandDate',
          align: 'center'
        }
      ],
      tableData: []
    }
  }
}
</script>

<style scoped lang='less'>
.repository-usage {
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
  overflow-y: auto;
}

/deep/ .useage-table::-webkit-scrollbar, .info::-webkit-scrollbar {
  height: 9px;
  width: 5px;
  background-color: #4d64bd;
}

// 滚动条颜色
/deep/ .useage-table::-webkit-scrollbar-thumb, .info::-webkit-scrollbar-thumb {
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

</style>