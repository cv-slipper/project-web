<template>
  <a-modal width='70%' :visible='visible' @ok='handleOk' @cancel='handleCancel'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>日详单详情</span>
    </div>
    <a-row>
      <a-col :span='11'>
        <div class='fl'>
          <div class='fl'>分行:</div>
          <div class='fl ml-10 span'>{{ branchName }}</div>
        </div>
        <div class='fl ml-30'>
          <div class='fl'>日期:</div>
          <div class='fl ml-10 span'>{{ startTime }}</div>
        </div>
      </a-col>
      <a-col :span='11'>
        <div class='fr'>
          当前费用合计: <span class='total'>{{ total }}元</span>
        </div>
      </a-col>
    </a-row>
    <daily-bill-detail :span-num='11' class='mt-40' @total='getTotal' ref='dailyBillDetail'></daily-bill-detail>
  </a-modal>
</template>

<script>
import DailyBillDetail from '@views/backup/costmanage/components/DailyBillDetail'

export default {
  name: 'DailyBillDetaModal',
  components: {
    DailyBillDetail
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    branchId: {
      type: String,
      default: ''
    },
    branchName: {
      type: String,
      default: ''
    },
    startTime: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.openDailyInfo()
          })
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      total: 0
    }
  },
  methods: {
    getTotal(total) {
      this.total = total
    },
    openDailyInfo() {
      console.log(this.branchId, 'this.$refs')
      this.$refs.dailyBillDetail.init({ branchId: [{ id: this.branchId }], startTime: this.startTime })
    },
    handleOk() {
      this.$emit('ok')
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.span {
  color: #999999
}

.total {
  color: #EF0D0D
}
</style>