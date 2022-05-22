<template>
  <a-modal width='70%' :bodyStyle='{padding: "30px 50px"}' :visible='visible' @ok='handleOk' @cancel='handleCancel'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>生成月{{ title }}单</span>
    </div>
    <div class='mb-20'>
      <div class='fr '>
        <a-button v-print="'#printWrapperAndPdfContent'">打印</a-button>
        <a-button type='primary' class='ml-10' @click='downLoadPDF'>另存为PDF</a-button>
        <a-button class='ml-10' @click='downloadCSV'>另存为CSV</a-button>
      </div>

    </div>
    <div class='clearFix' style='height:20px'></div>
    <div id='printWrapperAndPdfContent' ref='printWrapperAndPdfContent'>
      <div class='title'>
        {{ detail.startTime }}{{ detail.name }}月度{{ title }}单
      </div>
      <div class='time mt-20'>
        <a-row>
          <a-col :span='12'>
            <span>{{ title }}单时间段:{{ getDateRange() }}</span>
          </a-col>
          <a-col :span='12'>
            <div class='fr'>
              <span>{{ title }}单生成日期:{{ dateFormat() }}</span>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class='cost mt-20'>
        <a-row style='width: 100%'>
          <a-col :span='24'>
            <div style='width: 100%;padding:30px 20px;background: #EDF2FC'>
              <ul>
                <li>服务费:{{ detail.serveCost }}元</li>
                <li class='grap'>|</li>
                <li>前端许可费用:{{ detail.frontendCost }}元</li>
                <li class='grap'>|</li>
                <li>后端存储写入费用:{{ detail.backendCost }}元</li>
                <li class='grap'>|</li>
                <li>合计费用: <span style='color:#EF0D0D'> {{ detail.total }}元</span></li>
              </ul>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class='cost-title mt-20'>
        <div style='color:#262626'>费用明细:</div>

      </div>
      <div class='table-box mt-20'>
        <a-table
          bordered
          :loading='loading'
          :columns='columns'
          :data-source='data'
          :pagination='false'
        ></a-table>
      </div>
    </div>
    <div class='page mt-20 mb-20'>
      <div class='fr'>
        <a-pagination
          v-model='printPage.current'
          :total='printPage.total'
          :pageSize.sync='printPage.pageSize'
          showQuickJumper
          showSizeChanger
          :showTotal='total => `共 ${total} 条`'
          :pageSizeOptions='["10", "20", "50", "100"]'
          @change='handlePrintPageChange'
          @showSizeChange='handlePrintPageSizeChange'
          show-less-items />
      </div>
    </div>
    <div style='height:20px'></div>
  </a-modal>
</template>

<script>
import { getCostMonthDetail, getCostMonthDetailList } from '@api/modules/backup/costManage/costMonth'
import { downloadFile } from '@/api/manage'

