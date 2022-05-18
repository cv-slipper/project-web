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
          <div class='table-left'>前端许可费</div>
          <a-table
            :columns='firstColumns'
            :data-source='firstDataSource'
            :loading='firstLoading'
            :bordered='true'
            :pagination='false'
          >

          </a-table>
        </div>
      </a-col>
      <a-col :span='spanNum' class='ml-20'>
        <a-table
          :columns='firstInfoColumns'
          :data-source='firstInfoDataSource'
          :loading='firstInfoLoading'
          :bordered='true'
          :pagination='true'
        >

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
          :loading='secondInfoLoading'
          :bordered='true'
          :pagination='true'
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
          >

          </a-table>
        </div>
      </a-col>
      <a-col :span='spanNum' class='ml-20'>
        <a-table
          :columns='thirdInfoColumns'
          :data-source='thirdInfoDataSource'
          :loading='thirdInfoLoading'
          :bordered='true'
          :pagination='true'
        >

        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'DailyBillDetail',
  data() {
    return {
      spanNum: 10,
      firstColumns: [
        {
          title: '客户端数量(台)',
          key: 'clientNum',
          dataIndex: 'clientNum',
          align: 'center'

        },
        {
          title: '单价(元）',
          key: 'price',
          dataIndex: 'price',
          align: 'center'

        },
        {
          title: '合计(元）',
          key: 'total',
          dataIndex: 'total',
          align: 'center'
        }
      ],
      firstInfoColumns: [
        {
          title: '客户端',
          key: 'type',
          dataIndex: 'type',
          align: 'center'
        },
        {
          title: '安装日期',
          key: 'detail',
          dataIndex: 'detail',
          align: 'center'
        }
      ],
      firstDataSource: [{
        clientNum: '1台',
        price: '1',
        total: '1'
      }],
      firstInfoDataSource: [{}, {}, {}],
      firstLoading: false,
      firstInfoLoading: false,


      secondColumns: [
        {
          title: '许可用量(GB)',
          key: 'clientNum',
          dataIndex: 'clientNum',
          align: 'center'

        },
        {
          title: '单价(元）',
          key: 'price',
          dataIndex: 'price',
          align: 'center'

        },
        {
          title: '合计(元）',
          key: 'total',
          dataIndex: 'total',
          align: 'center'
        }
      ],
      secondInfoColumns: [
        {
          title: '客户端',
          key: 'type',
          dataIndex: 'type',
          align: 'center'
        },
        {
          title: '前端许可用量（GB)',
          key: 'detail',
          dataIndex: 'detail',
          align: 'center'
        }
      ],
      secondDataSource: [{
        clientNum: '1台',
        price: '1',
        total: '1'
      }],
      secondInfoDataSource: [{}, {}, {}],
      secondLoading: false,
      secondInfoLoading: false,


      thirdColumns: [
        {
          title: '存储库',
          key: 'clientNum',
          dataIndex: 'clientNum',
          align: 'center'
        },
        {
          title: '储存写入量(GB)',
          key: 'clientNum',
          dataIndex: 'clientNum',
          align: 'center'
        },
        {
          title: '单价(元）',
          key: 'price',
          dataIndex: 'price',
          align: 'center'

        },
        {
          title: '合计(元）',
          key: 'total',
          dataIndex: 'total',
          align: 'center'
        }
      ],
      thirdInfoColumns: [
        {
          title: '客户端',
          key: 'type',
          dataIndex: 'type',
          align: 'center'
        },
        {
          title: '作业ID',
          key: 'detail',
          dataIndex: 'detail',
          align: 'center'
        },
        {
          title: '写入存储库',
          key: 'detail',
          dataIndex: 'detail',
          align: 'center'
        },
        {
          title: '写入量(GB)',
          key: 'detail',
          dataIndex: 'detail',
          align: 'center'
        }

      ],
      thirdDataSource: [{
        clientNum: '1台',
        price: '1',
        total: '1'
      },
        {}
      ],
      thirdInfoDataSource: [{}, {}, {}],
      thirdLoading: false,
      thirdInfoLoading: false

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
</style>