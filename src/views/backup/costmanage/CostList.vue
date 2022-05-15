<template>
  <a-card :bordered="false">

    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="分行">
                <a-input placeholder="请输入分行" v-model="queryParam.companyName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="日期">
<!--                <a-range-picker :placeholder="['开始日期','结束日期']" v-model="startTime"/>-->
                <j-date placeholder="请选择日期" v-model="queryParam.startTime"></j-date>
              </a-form-item>
            </a-col>

          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
              <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
              <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
              <!--              </a>-->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->
    <!-- table区域-begin -->
    <div>
      <a-row>
        <a-col :span="14">
          <a-card title="服务费">
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              :columns="columns1"
              :dataSource="dataSource1"
              :pagination="ipagination1"
              :loading="loading1"
              class="j-table-force-nowrap"
              @change="handleTableChange1">

            </a-table>
          </a-card>
        </a-col>
        <a-col :span="10">
          <a-card title="客户端清单">
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              :columns="columns2"
              :dataSource="dataSource2"
              :pagination="ipagination2"
              :loading="loading2"
              class="j-table-force-nowrap"
              @change="handleTableChange2">

            </a-table>
          </a-card>
        </a-col>
      </a-row>

      <a-divider/>

      <a-row>
        <a-col :span="14">
          <a-card title="前端许可费用">
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              :columns="columns3"
              :dataSource="dataSource3"
              :pagination="ipagination3"
              :loading="loading3"
              class="j-table-force-nowrap"
              @change="handleTableChange3">

            </a-table>
          </a-card>
        </a-col>
        <a-col :span="10">
          <a-card title="前端许可用量清单">
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              :columns="columns4"
              :dataSource="dataSource4"
              :pagination="ipagination4"
              :loading="loading4"
              class="j-table-force-nowrap"
              @change="handleTableChange4">

            </a-table>
          </a-card>
        </a-col>
      </a-row>

      <a-divider/>

      <a-row>
        <a-col :span="14">
          <a-card title="后端存储费用">
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              :columns="columns5"
              :dataSource="dataSource5"
              :pagination="ipagination5"
              :loading="loading5"
              class="j-table-force-nowrap"
              @change="handleTableChange5">

            </a-table>
          </a-card>
        </a-col>
        <a-col :span="10">
          <a-card title="后端存储用量清单">
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              :columns="columns6"
              :dataSource="dataSource6"
              :pagination="ipagination6"
              :loading="loading6"
              class="j-table-force-nowrap"
              @change="handleTableChange6">
            </a-table>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script>
  import CostPieChart from './CostPieChart'
  import CostHistogram from './CostHistogram'
  import { getAction } from '@/api/manage'
  import JDate from '@/components/jeecg/JDate'
  import { columns1, columns2, columns3, columns4, columns5, columns6 } from './CostList'
  import dayjs from 'dayjs'

  export default {
    name: 'CostList',
    mixins: [],
    components: { JDate, CostPieChart, CostHistogram },
    data() {
      return {
        toggleSearchStatus: true,
        // 分页参数
        queryParam: this.$route.query?this.$route.query:{},
        startTime: null,
        loading1: false,
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false,
        loading6: false,
        ipagination1: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          }
        },
        ipagination2: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          }
        },
        ipagination3: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          }
        },
        ipagination4: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          }
        },
        ipagination5: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          }
        },
        ipagination6: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          }
        },
        columns1: columns1,
        columns2: columns2,
        columns3: columns3,
        columns4: columns4,
        columns5: columns5,
        columns6: columns6,
        dataSource1: [],
        dataSource2: [],
        dataSource3: [],
        dataSource4: [],
        dataSource5: [],
        dataSource6: [],

        url: {
          getDailyCost: '/cvDailyCost/dataList?column=startTime&order=desc',
          getDailyCostDetail: '/cvDailyCostDetail/list?column=startTime&order=desc'
        }
      }
    },
    created() {
      this.loadData1()
      this.loadData2()
      this.loadData3()
      this.loadData4()
      this.loadData5()
      this.loadData6()
    },
    methods: {
      getParams(){
        let params = Object.assign({}, this.queryParam)
        // 非范围查询
        if (!this.queryParam.startTime) {
          params.startTime = dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD')
        }
        // 范围查询
        // if (!this.startTime) {
        //   params.startTime = dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD')
        // }else {
        //   params.startTime_begin = dayjs(this.startTime[0]._d).format('YYYY-MM-DD')
        //   params.startTime_end = dayjs(this.startTime[1]._d).format('YYYY-MM-DD')
        // }
        return params
      },
      // 服务费
      loadData1(arg) {
        this.loading1 = true
        if (arg === 1) {
          this.ipagination1.current = 1
        }
        let params = this.getParams()
        params.type = '服务费'
        params.pageNo = this.ipagination1.current
        params.pageSize = this.ipagination1.pageSize
        getAction(this.url.getDailyCost, params).then((res) => {
          if (res.success) {
            let result = res.result
            this.ipagination1.total = result.total
            this.dataSource1 = result.records
          }
        }).finally(()=>{
          this.loading1 = false
        })
      },
      // 前端
      loadData3(arg) {
        this.loading3 = true
        if (arg === 1) {
          this.ipagination3.current = 1
        }
        let params = this.getParams()
        params.type = '前端'
        params.pageNo = this.ipagination3.current
        params.pageSize = this.ipagination3.pageSize
        getAction(this.url.getDailyCost, params).then((res) => {
          if (res.success) {
            this.ipagination3.total = res.result.total
            this.dataSource3 = res.result.records
          }
        }).finally(()=>{
          this.loading3 = false
        })
      },
      // 后端
      loadData5(arg) {
        this.loading5 = true
        if (arg === 1) {
          this.ipagination5.current = 1
        }
        let params = this.getParams()
        params.type = '后端'
        params.pageNo = this.ipagination5.current
        params.pageSize = this.ipagination5.pageSize
        getAction(this.url.getDailyCost, params).then((res) => {
          if (res.success) {
            this.ipagination5.total = res.result.total
            this.dataSource5 = res.result.records
          }
        }).finally(()=>{
          this.loading5 = false
        })
      },
      // 服务费明细
      loadData2(arg) {
        this.loading2 = true
        if (arg === 1) {
          this.ipagination2.current = 1
        }
        let params = this.getParams()
        params.type = '服务费'
        params.pageNo = this.ipagination2.current
        params.pageSize = this.ipagination2.pageSize
        getAction(this.url.getDailyCostDetail, params).then((res) => {
          if (res.success) {
            this.ipagination2.total = res.result.total
            this.dataSource2 = res.result.records
          }
        }).finally(()=>{
          this.loading2 = false
        })
      },
      // 前端明细
      loadData4(arg) {
        this.loading4 = true
        if (arg === 1) {
          this.ipagination4.current = 1
        }
        let params = this.getParams()
        params.type = '前端'
        params.pageNo = this.ipagination4.current
        params.pageSize = this.ipagination4.pageSize
        getAction(this.url.getDailyCostDetail, params).then((res) => {
          if (res.success) {
            this.ipagination4.total = res.result.total
            this.dataSource4 = res.result.records
          }
        }).finally(()=>{
          this.loading4 = false
        })
      },
      // 后端明细
      loadData6(arg) {
        this.loading6 = true
        if (arg === 1) {
          this.ipagination6.current = 1
        }
        let params = this.getParams()
        params.type = '后端'
        params.pageNo = this.ipagination6.current
        params.pageSize = this.ipagination6.pageSize
        getAction(this.url.getDailyCostDetail, params).then((res) => {
          if (res.success) {
            this.ipagination6.total = res.result.total
            this.dataSource6 = res.result.records
          }
        }).finally(()=>{
          this.loading6 = false
        })
      },
      searchQuery() {
        this.loadData1()
        this.loadData2()
        this.loadData3()
        this.loadData4()
        this.loadData5()
        this.loadData6()
      },
      searchReset() {
        this.queryParam = {}
        this.loadData1()
        this.loadData2()
        this.loadData3()
        this.loadData4()
        this.loadData5()
        this.loadData6()
      },
      handleTableChange1(pagination, filters, sorter) {
        this.ipagination1 = pagination
        this.loadData1()
      },
      handleTableChange2(pagination, filters, sorter) {
        this.ipagination2 = pagination
        this.loadData2()
      },
      handleTableChange3(pagination, filters, sorter) {
        this.ipagination3 = pagination
        this.loadData3()
      },
      handleTableChange4(pagination, filters, sorter) {
        this.ipagination4 = pagination
        this.loadData4()
      },
      handleTableChange5(pagination, filters, sorter) {
        this.ipagination5 = pagination
        this.loadData5()
      },
      handleTableChange6(pagination, filters, sorter) {
        this.ipagination6 = pagination
        this.loadData6()
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less';
</style>