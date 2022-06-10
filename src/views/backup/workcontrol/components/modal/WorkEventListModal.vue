<template>
  <a-modal width='60%' :visible='visible' @cancel='cancel' :footer='false'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>作业相关事件</span>
    </div>
    <div class='table-box'>
      <a-table
        :columns='columns'
        :data-source='data'
        :loading='loading'
        :pagination='false'
        :scroll='{x:"100%"}'
      >
        <template #tooltip='data'>
          <a-tooltip :title='data'>
            <div class='text-ellipsis'>
              {{ data }}
            </div>
          </a-tooltip>
        </template>
      </a-table>
    </div>
  </a-modal>
</template>

<script>
import { getEventList } from '@/api/modules/dashboard/analysis.js'

export default {
  name: 'WorkEventListModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailItem: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.getEventList()
      }
    }
  },
  data() {
    return {
      loading: false,
      columns: [
        {
          title: '严重程度',
          key: 'seriousness',
          width: 150,
          dataIndex: 'seriousness'
        },
        {
          title: '事件ID',
          key: 'eventId',
          width: 120,
          dataIndex: 'eventId'
        },
        {
          title: '描述',
          key: 'description',
          dataIndex: 'description',
          scopedSlots: {
            customRender: 'tooltip'
          }
        }
      ],
      data: []
    }
  },
  methods: {
    /**
     * 获取实时列表
     */
    async getEventList() {
      this.loading = true
      try {
        const res = await getEventList({ jobId: this.detailItem.jobId, domain: this.detailItem.domain })
        if (res.code == 200) {
          this.data = res.result || []
        } else {
          this.$message.error(res.message)
        }
      } finally {
        this.loading = false
      }
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>

</style>