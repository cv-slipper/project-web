<template>
  <div>
    <a-modal :visible='visible' :footer='false' @cancel='cancel'>
      <div slot='title' style='display: flex;align-items: center'>
        <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
        <span class='ml-10'>作业详情</span>
      </div>
      <a-spin v-if='detailLoading' />
      <div v-else>
        <ul>
          <li v-for='(item,index) in labelList' :key='index'>
            <span class='label'>{{ item.label }}</span>
            <span class='content'>{{ getValue(item.value) }}</span>
          </li>
        </ul>
        <div class='buttons mt-20'>
          <a-button class='ml-10 warning-btn' @click='pauseWork'>
            <a-icon type='pause' style='font-size:14px' />
            暂停
          </a-button>
          <a-button class='ml-10 success-btn' @click='playWork'>
            <a-icon type='caret-right' />
            继续
          </a-button>
          <a-button class='ml-10 error-btn' @click='stopWork'>
            <a-icon type='stop' />
            终止
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { getWorkDetail, pauseWork, playWork, stopWork } from '@/api/modules/workcontrol/index.js'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    labelList: {
      type: Array,
      default: () => []
    },
    id: {
      type: String | Number,
      default: ''
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.getWorkDetail()
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      detail: {},
      detailLoading: false
    }
  },
  methods: {
    /**
     * 暂停作业
     */
    async pauseWork() {
      try {
        let params = {}
        let res = await pauseWork(params)
        if (res.code == 200) {
          this.$message.success('暂停作业成功')
          this.getWorkDetail()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {

      }
    },
    /**
     * 继续作业
     */
    async playWork() {
      try {
        let params = {}
        let res = await playWork(params)
        if (res.code == 200) {
          this.$message.success('暂停作业成功')
          this.getWorkDetail()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {

      }
    },
    /**
     * 获取作业详情
     */
    async getWorkDetail() {
      this.detailLoading = true
      try {
        let res = await getWorkDetail(this.id)
        if (res.code == 200) {
          console.log(res, 'res')
          this.detail = res.data
        } else {
          this.$message.error(res.message)
        }
      } catch {

      } finally {
        this.detailLoading = false
      }
    },
    /**
     * 终止作业
     */
    async stopWork() {
      try {
        let params = {}
        let res = await stopWork(params)
        if (res.code == 200) {
          this.$message.success('暂停作业成功')
          this.getWorkDetail()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {

      }
    },
    getValue(key) {
      if (this.detail[key]) {
        return this.detail[key]
      } else {
        return ''
      }
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>
<style scoped lang='less'>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;

  li {
    span {
      width: 50%
    }

    .content {
      color: #666666;
    }
  }
}

.warning-btn {
  background: #e6a23c !important;
  border-color: #e6a23c !important;
  color: white;
  font-size: 14px;
}

.success-btn {
  background: #67c23a;
  border-color: #67c23a;
  color: white;
}

.error-btn {
  background: #f56c6c;
  border-color: #f56c6c;
  color: white;
}
</style>