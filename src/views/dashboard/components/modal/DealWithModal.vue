<template>
  <a-modal :visible='visible' @ok='handleOk' @cancel='handleCancel'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>处理作业</span>
    </div>
    <div>
      <div class='label'>处理描述：</div>
    </div>
    <div class='mt-10'>
      <a-input type='textarea' :auto-size='{minRows:4,maxRows:6}' v-model='reason'></a-input>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  name: 'DealWithModal',
  data() {
    return {
      reason: ''
    }
  },
  methods: {
    handleOk() {
      this.$emit('ok', this.reason)
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }

}
</script>

<style scoped>

</style>