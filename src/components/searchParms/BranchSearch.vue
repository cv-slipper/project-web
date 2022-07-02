<template>
  <div class='form-item'>
    <div class='wrapper fl' :style='{width:"100%"}'>
      <a-select
        :style='{minWidth:"150px",width:"100%",maxWidth:width}'
        v-model='values'
        @change='selectChange'
        :show-search='model=="multiple"?false:true'
        :filter-option='filterOption'
        　:disabled='disabled'
        :placeholder='placeholder'
        :mode='model'>
        <a-select-option v-for='item in branchList' :value='item[keys]' :key='item[keys]'>
          {{ item.abbreviation }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
import { getBranchList } from '@api/modules/dashboard/analysis'

export default {
  name: 'BranchSearch',
  props: {
    type: {
      type: String,
      default: 'multiple'
    },
    labelText: {
      type: String || null,
      default: '分行:'
    },
    value: {
      type: Array,
      default: function() {
        return []
      }
    },
    keys: {
      type: String,
      default: 'id'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择分行'
    },
    width: {
      type: String,
      default: '240px'
    }
  },
  data() {
    return {
      branchList: [],
      model: '',
      values: []
    }
  },
  watch: {
    type: {
      handler(val) {
        this.model = val
      },
      immediate: true
    },
    value: {
      handler(val) {
        if (this.type == 'multiple') {
          val = typeof val === 'string' ? val.split(',') : val
          this.values = val.map(item => typeof item == 'string' ? item : item[this.keys])
        } else {
          this.values = val.map(item => typeof item == 'string' ? item : item[this.keys])
        }
      },
      immediate: true,
      deep: true

    }
  },
  created() {
    this.getBranchList()
  },
  methods: {
    /**
     * 获取分行列表
     */
    async getBranchList() {
      const res = await getBranchList()
      if (res.code == 200) {
        if (res.result.length > 0) {
          res.result.forEach(item => {
            item.name = item.abbreviation
          })
        }
        this.branchList = res.result || []
      } else {
        this.$message.error(res.message)
      }
    },
    /**
     * 选择分行
     * @param {Object} val 选择的分行
     */
    selectChange(val) {
      let values
      typeof val == 'string' ? (values = [val]) : (values = val)
      let result = []
      values.forEach(item => {
        let index = this.branchList.findIndex(i => i.id == item)
        if (index != -1) {
          result.push(this.branchList[index])
        }
      })
      this.$emit('input', result)
    },
    /**
     * 过滤分行
     */
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.indexOf(input) >= 0
      )
    },
    init() {
      this.value = typeof this.value === 'string' ? this.value.split(',') : this.value
      this.values = this.value.map(item => typeof item == 'string' ? item : item[this.keys])
      this.$set(this, 'values', this.value.map(item => typeof item == 'string' ? item : item[this.keys]))
    }
  }
}
</script>

<style scoped>

</style>