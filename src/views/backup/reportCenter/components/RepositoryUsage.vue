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
          dataIndex: 'name'
        },
        {
          title: '使用量',
          dataIndex: 'num'
        },
        {
          title: '环比上月',
          dataIndex: 'month'
        },
        {
          title: '总容量',
          dataIndex: 'total'
        },
        {
          title: '预计扩容日期',
          dataIndex: 'expandDate'
        }
      ],
      tableData: []
    }
  }
}
</script>

<style scoped lang='less'>
.repository-usage {
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

/deep/ .useage-table .ant-table-tbody > tr:nth-child(2n) {
  background: rgba(10, 51, 126, 0.09) !important;
}
</style>