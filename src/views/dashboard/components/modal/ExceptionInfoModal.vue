<template>
  <div>
    <a-modal width='40%' :visible='visible' :footer='false' @cancel='cancel'>
      <div slot='title' style='display: flex;align-items: center'>
        <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
        <span class='ml-10'>作业详情</span>
      </div>
      <a-spin v-if='detailLoading' />
      <div v-else>
        <ul>
          <li v-for='(item,index) in labelList' :key='index'>
            <span class='label'>{{ item.label }}</span>
            <span class='content'>{{ getValue(item.value) }} </span>
          </li>
        </ul>
        <div class='dealwith mt-20'>
          <ul>
            <li>
              <span class='label'>处理状态</span>
              <span class='content'>123</span>
            </li>
            <li>
              <span class='label'>处理人</span>
              <span class='content'>123</span>
            </li>
            <li>
              <span class='label'>处理时间</span>
              <span class='content'>123</span>
            </li>
            <li>
              <span class='label'>处理内容</span>
              <span class='content'>123</span>
            </li>
          </ul>
        </div>
        <div class='buttons mt-20'>
          <a-button class='ml-10 warning-btn'>
            <a-icon type='pause' style='font-size:14px' />
            处理
          </a-button>
          <a-button class='ml-10 success-btn'>
            <a-icon type='caret-right' />
            忽略
          </a-button>
          <a-button type='link'>查看作业相关事件</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { getWorkDetail } from '@/api/modules/workcontrol/index.js'

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
    type: {
      type: String,
      default: ''
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
     * 获取作业详情
     */
    async getWorkDetail() {
      this.detailLoading = true
      try {
        let res = await getWorkDetail(this.id)
        if (res.code == 200) {
          this.detail = res.result
        } else {
          this.detail = {}
          this.$message.error(res.message)
        }
      } catch {

      } finally {
        this.detailLoading = false
        this.$forceUpdate()
        console.log(this.detailLoading, 'this.detailLoading')
      }
    },

    getValue(key) {
      let value = ''
      try {
        if (this.detail[key]) {
          value = this.detail[key]
        } else {
          value = ''
        }
      } catch (e) {
        value = ''
      }
      return value
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
  width: 80%;
  margin: 0 auto;

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

.buttons {
  width: 80%;
  margin: 20px auto;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
</style>