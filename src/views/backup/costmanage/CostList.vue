<template>
  <div>
    <div class='searchParmas mb-20' style='background: white;'>
      <a-row>
        <a-col :span='24'>
          <div class='flex-center fl'>
            <div class='label fl'>分行:</div>
            <branch-search model='default' style='width:240px' class='fl ml-10' v-model='branchIds'></branch-search>
          </div>
          <div class='flex-center fl ml-20'>
            <div class='label fl mr-10'>日期:</div>
            <a-date-picker class='fl ml-10' v-model='searchParms.startTime' value-format='YYYY-MM-DD' />
          </div>
          <a-button type='primary' class='ml-40' @click='search'>查询</a-button>
        </a-col>

      </a-row>
    </div>
    <a-card :bordered='false'>
      <div>
        <div class='my-title mb-40' style='font-weight: bold;font-size: 16px'>
          当前费用合计: <span class='red'>{{ totalCost }} 元</span>
        </div>
        <daily-bill-detail></daily-bill-detail>
      </div>
    </a-card>
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
        startTime: ''

      },
      totalCost: 150,
      branchIds: []
    }
  },
  created() {

  },
  methods: {
    /**
     * 查询
     */
    search() {
      this.$message.success('查询成功')
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