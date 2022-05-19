<template>
  <a-modal width='60%' :bodyStyle='{padding: "30px 50px"}' :visible='visible' @ok='handleOk' @cancel='handleCancel'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>生成月{{ title }}单</span>
    </div>
    <div id='printWrapper'>
      <div class='title'>
        2022-05 北京银行北京分行月度账单
      </div>
      <div class='time mt-20'>
        <a-row>
          <a-col :span='12'>
            <span>{{ title }}单时间段:</span>
          </a-col>
          <a-col :span='12'>
            <div class='fr'>
              <span>{{ title }}单生成日期:</span>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class='cost mt-20'>
        <a-row style='width: 100%'>
          <a-col :span='24'>
            <div style='width: 100%;padding:30px 20px;background: #EDF2FC'>
              <ul>
                <li>服务费:1000元</li>
                <li class='grap'>|</li>
                <li>前端许可费用:1000元</li>
                <li class='grap'>|</li>
                <li>后端存储写入费用:1000元</li>
                <li class='grap'>|</li>
                <li>合计费用:1000元</li>
              </ul>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class='cost-title mt-20'>
        <div style='color:#262626'>费用明细:</div>
        <div>
          <a-button v-print="'#printWrapper'">打印</a-button>
          <a-button type='primary' class='ml-10'>另存为PDF</a-button>
          <a-button class='ml-10'>另存为CSV</a-button>
        </div>
      </div>
      <div class='table-box mt-20'>
        <a-table bordered :columns='columns' :data='data'></a-table>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'MonthPrintModal',
  data() {
    return {
      visible: false,
      title: '账',
      data: [],
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
          dataIndex: 'serveCost'
        },
        {
          title: '前端许可费用(元)',
          align: 'center',
          dataIndex: 'frontendCost'
        },
        {
          title: '后端存储写入费用(元)',
          align: 'center',
          dataIndex: 'backendCost'
        },
        {
          title: '费用小计(元)',
          align: 'center',
          dataIndex: 'cost'
        }
      ]
    }
  },
  methods: {
    handleOk() {
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
    toPrint() {
      this.visible = true
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
  margin: 3mm;
  padding: 3mm;
}
</style>