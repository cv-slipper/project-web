<template>
  <!-- 计费设置弹窗-->

  <a-modal :title='title' :visible='visible' @cancel='cancel' @ok='handleOk'>
    <a-form :label-col='{span:10}' :wrapper-col='{span:10}'>
      <a-form-item label='分行名称'>
        <a-select>
          <a--select-option v-for='item in branchList' :key='item.branchCode'>
            {{ item.branchName }}
          </a--select-option>
        </a-select>
      </a-form-item>
      <a-form-item label='服务器单价（元／台）:'>
        <a-input></a-input>
      </a-form-item>
      <a-form-item label='前端许可单价（元/GB):'>
        <a-input></a-input>
      </a-form-item>
      <a-form-item label='后端写入单价（元/GB):'>
        <a-input></a-input>
      </a-form-item>
      <a-form-item label='Disklib-cloud:'>
        <a-input></a-input>
      </a-form-item>
      <a-form-item :colon='false'>
        <a-button slot='label' type='primary' @click='otherVisible=true'>配置其他存储</a-button>
      </a-form-item>

      <template v-if='otherVisible'>
        <a-form-item label='Disklib-bj:'>
          <a-input></a-input>
        </a-form-item>
        <a-form-item label='Disklib-bjnew:'>
          <a-input></a-input>
        </a-form-item>
      </template>
    </a-form>
  </a-modal>
</template>

<script>
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
    }
  },
  data() {
    return {
      title: '新增弹窗',
      branchList: [],
      otherVisible: false
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    handleOk() {
      this.$emit('ok')
    }
  }
}
</script>

<style scoped>

</style>