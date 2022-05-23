<template>
  <!-- 计费设置弹窗-->

  <a-modal :visible='visible' @cancel='cancel' @ok='handleOk'>

    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>{{ title }}</span>
    </div>
    <a-form-model :model='form' :label-col='{span:10}' :wrapper-col='{span:10}' labelAlign='left'>
      <a-form-model-item label='分行名称'>
        <branch-search v-if='type!="edit"' type='default' :label-text='null' v-model='branchIds'></branch-search>
        <span v-else style='color:#838181'>{{ form.branchName }}</span>
      </a-form-model-item>
      <a-form-model-item label='服务器单价（元／台）:'>
        <a-input v-model.lazy='form.serverPrice' @change='isNumber("serverPrice")'></a-input>
      </a-form-model-item>
      <a-form-model-item label='前端许可单价（元/GB):'>
        <a-input v-model='form.foreLicensePrice' @change='isNumber("foreLicensePrice")'></a-input>
      </a-form-model-item>
      <a-form-model-item label='后端写入单价(元/GB):'>
        <a-input v-model='form.backLicensePrice' @change='isNumber("backLicensePrice")'></a-input>
      </a-form-model-item>
    </a-form-model>

  </a-modal>
</template>

<script>
import { addCharging, updateCharging, getChargingDetail, getStorageList } from '@/api/modules/backupdata/CvChargingApi'
import BranchSearch from '@comp/searchParms/BranchSearch'

export default {
  name: 'BillingSetInfoModal',
  components: {
    BranchSearch
  },
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
      form: {
        serverPrice: '',
        foreLicensePrice: '',
        masterLibraryPrice: '',
        backLicensePrice: ''
      },
      branchIds: [],
      storeageList: []
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.otherVisible = false
        if (val && this.type == 'edit') {
          this.getChargingDetail(this.id)
        }
        this.resetForm()
      },
      immediate: true
    },
    type: {
      handler(val) {
        if (val === 'edit') {
          this.title = '修改'
        } else {
          this.title = '新增'
        }
      },
      immediate: true

    }
  },
  methods: {
    /**
     * 获取存储库列表
     */
    async getStorageList() {
      const res = await getStorageList()
      if (res.code == 200) {
        this.storeageList = res.result || []
      } else {
        this.$message.error(res.message)
      }
    },
    /**
     * 获取计费设置详情
     * @param {String} id
     */
    async getChargingDetail(id) {
      const res = await getChargingDetail(id)
      if (res.code === 200) {
        this.oldForm = JSON.parse(JSON.stringify(res.result))
        this.form = res.result
        this.branchIds = res.result.branchId ? res.result.branchId.split(',') : []
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
      data.branchName = this.branchIds.map(item => item.name).join(',')
      data.branchId = this.branchIds.map(item => item.id).join(',')
      if (this.type === 'edit') {
        await this.updateCharging(data)
      } else {
        await this.addCharging(data)
      }
    },
    isNumber(key) {
      if (this.form[key] && !/^-?\d+\.?\d{0,2}$/.test(this.form[key])) {
        this.form[key] = parseInt(this.form[key]) || ''
      }
    },
    /**
     * 其他选项
     */
    other() {
      this.otherVisible = !this.otherVisible
      this.otherVisible && this.getStorageList()
      !this.otherVisible && this.initForm()
    },
    /**
     * 默认form
     */
    initForm() {
      if (this.type === 'edit') {
        this.form = JSON.parse(JSON.stringify(this.oldForm))
      } else {
        this.form = {
          serverPrice: '',
          foreLicensePrice: '',
          masterLibraryPrice: '',
          backLicensePrice: ''
        }
      }
    },
    /**
     * 取消
     */
    cancel() {
      this.$emit('cancel')
    },
    /**
     * 重置form
     */
    resetForm() {
      for (let key in this.form) {
        this.form[key] = ''
      }
      this.branchIds = []
    }
  }
}
</script>

<style scoped>

</style>