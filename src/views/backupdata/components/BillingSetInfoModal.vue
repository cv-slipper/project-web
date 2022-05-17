<template>
  <!-- 计费设置弹窗-->

  <a-modal :visible='visible' @cancel='cancel' @ok='handleOk'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>{{ title }}</span>
    </div>
    <a-form-model :model='form' :label-col='{span:10}' :wrapper-col='{span:10}'>
      <a-form-model-item label='分行名称'>
        <a-select show-search filter-option>
          <a--select-option v-for='item in branchList' :key='item.branchCode'>
            {{ item.branchName }}
          </a--select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label='服务器单价（元／台）:'>
        <a-input></a-input>
      </a-form-model-item>
      <a-form-model-item label='前端许可单价（元/GB):'>
        <a-input></a-input>
      </a-form-model-item>
      <a-form-model-item label='后端写入单价（元/GB):'>
        <a-input></a-input>
      </a-form-model-item>
      <a-form-model-item label='Disklib-cloud:'>
        <a-input></a-input>
      </a-form-model-item>
      <a-form-model-item :colon='false'>
        <a-button slot='label' type='primary' @click='otherVisible=true'>
          <a-icon type='check-square' />
          配置其他存储
        </a-button>
      </a-form-model-item>
      <template v-if='otherVisible'>
        <a-form-model-item label='Disklib-bj:'>
          <a-input></a-input>
        </a-form-model-item>
        <a-form-model-item label='Disklib-bjnew:'>
          <a-input></a-input>
        </a-form-model-item>
      </template>
    </a-form-model>

  </a-modal>
</template>

<script>
import { addCharging, updateCharging, getChargingDetail } from '@/api/modules/backupdata/CvChargingApi'

export default {
  name: 'BillingSetInfoModal',
  props: {
    type: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      title: '新增',
      branchList: [],
      otherVisible: false,
      form: {}
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.otherVisible = false
        if (val && this.type == 'edit') {
          this.getChargingDetail(this.id)
        }
      },
      immediate: true
    },
    type: {
      handler(val) {
        if (val === 'edit') {
          this.title = '编辑'
        } else {
          this.title = '新增'
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 获取计费设置详情
     * @param {String} id
     */
    async getChargingDetail(id) {
      const res = await getChargingDetail(id)
      if (res.code === 200) {
        this.form = res.data
      } else {
        this.$message.error(res.message)
        this.cancel()
      }
    },
    /**
     * 添加计费设置方法
     * @param {Object} data
     */
    async addCharging(data) {
      const res = await addCharging(data)
      if (res.code === 200) {
        this.$message.success('添加成功')
        this.$emit('ok')
      } else {
        this.$message.error(res.message)
      }
    },
    /**
     * 编辑计费设置方法
     * @param {Object} data
     */
    async updateCharging(data) {
      const res = await updateCharging(data)
      if (res.code === 200) {
        this.$message.success('修改成功')
        this.$emit('ok')
      } else {
        this.$message.error(res.message)
      }
    },
    /**
     * 添加or修改计费设置
     * @param {Object} data
     */
    async handleOk() {
      const data = this.form
      if (this.type === 'edit') {
        await updateCharging(data)
      } else {
        await addCharging(data)
      }
    },
    /**
     * 取消
     */
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>

</style>