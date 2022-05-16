<template>
  <j-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel">

    <div class="erp_print">
      <img alt="print" v-print="'#printContent'" style="width: 20px; height: 20px" src="@/assets/print.png">
    </div>
    <section ref="print" id="printContent" style="background:#ECECEC;" v-if="total!=null">
      <a-row style="page-break-after:always;">
        <a-card :bordered="true">
          <span style="right: 50px">打印时间：{{ getTime() }}</span>
          <h1 class="erp_title2">{{ `${total.startTime}${detail[0].companyName}` }}月度账单</h1>

          <a-row>
            <a-col :span="6">
              <span style="margin-left: 50px">服务费：{{ total.serveCost }}</span>
            </a-col>
            <a-col :span="6">
              <span style="margin-left: 50px">前端费用：{{ total.frontendCost }}</span>
            </a-col>
            <a-col :span="6">
              <span style="margin-left: 50px">后端费用：{{ total.backendCost }}</span>
            </a-col>
            <a-col :span="6">
              <span style="margin-left: 50px">合计费用：{{ total.cost }}</span>
            </a-col>
          </a-row>

          <!-- 费用明细 -->
          <a-tabs tabPosition="top">
            <a-tab-pane tab="费用明细" key="detail" forceRender>
              <a-table
                size="small"
                bordered
                :rowKey="(record,index)=> index"
                :columns="detailColumns"
                :dataSource="detail"
                :pagination="false"
                class="border_erp"
              >
              </a-table>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-row>
    </section>

  </j-modal>
</template>

<script>

  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import { getAction, getFileAccessHttpUrl } from '@/api/manage'
  import { dateFormat, keepTwoDecimal } from '@/utils/util'

  export default {
    name: 'WmsDeliveryPlanPrintModal',
    mixins: [JEditableTableMixin],
    data() {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        labelCol2: {
          xs: { span: 24 },
          sm: { span: 3 }
        },
        wrapperCol2: {
          xs: { span: 24 },
          sm: { span: 20 }
        },
        title:'',
        total: null,
        detail: {},
        saleDetail: [],
        detailColumns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          // {
          //   title: '公司名',
          //   align: 'center',
          //   dataIndex: 'companyName'
          // },
          {
            title: '服务费',
            align: 'center',
            dataIndex: 'serveCost'
          },
          {
            title: '前端费用',
            align: 'center',
            dataIndex: 'frontendCost',
          },
          {
            title: '后端费用',
            align: 'center',
            dataIndex: 'backendCost'
          },
          {
            title: '费用小计',
            align: 'center',
            dataIndex: 'cost',
            // scopedSlots: { customRender: 'loss' }
          },
          {
            title: '费用日期',
            align: 'center',
            dataIndex: 'startTime',
          },
        ],
        totalRealQty:0,
        url: {
          saleDetail: '/saleorder/queryJpaiSaleOrderDetailByMainId'
        }
      }
    },
    methods: {
      toPrint(total,detail) {

        this.title = '打印'
        this.total = total
        this.detail = JSON.parse(JSON.stringify(detail))
        let totalObj = {
          companyName:"合计",
          serveCost:total.serveCost,
          frontendCost:total.frontendCost,
          backendCost:total.backendCost,
          cost:total.cost
        }
        this.detail.push(totalObj)
        this.visible = this.total != null
      },
      handleOk() {
        this.handleCancel()
      },
      handleCancel() {
        this.visible = false
      },
      getTime() {
        let dateNow = new Date()
        let pDate = dateFormat(dateNow, 'YYYY-mm-dd HH:MM:SS')
        return pDate
      },
      /* 图片预览 */
      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return getFileAccessHttpUrl(text)
      },

    }
  }
</script>

<style scoped>
  .erp_print {
    position: absolute;
    right: 130px;
    top: 18px;
  }

  .erp_logo2 {
    position: absolute;
    left: 30px;
    top: 30px;
  }

  .erp_title2 {
    font-size: 36px;
    text-align: center;
  }

  .erp_sign2 {
    /*position:relative;*/
    float: left;
    font-size: 20px;
    text-align: center;
    width: 40%;
    margin: auto;
  }
</style>