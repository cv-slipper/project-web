<template>
  <div>
    <div class='flex-center ' style=''>
      <div>
        <a-progress :width='width' type='circle' :percent='detail.successRatio'
                    :strokeColor='{"0%":"#0055FF", "100%":"#59ABFF"}'>
          <template #format='percent'>
            <span style='color:black;font-weight:bold'>{{ percent }}%</span>
          </template>
        </a-progress>
      </div>
      <div class='flex-center label ml-30'>
        <div class='fr'>
          <div class='fl'>
            <div>完成：</div>
            <div>失败：</div>
            <div>总数：</div>
          </div>
          <div class='fl ml-10 count' style='text-align:right'>
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
    return {
      width: 110
    }
  },
  mounted() {
    if (window.screen.width == 1920) {
      this.width = 160
    }
    window.addEventListener('resize', () => {
      if (window.screen.width == 1920) {
        this.width = 160
      } else {
        this.width = 110
      }
    })
  },
  methods: {}
}
</script>

<style scoped>
.label {
  color: #333333;
  font-size: 18px;
}

.count {
  color: #666666;

}

@media (max-width: 1440px) {
  .label {
    font-size: 14px;
  }
}

</style>