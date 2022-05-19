<template>
  <div>
    <div class='searchParams mb-20' style='background: white;'>
      <a-row>
        <a-col :span='24'>
          <div class='flex-center fl'>
            <div class='label fl'>分行:</div>
            <branch-search
              type='default'
              style='width:240px'
              class='fl ml-10'
              v-model='searchParms.branchId'></branch-search>
          </div>
          <div class='flex-center fl ml-20'>
            <div class='label fl mr-10'>日期:</div>
            <a-date-picker class='fl ml-10' v-model='searchParms.startTime' value-format='YYYY-MM-DD' />
          </div>
          <a-button type='primary' class='ml-40' @click='search'>查询</a-button>
        </a-col>

      </a-row>
    </div>
    <div :style='{background: "white",padding:titleVisible || dailyBillVisible ?"20px":"0"}'>
      <div>
        <div v-if='titleVisible' class='my-title mb-40' style='font-weight: bold;font-size: 16px'>
          当前费用合计: <span class='red'>{{ totalCost }} 元</span>
        </div>
        <daily-bill-detail @total='getTotal' v-show='dailyBillVisible' ref='dailyBillDetail'></daily-bill-detail>
      </div>
    </div>
  </div>
</template>

<script>

import BranchSearch from '@comp/searchParms/BranchSearch'
import DailyBillDetail from '@views/backup/costmanage/components/DailyBillDetail'

export default {
  name: 'CostList',
  components: { BranchSearch, DailyBillDetail },
  data() {
    return {
      searchParms: {
        startTime: '',
        branchId: []
      },
      totalCost: 150,
      dailyBillVisible: false,
      titleVisible: false
    }
  },
  created() {

  },
  methods: {
    /**
     * 查询
     */
    search() {
      if (this.searchParms.branchId.length == 0) {
        this.$message.warning('请选择分行')
        return
      } else if (this.searchParms.startTime == '') {
        this.$message.warning('请选择日期')
        return
      } else {
        this.dailyBillVisible = true
        this.$refs.dailyBillDetail.init(this.searchParms)
      }
    },
    /**
     * 获取总费用
     */
    getTotal(total) {
      this.titleVisible = true
      this.totalCost = total
    }
  }
}
</script>

<style scoped>
@import '~@assets/less/common.less';

.red {
  color: #EF0D0D
}
</style>