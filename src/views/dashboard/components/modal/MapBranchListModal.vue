<template>
  <a-modal width='65%' :visible='visible' :footer='false' @cancel='cancel'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>分行列表</span>
    </div>
    <div>
      <div class='card-group'>
        <div class='item' v-for='(item,index) in branchPoints' :key='index'>
          <a-card :title='item.name'>
            <div class='branch-group'>
              <div
                :class='["branch-item",{success:ele.excptionNum==0 || !ele.excptionNum,error:ele.excptionNum>=0,active: currentBranch &&  currentBranch.name==ele.name}]'
                v-for='(ele,i) in item.children'
                :key='i'
                @click='checkBranch(ele)'
              >
                {{ ele.name }}
                <span v-if='ele.excptionNum' class='error-num'>
                  ({{ ele.excptionNum }})
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
import { branchPoints } from '@views/dashboard/components/china'

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
  data() {
    return {
      branchPoints
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    checkBranch(ele) {
      this.$emit('checkBranch', ele)
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