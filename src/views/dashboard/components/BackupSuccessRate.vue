<template>
  <div>
    <div class='flex-center ' style='justify-content: space-between'>
      <div>
        <a-progress :width='110' type='circle' :percent='detail.successRatio'
                    :strokeColor='{"0%":"#0055FF", "100%":"#59ABFF"}'>
          <template #format='percent'>
            <span style='color:black;font-weight:bold'>{{ percent }}%</span>
          </template>
        </a-progress>
      </div>
      <div class='flex-center'>
        <div class='fr'>
          <div class='fl'>
            <div>完成：</div>
            <div>失败：</div>
            <div>总数：</div>
          </div>
          <div class='fr count' style='text-align:right'>
            <div>{{ detail.finishedNum }}</div>
            <div>{{ detail.failedNum }}</div>
            <div>{{ detail.totalNum }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackupSuccessRate',
  props: {
    detail: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
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