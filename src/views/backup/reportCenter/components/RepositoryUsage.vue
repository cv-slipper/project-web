<template>
  <div class='repository-usage'>
    <div class='trend-chart-title'>
      <div>
        存储库使用量信息
      </div>
      <div class='info-text'></div>
      <div class='little-title'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepositoryUsageTable'
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
</style>