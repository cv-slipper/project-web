<template>
  <div class='exportData'>
    <a-radio-group :default-value='1' v-model='value'>
      <a-radio :value='1'>
        生产域客户端信息初始化
      </a-radio>
      <a-radio :value='2'>
        分行域分行id初始化
      </a-radio>
    </a-radio-group>
    <a-button class='ml-10' type='primary' @click='initSystem'>数据初始化</a-button>
    <!--    <a-upload :customRequest='upload' :showUploadList='false'>-->
    <!--      <a-button type='primary'>-->
    <!--        <a-icon type='cloud-upload' />-->
    <!--        数据导入-->
    <!--      </a-button>-->
    <!--    </a-upload>-->

  </div>
</template>

<script>
import { initSystem } from '@/api/modules/common/index'

export default {
  name: 'ExportData',
  data() {
    return {
      value: 1
    }
  },
  methods: {
    async initSystem() {
      try {
        let params = {
          initType: this.value,
          domain: 'prod'
        }
        let res = await initSystem(params)
        if (res.code == 200) {
          this.$message.success('初始化完成')
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('初始化失败')
      }


    },
    upload(data) {
      console.log(data, 'data')
    }
  }
}
</script>

<style scoped>
.exportData {
  height: 100%;
  background: white;
  padding: 20px;
}
</style>