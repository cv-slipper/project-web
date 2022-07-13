<template>
  <div style='width:100%;height:100%;position:relative' class='system'>
    <div class='loading' v-if='systemLoading'>
      <a-spin />
    </div>

    <div class='system-title'>
      <div class='title-wrapper'>
        <div class='title-logo'>
          <img src='@/assets/system-logo.png' alt='' />
        </div>
        <div class='ml-10 title-text'>
          <span>应用系统备份运行状态</span>
        </div>
      </div>
      <div class='check-view'>
        <span class='view-button' @click='checkView'>切换至</span>
        <span>数据中心视图</span>
      </div>
    </div>
    <div class='left-colund'>
      <img src='@/assets/clound2.png' alt='' />
    </div>
    <div class='right-clound'>
      <img src='@/assets/clound1.png' alt='' />
    </div>
    <div class='star'>
      <img src='@/assets/star.png' alt='' />
    </div>
    <div class='connect-line'>
      <img src='@/assets/connect-line.gif' alt='' />
    </div>
    <div class='data-center'>
      <img src='@/assets/data-center.gif' alt='' />
    </div>
    <div class='system-group' v-if='!systemLoading'>
      <div class='item-box'>
        <img class='person' src='@/assets/person.png' alt='' />
        <div class='item' v-for='(item,index) in dataList' :key='index' @click='gotoSystemInfo(item)'>
          <div class='system-top'>
            <img class='system-top_bg' v-if='item.state==1' src='@/assets/normal-message.png' alt='' />
            <img class='system-top_bg' v-else src='@/assets/warning-message.gif' alt='' />
            <div class='system-name text-ellipsis'>{{ item.groupName }}</div>
          </div>
          <div class='system-bottom'>
            <img src='@/assets/monitor.gif' />
          </div>
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
  watch: {
    systemList: {
      handler(val) {
        this.dataList = val
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      view: '应用系统',
      dataList: []
    }
  },
  methods: {
    getData() {
      return this.dataList.sort((a, b) => a.groupId - b.groupId)
    },
    checkView() {
      this.$emit('checkView')
    },
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
    width: 280px;
    height: 160px;
    position: absolute;
    right: 50px;
    top: 50px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .system-group {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 60%;
    background: url("../../../assets/main-bottom.png") no-repeat;
    background-size: 100% 100%;

    .item-box {
      width: 65%;
      height: 75%;
      position: absolute;
      left: 0;
      bottom: 11%;
      right: 0;
      margin: auto;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .item {
        width: calc(20% - 10px);
        position: relative;
        cursor: pointer;

        .system-top {
          width: 100%;
          position: absolute;
          top: -50%;
          left: 0;
          cursor: pointer;

          .system-name {
            width: 100%;
            height: 100%;
            position: absolute;
            top: -20%;
            left: 0;
            right: 0;
            margin: auto;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
          }

          img {
            width: 100%;
            object-fit: cover;
          }
        }

        .system-bottom {
          width: 90%;
          transform: rotateX(30deg);

          img {
            width: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}

.left-colund {
  width: 48px;
  height: 40px;
  position: absolute;
  top: 30%;
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
  top: 20%;
  right: 10%;

  img {
    width: 100%;
    height: 100%;
  }
}

.star {
  width: 140px;
  object-fit: contain;
  position: absolute;
  top: 5%;
  right: 5%;

  img {
    width: 100%;
    height: 100%;
  }
}

.connect-line {
  width: 45%;
  height: 20%;
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  margin: auto;

  img {
    width: 100%;
    height: 100%;

  }
}

.data-center {
  width: 110px;
  position: absolute;
  top: calc(25% - 80px);
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;

  img {
    width: 100%;
    object-fit: contain;
    position: relative;
    right: 4px;
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

.person {
  position: absolute;
  bottom: 18%;
  left: -5%;
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

  .check-view {
    padding: 10px;
    background: rgba(0, 0, 0, 0);
    font-size: 12px;
    color: #868686;

    .view-button {
      padding: 2px 5px;
      border: 1px solid #6F9EF5;
      border-radius: 10px;
      color: #6F9EF5;
      font-weight: bold;
      margin-right: 5px;
      cursor: pointer;
    }
  }

  .title-wrapper {
    padding: 10px;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0px 7px 7px 0px;
    box-shadow: 0px 4px 8px 0px rgba(193, 199, 211, 0.4);

    .title-text {
      font-size: 14px;
      font-weight: bold;
      color: #000;
    }
  }

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

//@media screen and(max-width: 1700px) {
//  .person {
//    bottom: 25%
//  }
//
//  .system {
//    .service {
//      width: 180px;
//      height: 100px;
//    }
//
//    .right-clound {
//      right: 10%;
//    }
//
//    .system-group {
//      .item-box {
//        bottom: 10%;
//
//        .item {
//          width: calc(20% - 12px);
//
//          .system-top {
//
//            top: -50%;
//
//            .system-name {
//              height: 100%;
//              transform: scale(0.8);
//            }
//          }
//        }
//      }
//
//
//    }
//  }
//}
</style>