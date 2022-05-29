<template>
  <a-modal :visible='visible' @ok='handleOk' @cancel='handleCancel'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>处理作业</span>
    </div>
    <div>
      <a-input type='area' v-model='reason'></a-input>
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