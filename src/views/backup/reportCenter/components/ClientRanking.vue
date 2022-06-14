<template>
  <div class='client-ranking'>
    <div class='trend-chart-title'>
      <div>
        客户端前端容量排名
      </div>
      <div class='info-text'></div>
      <div class='little-title'></div>
    </div>
    <div class='table-box'>
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
  name: 'ClientRanking',
  data() {
    return {
      columns: [
        {
          title: ' ',
          scopedSlots: {
            customRender: 'ranking'
          }
        },
        {
          title: '客户端名称',
          dataIndex: 'name'

        },
        {
          title: '分行名称',
          dataIndex: 'branchName'

        },
        {
          title: '前端容量',
          dataIndex: 'capacity'
        },
        {
          title: '环比上月',
          dataIndex: 'month'
        }
      ]
    }
  }
}
</script>

<style scoped lang='less'>
.client-ranking {
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
</style>