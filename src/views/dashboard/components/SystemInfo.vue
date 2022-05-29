<template>
  <div style='width:100%;height:100%;position:relative' class='system-info'>
    <div class='loading' v-if='systemLoading'>
      <a-spin />
    </div>
    <div class='info-title'>
      <div class='name'>{{ systemItem.groupName }}</div>
    </div>
    <div class='left-floor'>

    </div>
    <div class='back-btn' @click='back'>
      <span class='mr-10'>返回</span>
      <a-icon type='right' />
    </div>
    <div class='info-border'>
      <div class='left-border'></div>
      <div class='center-border'>|</div>
      <div class='right-border'></div>
    </div>
    <div class='system-list'>
      <div class='item' v-for='(item,index) in systemList' :key='index'>
        <div :class='["item-name",{normal:item.exceptionNum==0,error:item.exceptionNum!=0}]'>
          {{ item.applicationSystem }}
        </div>
        <div class='error-num' v-if='item.exceptionNum!=0'>
          {{ item.exceptionNum }}
        </div>
      </div>
      <div style='clear:both'></div>
    </div>
  </div>
</template>

<script>
import { getSystemDetail } from '@api/modules/dashboard/analysis'

export default {
  name: 'SystemInfo',
  props: {
    systemItem: {
      type: Object | null,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      systemList: [],
      timer: null,
      systemLoading: false
    }
  },
  created() {

    if (this.systemItem != null && Object.keys(this.systemItem).length > 0) {

      if (this.timer) {
        clearInterval(this.timer)
      } else {
        this.getSystemDetail()
        this.timer = setInterval(() => {
          this.getSystemDetail()
        }, 600000)
      }
    }

  },
  methods: {
    /**
     * 获取系统列表
     */
    async getSystemDetail() {
      this.systemLoading = true
      try {
        let res = await getSystemDetail({ groupName: this.systemItem.groupName })
        if (res.code === 200) {
          this.systemList = res.result
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e, 'e')
      } finally {
        this.systemLoading = false
      }

    },
    back() {
      this.$emit('back')
    }
  }
}
</script>

<style scoped lang='less'>
.system-info {
  background: url("../../../assets/system-bg.png") no-repeat;
  background-size: 100% 100%;
  overflow-y: auto;
  padding-bottom: 20px
}

.system-list {
  width: 90%;
  margin: 0 auto;

  .item:nth-child(5n+1) {
    margin-left: 0
  }

  .item {
    margin-top: 20px;
    padding: 5px 8px;
    background: linear-gradient(0deg, #5E8FFA 0%, #608AF2 100%);
    box-shadow: 0px 4px 8px 0px rgba(58, 121, 240, 0.28);
    border-radius: 17px;
    width: calc(20% - 8.5px);
    font-size: 12px;
    float: left;
    margin-left: 10px;
    position: relative;

    .error-num {
      width: 20px;
      height: 20px;
      background: #F54040;
      border: 2px solid #FFFFFF;
      border-radius: 50%;
      font-size: 12px;
      position: absolute;
      right: -10px;
      top: -10px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
    }

    .item-name {
      padding-left: 15px;
      text-align: center;
      color: white;
      position: relative;
    }
  }
}

.normal::before {
  content: '';
  width: 12px;
  height: 12px;
  background: #10CF42;
  border: 2px solid #E3ECFC;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.error::before {
  content: '';
  width: 12px;
  height: 12px;
  background: #F54040;
  border: 2px solid #E3ECFC;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.info-title {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  margin-top: 50px;

  .name {
    padding: 0px 20px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #2C6EE8;
    font-weight: 500;
    color: #2C6EE8;
  }
}

.info-border {
  width: calc(74%);
  height: 30px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .left-border {
    width: calc(35%);
    height: calc(100% + 10px);
    border-left: 1px solid #2C6EE8;
    border-top: 1px solid #2C6EE8;
    position: absolute;
    top: -20px;
    left: 0
  }

  .right-border {
    width: 35%;
    height: calc(100% + 10px);
    border-top: 1px solid #2C6EE8;
    border-right: 1px solid #2C6EE8;
    position: absolute;
    top: -20px;
    right: 0
  }

  .center-border {
    width: 10%;
    height: 100%;
    color: #2C6EE8;
    margin: 0 auto;
    text-align: center;
  }
}

.system-info::-webkit-scrollbar-track {
  height: 5px;
  width: 5px;
  background-color: white;
}

/*定义滚动条高宽及背景*/
.system-info::-webkit-scrollbar {
  height: 5px;
  width: 5px;
  background-color: white;
}

/*定义滚动条*/
.system-info::-webkit-scrollbar-thumb {
  height: 5px;
  border-radius: 4px;
  background-color: #3475EF;
}

.back-btn {
  padding: 10px;
  font-size: 12px;
  background: #FFFFFF;
  box-shadow: 0px 4px 8px 0px rgba(193, 199, 211, 0.4);
  opacity: 0.65;
  border-radius: 0px 7px 7px 0px;
  position: absolute;
  top: 20px;
  left: 0;
  cursor: pointer;
  z-index: 9999;
}

.loading {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto
}
</style>