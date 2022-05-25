<template>
  <div style='width:100%;height:100%;position:relative' class='system-info'>
    <div class='info-title'>
      <div class='name'>应用系统D</div>
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
        <div :class='["item-name",{normal:item.status==1,error:item.status!=1}]'>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SystemInfo',
  data() {
    return {
      systemList: [
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        }, {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        }, {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        }, {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        }, {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        },
        {
          name: '系统名称',
          status: 1
        }

      ]
    }
  },
  methods: {
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
}

.system-list {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .item {
    margin-top: 20px;
    padding: 5px 8px;
    background: linear-gradient(0deg, #5E8FFA 0%, #608AF2 100%);
    box-shadow: 0px 4px 8px 0px rgba(58, 121, 240, 0.28);
    border-radius: 17px;
    width: calc(16.66666667% - 8.5px);
    font-size: 12px;

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
</style>