export default {
  name: 'MonthPrintModal',
  data() {
    return {
      visible: false,
      detail: {},
      title: '账',
      data: [],
      htmlTitle: '测试',
      printPage: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      loading: false,
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '日期',
          align: 'center',
          dataIndex: 'startTime'
        },
        {
          title: '服务费',
          align: 'center',
          dataIndex: 'serveCost',
          customRender: function(t, r, index) {
            return t + '元'
          }
        },
        {
          title: '前端许可费用(元)',
          align: 'center',
          dataIndex: 'frontendCost',
          customRender: function(t, r, index) {
            return t + '元'
          }
        },
        {
          title: '后端存储写入费用(元)',
          align: 'center',
          dataIndex: 'backendCost',
          customRender: function(t, r, index) {
            return t + '元'
          }
        },
        {
          title: '费用小计(元)',
          align: 'center',
          dataIndex: 'total',
          customRender: function(t, r, index) {
            return t + '元'
          }
        }
      ]
    }
  },
  methods: {
    /**
     * 获取月详单
     * @param {Object} params
     */
    async getCostMonthDetailList() {
      let params = {
        branchId: this.detail.branchId,
        startTime: this.detail.startTime,
        current: this.printPage.current,
        pageSize: this.printPage.pageSize
      }
      this.loading = true
      try {
        const res = await getCostMonthDetailList(params)
        if (res.code == 200) {
          this.data = res.result.list
          this.printPage.total = res.result.totalSize
        }
      } catch (err) {
        this.$message.error(err.message)
      } finally {
        this.loading = false

      }
    },
    /**
     * getCostMonthDetail
     */
    async getCostMonthDetail() {
      this.loading = true
      let params = {
        current: this.printPage.current,
        pageSize: this.printPage.pageSize,
        branchId: this.detail.branchId,
        startTime: this.detail.startTime
      }
      try {
        const res = await getCostMonthDetail(params)
        if (res.code = 200) {
          this.data = res.result.list
          this.printPage.total = res.result.totalSize
        } else {
          this.$message.error(res.msg)
        }
      } finally {
        this.loading = false
      }


    },
    /**
     * 下载pdf
     */
    downLoadPDF() {
      let params = {
        branchId: this.detail.branchId,
        startTime: this.detail.startTime,
        current: 1,
        pageSize: -1,
        csvType: this.title == '账' ? '1' : '2'
      }
      downloadFile('/cvCostMonth/export-pdf', this.detail.name + this.detail.startTime + '月' + this.title + '单.pdf', params)
    },
    /**
     * 下载csv
     */
    async downloadCSV() {
      let params = {
        branchId: this.detail.branchId,
        startTime: this.detail.startTime,
        current: 1,
        pageSize: -1,
        csvType: this.title == '账' ? '1' : '2'
      }
      downloadFile('/cvCostMonth/export-csv', this.detail.name + this.detail.startTime + '月' + this.title + '单.csv', params)

    },
    handleOk() {
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
    toPrint(detail = {}, type = '账') {
      this.detail = detail
      this.visible = true
      this.title = type
      this.printPage.current = 1
      this.printPage.pageSize = 10
      if (type == '账') {
        this.getCostMonthDetail()
      } else {
        this.getCostMonthDetailList()
      }
    },
    /**
     * 日期格式化
     */
    dateFormat() {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let day = new Date().getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return year + '-' + month + '-' + day
    },
    /**
     * 表格分页
     */
    handlePrintPageChange(page, size) {
      this.printPage.current = page
      this.printPage.pageSize = size
      if (this.title == '账') {
        this.getCostMonthDetail()
      } else {
        this.getCostMonthDetailList()
      }
    },
    handlePrintPageSizeChange(page, size) {
      this.printPage.current = page
      this.printPage.pageSize = size
      if (this.title == '账') {
        this.getCostMonthDetail()
      } else {
        this.getCostMonthDetailList()
      }
    },
    /**
     * 获取日期范围
     */
    getDateRange() {
      if (this.detail.startTime) {
        let dateRange = ['1', '3', '5', '7', '8', '10', '12']
        let month = this.detail.startTime.split('-')[1]
        let year = this.detail.startTime.split('-')[0] * 1

        if (month * 1 == new Date().getMonth() + 1) {
          return year + '-' + month + '-01' + '——' + year + '-' + month + '-' + new Date().getDate()
        } else {
          if (dateRange.indexOf(month) == -1) {
            return year + '-' + month + '-01' + '——' + year + '-' + month + '-30'
          } else {
            return year + '-' + month + '-01' + '——' + year + '-' + month + '-31'
          }
        }
      } else {
        return ''
      }

    }

  }
}
</script>

<style scoped lang='less'>
.title {
  font-size: 16px;
  color: #1472FF;
  font-weight: 500;
}

.time {
  color: #262626;
  font-size: 12px;
}

.cost {
  display: flex;
  align-items: center;
  width: 100%;

  ul {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin: 0;

    li {
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}

.grap {
  color: #C6CFE2;
}

.cost-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@page {
  size: auto A4 landscape;
  margin: 3mm 10mm;
}
</style>