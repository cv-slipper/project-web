<template>
  <div class='app-ranking'>
    <div class='trend-chart-title'>
      <div>
        应用系统前端容量排名
      </div>
      <div class='info-text'></div>
      <div class='little-title'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppRanking',
  data() {
    return {}
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
</style>