<template>
  <div>
    <div class='flex-center ' style='justify-content: space-between'>
      <div>
        <a-progress :width='110' type='circle' :percent='75' />
      </div>
      <div class='flex-center'>
        <div class='fr'>
          <div class='fl'>
            <div>完成：</div>
            <div>失败：</div>
            <div>总数：</div>
          </div>
          <div class='fr count' style='text-align:right'>
            <div>75%</div>
            <div>25%</div>
            <div>100%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackupSuccessRate',
  data() {
    return {}
  },
  mounted() {

  },
  methods: {}
}
</script>

<style scoped>
.count {
  color: #666666;

}
</style>