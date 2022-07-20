<template>
  <div>
    <a-modal :visible='visible' width='50%' :footer='false' @cancel='cancel'>
      <div slot='title' style='display: flex;align-items: center'>
        <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
        <span class='ml-10'>{{ title }}</span>
      </div>
      <div style='font-size: 14px'>未处理异常客户端：</div>
      <div class='table-box mt-10'>
        <a-table
          :columns='columns'
          :data-source='data'
          :pagination='false'
          :scroll='{y:400}'
        >
          <template #action='row'>
            <a-button type='link' @click='goToInfo(row)'> 详情</a-button>
          </template>
        </a-table>
      </div>
    </a-modal>
    <error-message-modal :visible='errorVisible' :room-id='id' :data-name='dataName'
                         @cancel='errorVisible=false'></error-message-modal>
  </div>
</template>

<script>
import errorMessageModal from '@views/dashboard/components/modal/ErrorMessageModal'

export default {
  name: 'RoomExecption',
  components: {
    errorMessageModal
  },
  data() {
    return {
      visible: false,
      errorVisible: false,
      title: '',
      columns: [
        {
          title: '名称',
          width: 100,
          align: 'center',
          dataIndex: 'clientName'
        },
        {
          title: '应用系统',
          width: 100,
          align: 'center',
          dataIndex: 'appSystemName'
        },
        {
          title: '主机名',
          width: 100,
          align: 'center',
          dataIndex: 'hostName'
        },
        {
          title: 'IP',
          width: 100,
          align: 'center',
          dataIndex: 'ip'
        },
        {
          title: '未处理异常信息数量',
          width: 100,
          align: 'center',
          dataIndex: 'exceptionNum'
        },
        {
          title: '操作',
          width: 100,
          align: 'center',
          scopedSlots: {
            customRender: 'action'
          }
        }

      ],
      data: [],
      dataName: '',
      id: ''
    }
  },
  methods: {
    open(dataName, title, id, data = []) {
      this.title = title
      this.visible = true
      this.data = data
      this.dataName = dataName
      this.id = id
    },
    cancel() {
      this.visible = false
    },
    goToInfo(row) {
      this.errorVisible = true
    }
  }
}
</script>

<style scoped lang='less'>
/deep/ .table-box table thead th {
  background: #EDF3FE !important;
  font-size: 14px !important;
  color: #3E3E3E !important;
}
</style>