<template>
  <a-table
    rowKey="id"
    size="middle"
    bordered
    :loading="loading"
    :columns="columns"
    :dataSource="dataSource"
    :pagination="false"
  >

    <template slot="htmlSlot" slot-scope="text">
      <div v-html="text"></div>
    </template>

    <template slot="imgSlot" slot-scope="text">
      <div style="font-size: 12px;font-style: italic;">
        <span v-if="!text">无图片</span>
        <img v-else :src="getImgView(text)" alt="" style="max-width:80px;height:25px;"/>
      </div>
    </template>

    <template slot="fileSlot" slot-scope="text">
      <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
      <a-button
              v-else
              ghost
              type="primary"
              icon="download"
              size="small"
              @click="uploadFile(text)"
      >
        <span>下载</span>
      </a-button>
    </template>

  </a-table>
</template>

<script>
  import { getAction } from '@api/manage'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: 'PersistentExceptionWorkDetailSubTable',
    mixins: [JeecgListMixin],
    props: {
      record: {
        type: Object,
        default: null,
      }
    },
    data() {
      return {
        description: '持续异常作业明细内嵌列表',
        disableMixinCreated: true,
        loading: false,
        dataSource: [],
        columns: [
          {
            title: '机器名',
            align: 'center',
            dataIndex: 'machineName',
          },
          {
            title: '主机',
            align: 'center',
            dataIndex: 'host',
          },
          {
            title: '代理',
            align: 'center',
            dataIndex: 'agent',
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'state',
          },
          {
            title: '虚拟机大小',
            align: 'center',
            dataIndex: 'virtualSize',
          },
          {
            title: '备份大小',
            align: 'center',
            dataIndex: 'backupSize',
          },
          {
            title: '客户机大小',
            align: 'center',
            dataIndex: 'clientSize',
          },
          {
            title: '开始时间',
            align: 'center',
            dataIndex: 'startTime',
          },
          {
            title: '结束时间',
            align: 'center',
            dataIndex: 'endTime',
          },
          {
            title: 'VMware工具',
            align: 'center',
            dataIndex: 'vmTool',
          },
          {
            title: '硬件版本',
            align: 'center',
            dataIndex: 'hardwareVersion',
          },
          {
            title: '操作系统',
            align: 'center',
            dataIndex: 'os',
          },
          {
            title: '备份类型',
            align: 'center',
            dataIndex: 'backupType',
          },
          {
            title: 'CBT状态',
            align: 'center',
            dataIndex: 'cbtState',
          },
          {
            title: 'APP感知状态',
            align: 'center',
            dataIndex: 'perceptionState',
          },
          {
            title: '传输模式',
            align: 'center',
            dataIndex: 'transportMode',
          },
          {
            title: '所有者',
            align: 'center',
            dataIndex: 'owner',
          },
        ],
        url: {
          listByMainId: '/persistentexceptionwork/persistentExceptionWork/queryPersistentExceptionWorkDetailByMainId',
        },
      }
    },
    watch: {
      record: {
        immediate: true,
        handler() {
          if (this.record != null) {
            this.loadData(this.record)
          }
        }
      }
    },
    methods: {

      loadData(record) {
        this.loading = true
        this.dataSource = []
        getAction(this.url.listByMainId, {
          id: record.id
        }).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
          }
        }).finally(() => {
          this.loading = false
        })
      },

    },
  }
</script>

<style scoped>

</style>
