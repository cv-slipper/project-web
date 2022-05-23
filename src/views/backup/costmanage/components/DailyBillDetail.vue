<template>
  <div>
    <a-row>
      <a-col :span='spanNum'>
        <div class='my-title'>费用类型</div>
      </a-col>
      <a-col :span='spanNum' class='ml-20'>
        <div class='my-title'>明细</div>
      </a-col>
    </a-row>
    <a-row class='mt-20'>
      <a-col :span='spanNum'>
        <div style='position: relative;padding-left:50px'>
          <div class='table-left'>服务费</div>
          <a-table
            :columns='firstColumns'
            :data-source='firstDataSource'
            :loading='firstLoading'
            :bordered='true'
            :pagination='false'
          >
            <template #num='scope'>
              {{ scope.number }}台
            </template>
            <template #price='scope'>
              {{ scope.price }}元
            </template>
            <template #total='scope'>
              {{ scope.total }}元
            </template>
          </a-table>
        </div>
      </a-col>
      <a-col :span='spanNum' class='ml-20'>
        <a-table
          :columns='firstInfoColumns'
          :data-source='firstInfoDataSource'
          :loading='firstLoading'
          :bordered='true'
          :pagination='firstPage'
          @change='firstChange'
        >
          <template #installTime='scope'>
            {{ scope.installTime.substring(0, 10) }}
          </template>
        </a-table>
      </a-col>
    </a-row>
    <!------------------>

    <a-row class='mt-20'>
      <a-col :span='spanNum'>
        <div style='position: relative;padding-left:50px'>
          <div class='table-left'>前端许可费</div>
          <a-table
            :columns='secondColumns'
            :data-source='secondDataSource'
            :loading='secondLoading'
            :bordered='true'
            :pagination='false'
          >

          </a-table>
        </div>
      </a-col>
      <a-col :span='spanNum' class='ml-20'>
        <a-table
          :columns='secondInfoColumns'
          :data-source='secondInfoDataSource'
          :loading='secondLoading'
          :bordered='true'
          :pagination='secondPage'
          @change='secondChange'
        >

        </a-table>
      </a-col>
    </a-row>

    <!--------------------------------->
    <a-row class='mt-20'>
      <a-col :span='spanNum'>
        <div style='position: relative;padding-left:50px'>
          <div class='table-left'>后端存储写入费</div>
          <a-table
            :columns='thirdColumns'
            :data-source='thirdDataSource'
            :loading='thirdLoading'
            :bordered='true'
            :pagination='false'
            class='backTable'
          >

          </a-table>
        </div>
      </a-col>
      <a-col :span='spanNum' class='ml-20'>
        <a-table
          :columns='thirdInfoColumns'
          :data-source='thirdInfoDataSource'
          :loading='thirdLoading'
          :bordered='true'
          :pagination='thirdPage'
          @change='thirdChange'
        >

        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getBackFee, getFrontFee, getServiceFee } from '@api/modules/backup/costManage/costDay'

