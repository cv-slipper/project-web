<template>
  <a-modal :visible='visible' :footer='false' @cancel='cancel' width='50%'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>未处理异常信息</span>
    </div>
    <div class='table-box'>
      <a-table
        :columns='columns'
        :data-source='data'
        :loading='loading'

      ></a-table>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'ErrorMessageModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [
        {
          title: '异常ID',
          key: 'id',
          dataIndex: 'id'
        },
        {
          title: '应用系统',
          key: 'appName',
          dataIndex: 'appName'
        },
        {
          title: '发生时间',
          key: 'createTime',
          dataIndex: 'createTime'

        },
        {
          title: '异常类型',
          key: 'type',
          dataIndex: 'type'
        }, {
          title: '描述',
          key: 'description',
          dataIndex: 'description'
        }
      ],
      data: [],
      loading: false
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>

</style>