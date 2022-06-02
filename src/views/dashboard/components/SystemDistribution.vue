<template>
  <div style='width:100%;height:100%;position:relative' class='system'>
    <div class='loading' v-if='systemLoading'>
      <a-spin />
    </div>

    <div class='system-title'>
      <div class='title-logo'>
        <img src='@/assets/system-logo.png' alt='' />
      </div>
      <div class='ml-10'>
        <span>应用系统备份运行状态</span>
      </div>
    </div>
    <div class='service'>
      <img src='@/assets/systemServer.png' alt=''>
    </div>
    <div class='left-colund'>
      <img src='@/assets/clound1.png' alt='' />
    </div>
    <div class='right-clound'>
      <img src='@/assets/clound2.png' alt='' />
    </div>
    <div class='floor'>
      <img src='@/assets/floor.png' alt='' />
    </div>
    <div class='right-floor'>
      <img src='@/assets/right-floor.png' alt='' />
    </div>
    <div class='wang'>
      <img src='@/assets/wang.png' alt='' />
    </div>

    <div class='system-group'>

      <div
        class='item'
        v-for='(item,index) in systemList'
        :key='index'
        :style='getStyle(index)'
        @click='gotoSystemInfo(item)'>
        <div class='top'>
          <div class='top-bg'>
            <img src='@/assets/systemNormal.png' v-if='item.state==1' alt='' />
            <img src='@/assets/systemWarning.gif' v-else alt='' />
          </div>
          <div class='system-name-box'>
            <div class='system-name'>{{ item.groupName }}</div>
          </div>
        </div>
        <div class='bottom'>
          <img src='@/assets/systemBottm.gif' alt='' />
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: 'SystemDistribution',
  props: {

    systemLoading: {
      type: Boolean,
      default: true
    },
    systemList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    gotoSystemInfo(item) {
      this.$emit('gotoSystemInfo', item)
    },
    getStyle(index) {
      let style = {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999
      }
      if (index < 3) {
        style.left = 40 + 15 * index + '%'
        style.top = 10 + 14 * index + '%'
      }
      if (index >= 3 && index < 6) {
        style.left = 30 + 15 * (index - 3) + '%'
        style.top = 20 + 14 * (index - 3) + '%'
      }
      if (index >= 6 && index < 8) {
        style.left = 25 + 15 * (index - 6) + '%'
        style.top = 35 + 15 * (index - 6) + '%'
      }
      if (index == 8) {
        style.left = 22 + 15 * (index - 8) + '%'
        style.top = 54 + 14 * (index - 8) + '%'
      }
      return style
    }
  }
}
</script>

<style scoped lang='less'>
.system {
  background: url("../../../assets/system-bg.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;

  .service {
    width: 180px;
    height: 100px;
    position: absolute;
    right: 50px;
    top: 50px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .system-group {
    .item {
      width: 80px;
      height: 100px;
      position: relative;
      cursor: pointer;

      .bottom {
        width: 60px;
        height: 45px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;

        img {
          width: 100%;
          height: 100%;

        }
      }

      .top {
        width: 100%;
        height: 55px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
      }

      .system-name-box {
        transform: rotateY(47deg);
      }

      .system-name {
        color: white;
        font-weight: bold;
        font-size: 12px;
        z-index: 999;
        transform: rotateZ(23deg);
      }

      .top-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;

        img {
          width: 100%;
          height: 100%;
          transform: rotateY(40deg);
        }
      }
    }
  }
}

.left-colund {
  width: 48px;
  height: 40px;
  position: absolute;
  top: 20%;
  left: 10%;

  img {
    width: 100%;
    height: 100%;
  }
}

.right-clound {
  width: 48px;
  height: 40px;
  position: absolute;
  top: 20px;
  right: 220px;

  img {
    width: 100%;
    height: 100%;
  }
}

.floor {
  width: 100px;
  height: 80px;
  position: absolute;
  left: 10px;
  bottom: 0;

  img {
    width: 100%;
    height: 100%;
  }
}

.wang {
  width: 67px;
  height: 48px;
  position: absolute;
  right: 50px;
  top: 105px;

  img {
    width: 100%;
    height: 100%;
  }
}

.right-floor {
  width: 160px;
  height: 130px;
  position: absolute;
  right: 0;
  bottom: 0;

  img {
    width: 100%;
    height: 100%;
  }
}

/deep/ .system::-webkit-scrollbar, .info::-webkit-scrollbar {
  height: 9px;
  width: 5px;
  background-color: #4d64bd;
}

// 滚动条颜色
/deep/ .system::-webkit-scrollbar-thumb, .info::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #3475EF;
}

.system-title {
  position: absolute;
  top: 10px;
  left: 0;
  padding: 10px;
  background: #FFFFFF;
  box-shadow: 0px 4px 8px 0px rgba(193, 199, 211, 0.4);
  opacity: 0.65;
  border-radius: 0px 7px 7px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title-logo {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #3475EF;
    box-shadow: 0px 4px 8px 0px rgba(58, 121, 240, 0.4);
    border-radius: 50%;

    img {
      width: 10px;
      height: 10px;
    }
  }

  span {
    font-weight: 500;
    color: #333333;
    font-size: 12px;
  }
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