export default {
  name: 'DailyBillDetail',
  props: {
    spanNum: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      firstColumns: [
        {
          title: '客户端数量(台)',
          key: 'num',
          align: 'center',
          dataIndex: 'number',
          customRender: (t, record, index) => {
            return t == null ? '' : t
          }

        },
        {
          title: '单价(元）',
          key: 'price',
          align: 'center',
          dataIndex: 'price',
          customRender: (t) => {
            return t == null ? '' : t
          }

        },
        {
          title: '合计(元）',
          key: 'total',
          align: 'center',
          dataIndex: 'total',
          customRender: (t) => {
            return t == null ? '' : t
          }
        }
      ],
      firstInfoColumns: [
        {
          title: '客户端',
          key: 'clientName',
          dataIndex: 'clientName',
          align: 'center'
        },
        {
          title: '安装日期',
          key: 'installTime',
          align: 'center',
          scopedSlots: {
            customRender: 'installTime'
          }
        }
      ],
      firstDataSource: [],
      firstInfoDataSource: [],
      firstLoading: false,
      firstInfoLoading: false,
      firstPage: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },


      secondColumns: [
        {
          title: '许可用量(GB)',
          key: 'volume',
          align: 'center',
          dataIndex: 'volume',
          customRender: (t, row, index) => {
            return t == null ? '' : t
          }

        },
        {
          title: '单价(元）',
          key: 'price',
          dataIndex: 'price',
          align: 'center',
          customRender: (t, row, index) => {
            return t == null ? '' : t
          }

        },
        {
          title: '合计(元）',
          key: 'total',
          dataIndex: 'total',
          align: 'center',
          customRender: (t, row, index) => {
            return t == null ? '' : t
          }
        }
      ],
      secondInfoColumns: [
        {
          title: '客户端',
          key: 'clientName',
          dataIndex: 'clientName',
          align: 'center'
        },
        {
          title: '前端许可用量（GB)',
          key: 'foreLicenseVol',
          dataIndex: 'foreLicenseVol',
          align: 'center',
          customRender: (t, row, index) => {
            return t == null ? '' : t
          }
        }
      ],
      secondDataSource: [],
      secondInfoDataSource: [],
      secondLoading: false,
      secondInfoLoading: false,
      secondPage: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },

      thirdColumns: [
        {
          title: '存储库',
          key: 'libraryName',
          dataIndex: 'libraryName',
          align: 'center'
        },
        {
          title: '存储写入量(GB)',
          key: 'writtenVolume',
          dataIndex: 'writtenVolume',
          align: 'center',
          customRender: (t, row, index) => {
            return t == null ? '' : t
          }
        },
        {
          title: '单价(元）',
          key: 'price',
          dataIndex: 'price',
          align: 'center',
          customRender: (t, row, index) => {
            return t == null ? '' : t
          }

        },
        {
          title: '合计(元）',
          key: 'total',
          dataIndex: 'total',
          align: 'center',
          customRender: (t, row, index) => {
            return t == null ? '' : t
          }
        }
      ],
      thirdInfoColumns: [
        {
          title: '客户端',
          key: 'clientName',
          dataIndex: 'clientName',
          align: 'center'
        },
        {
          title: '作业ID',
          key: 'jobId',
          dataIndex: 'jobId',
          align: 'center'
        },
        {
          title: '写入存储库',
          key: 'library',
          dataIndex: 'library',
          align: 'center'
        },
        {
          title: '写入量(GB)',
          key: 'writtenVolume',
          dataIndex: 'writtenVolume',
          align: 'center',
          customRender: (t, row, index) => {
            return t == null ? '' : t
          }
        }

      ],
      thirdDataSource: [],
      thirdInfoDataSource: [],
      thirdLoading: false,
      thirdInfoLoading: false,
      thirdPage: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      startTime: '',
      branchId: ''

    }
  },
  created() {
  },
  methods: {
    /**
     * 获取后端数据
     * @param {object} params
     */
    async getBackFee() {
      let params = {
        startTime: this.startTime,
        branchId: this.branchId,
        current: this.thirdPage.current,
        pageSize: this.thirdPage.pageSize
      }
      try {
        this.thirdLoading = true
        const res = await getBackFee(params)
        if (res.code === 200) {
          this.thirdDataSource = [res.result.summary]
          this.thirdInfoDataSource = res.result.clientList.list || []
          this.thirdPage.total = res.result.clientList.totalSize || 0

        } else {
          this.$message.error(res.message)
        }

      } finally {
        this.thirdLoading = false
      }


    },

    /**
     * 获取前端费用
     * @param {Object} params
     */
    async getFrontendFee() {
      let params = {
        current: this.secondPage.current,
        pageSize: this.secondPage.pageSize,
        startTime: this.startTime,
        branchId: this.branchId
      }
      try {
        this.secondLoading = true
        let res = await getFrontFee(params)
        if (res.code == 200) {
          this.secondDataSource = [res.result.summary]
          this.secondInfoDataSource = res.result.clientList.list || []
          this.secondPage.total = res.result.clientList.totalSize
        } else {
          this.$message.error(res.message)

        }
      } finally {
        this.secondLoading = false
      }

    },
    /**
     * 获取服务费
     * @param {Object} params
     */
    async getServiceFee() {
      let params = {
        current: this.firstPage.current,
        pageSize: this.firstPage.pageSize,
        startTime: this.startTime,
        branchId: this.branchId
      }
      try {
        this.firstLoading = true
        const res = await getServiceFee(params)
        if (res.code == 200) {
          this.firstDataSource = [res.result.summary] || []
          this.firstInfoDataSource = res.result.clientList.list || []
          this.firstPage.total = res.result.clientList.totalSize
        } else {
          this.$message.error(res.message)
        }
      } finally {
        this.firstLoading = false
      }
    },
    /**
     * 分页
     * @param {Object} page
     */
    firstChange(page) {
      this.firstPage.current = page.current
      this.firstPage.pageSize = page.pageSize
      this.getServiceFee()
    },
    secondChange(page) {
      this.secondPage.current = page.current
      this.secondPage.pageSize = page.pageSize
      this.getFrontendFee()
    },
    thirdChange(page) {
      this.thirdPage.current = page.current
      this.thirdPage.pageSize = page.pageSize
      this.getBackFee()
    },
    init({ branchId, startTime }) {
      this.branchId = branchId.map(item => item.id).join(',')
      this.startTime = startTime
      this.thirdPage.current = 1
      this.thirdPage.pageSize = 10
      this.secondPage.current = 1
      this.secondPage.pageSize = 10
      this.firstPage.current = 1
      this.firstPage.pageSize = 10
      Promise.all([this.getServiceFee(), this.getFrontendFee(), this.getBackFee()]).then(() => {
        let total = (this.firstDataSource[0].total || 0) + (this.secondDataSource[0].total || 0) + (this.thirdDataSource[0].total || 0)
        this.$emit('total', total.toFixed(2))
      })
    }
  }
}
</script>

<style scoped>
/deep/ .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
  padding: 15px 11px !important;
}

/deep/ .ant-table-thead > tr > th {
  font-weight: 400 !important;
  color: #020202 !important;
}

/deep/ .ant-table-tbody > tr > td {
  font-weight: 400 !important;
  color: #3E3E3E !important;
}

.table-left {
  width: 50px;
  padding: 10px 18px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 12px;
  color: #020202;
  font-weight: 500;
  background: #F4F6F8;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #e8e8e8;
  border-right: none;
}

/deep/ .backTable table tbody td {
  padding: 30px 20px !important;
}
</style>