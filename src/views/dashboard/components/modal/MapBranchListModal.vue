<template>
  <a-modal width='65%' :visible='visible' :footer='false' @cancel='cancel'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>分行列表</span>
    </div>
    <div>
      <div class='card-group'>
        <div class='item' v-for='(item,index) in branchPoints' :key='index'>
          <a-card :title='item.regionName+"区域"'>
            <div class='branch-group'>
              <div
                :class='["branch-item",{success:ele.exceptionNum==0 || !ele.exceptionNum,error:ele.exceptionNum>0,active: currentBranch &&  currentBranch.branchName==ele.branchName}]'
                v-for='(ele,i) in item.children'
                :key='i'
                @click='checkBranch(ele)'
              >
                <span>
                  {{ ele.branchName }}
                  <span class='error-num' v-if='ele.exceptionNum>0'>({{ ele.exceptionNum }})</span>
                </span>
              </div>
            </div>
          </a-card>
        </div>

      </div>
    </div>
  </a-modal>
</template>

<script>
import { getBranchMapList } from '@api/modules/dashboard/analysis'

export default {
  name: 'MapBranchListModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentBranch: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.getBranchMapList()
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      branchPoints: []
    }
  },
  methods: {
    /**
     * 获取分行列表
     */
    async getBranchMapList() {
      try {
        const res = await getBranchMapList()
        if (res.code == 200) {
          this.branchPoints = res.result
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('获取分行列表失败')
      }
    },
    cancel() {
      this.$emit('cancel')
    },
    checkBranch(ele) {
      let element = JSON.parse(JSON.stringify(ele))
      element.center = JSON.parse(element.coordinate)
      element.name = element.branchName
      this.$emit('checkBranch', element)
    }

  }
}
</script>

<style scoped lang='less'>
.card-group {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  .item {
    width: calc(33% - 20px);
    margin-left: 30px;
    margin-top: 20px;

    .branch-group {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;

      .branch-item {
        width: calc(50% - 10px);
        margin-left: 20px;
        margin-top: 10px;
        padding-left: 16px;
        position: relative;
        cursor: pointer;
      }

      .success::before {
        content: '';
        width: 8px;
        height: 8px;
        background-color: #52c41a;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto
      }

      .error::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #ff4d4f;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto
      }

      .error-num {
        color: #ff4d4f;
      }

      .branch-item:nth-child(2n+1) {
        margin-left: 0;
      }
    }
  }

  .item:nth-child(3n+1) {
    margin-left: 0;
  }
}

.active {
  color: #1890ff;
  font-weight: bold;
}
</style>