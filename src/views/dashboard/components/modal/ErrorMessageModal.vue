<template>
  <a-modal :visible='visible' :footer='false' @cancel='cancel' width='90%'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>未处理异常信息</span>
    </div>
    <div class='searchParams'>
      <div class='form-item'>
        <div class='label'>异常类型：</div>
        <div class='content'>
          <a-select mode='multiple' v-model='searchParams.type' style='width:200px'>
            <a-select-option v-for='item in types' :key='item.value' :value='item.value'
                             :label='item.label'></a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>严重程度：</div>
        <div class='content'>
          <a-select mode='multiple' v-model='searchParams.level' style='width:200px'>
            <a-select-option v-for='item in levels' :key='item.value' :value='item.value'
                             :label='item.label'></a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>备份域：</div>
        <div class='content'>
          <a-select v-model='searchParams.backupDomain' style='width:200px'>
            <a-select-option v-for='item in backupDomains' :key='item.value' :value='item.value'
                             :label='item.label'></a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>应用系统／分行：</div>
        <div class='content'>
          <a-select v-model='searchParams.appSystem' style='width:200px'>
            <a-select-option
              v-for='item in appSystems'
              :key='item.value'
              :value='item.value'
              :label='item.label'></a-select-option>
          </a-select>
        </div>
        <div class='label ml-10 '>
          <a-button type='primary'>查询</a-button>
        </div>
      </div>
    </div>
    <div class='searchParams flex-between'>
      <div></div>
      <div>
        <a-button type='link'>批量处理</a-button>
        <a-button type='link'>批量忽略</a-button>
      </div>
    </div>
    <div class='table-box'>
      <a-table
        :columns='columns'
        :data-source='data'
        :loading='loading'
        :bordered='true'
      >
        <template #action='row'>
          <div class='flex-between'>
            <a-button type='link'>详情</a-button>
            <a-button type='link'>处理</a-button>
            <a-button type='link'>忽略</a-button>
          </div>
        </template>
      </a-table>
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
          dataIndex: 'id',
          align: 'center'
        },
        {
          title: '严重程度',
          key: 'level',
          dataIndex: 'level',
          align: 'center'
        },
        {
          title: '备份域',
          key: 'backupDomain',
          dataIndex: 'backupDomain',
          align: 'center'
        },
        {
          title: '应用系统/分行',
          key: 'appName',
          dataIndex: 'appName',
          align: 'center'
        },
        {
          title: '发生时间',
          key: 'createTime',
          dataIndex: 'createTime',
          align: 'center'

        },
        {
          title: '异常类型',
          key: 'type',
          dataIndex: 'type',
          align: 'center'
        }, {
          title: '描述',
          key: 'description',
          dataIndex: 'description',
          align: 'center'
        }, {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 200,
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],
      data: [{}],
      searchParams: {
        type: []
      },
      backupDomains: [],
      types: [],
      levels: [],
      appSystems: [],
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
.table-box {
  padding: 0 20px;
}

.label {
  font-size: 12px !important;
}
</style>