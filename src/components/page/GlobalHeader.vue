<template>
  <!-- , width: fixedHeader ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'  -->
  <a-layout-header
    v-if='!headerBarFixed'
    :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
    :style="{ padding: '0' }">

    <div v-if="mode === 'sidemenu'" class='header' :class='theme'>
      <!--      <a-icon-->
      <!--        v-if="device==='mobile'"-->
      <!--        class='trigger'-->
      <!--        :type="collapsed ? 'menu-fold' : 'menu-unfold'"-->
      <!--        @click='toggle'></a-icon>-->
      <!--      <a-icon-->
      <!--        v-else-->
      <!--        class='trigger'-->
      <!--        :type="collapsed ? 'menu-unfold' : 'menu-fold'"-->
      <!--        @click='toggle' />-->

      <!--      <span v-if="device === 'desktop'">欢迎进入 系统</span>-->
      <a-input placeholder='搜索什么...' class='header-input'>
        <a-icon type='search' slot='prefix' style='color:#98999A' />
      </a-input>
      <div>
        <ul style='list-style:none'>
          <!--          <li class='fl'>-->
          <!--            <a-icon type='cloud'></a-icon>-->
          <!--            <span style='margin-left:15px'>3-10℃</span>-->
          <!--          </li>-->
          <!--          <li class='fl ml-10' style='color: rgba(157, 165, 190, 1);'>|</li>-->
          <li class='fl ml-10'>
            <span>
              {{ dateFormat(date) }}
            </span>
          </li>
        </ul>
      </div>
      <user-menu :theme='theme' />
    </div>
    <!-- 顶部导航栏模式 -->
    <div v-else :class="['top-nav-header-index', theme]">
      <div class='header-index-wide'>
        <div class='header-index-left' :style='topMenuStyle.headerIndexLeft'>
          <logo class='top-nav-header' :show-title="device !== 'mobile'" :style='topMenuStyle.topNavHeader' />
          <div v-if="device !== 'mobile'" :style='topMenuStyle.topSmenuStyle'>
            <s-menu
              mode='horizontal'
              :menu='menus'
              :theme='theme'></s-menu>
          </div>
          <a-icon
            v-else
            class='trigger'
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click='toggle'></a-icon>
        </div>
        <user-menu class='header-index-right' :theme='theme' :style='topMenuStyle.headerIndexRight' />
      </div>
    </div>

  </a-layout-header>
</template>

<script>
import UserMenu from '../tools/UserMenu'
import SMenu from '../menu/'
import Logo from '../tools/Logo'

import { mixin } from '@/utils/mixin.js'

export default {
  name: 'GlobalHeader',
  components: {
    UserMenu,
    SMenu,
    Logo
  },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },
  data() {
    return {
      headerBarFixed: false,
      //update-begin--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
      topMenuStyle: {
        headerIndexLeft: {},
        topNavHeader: {},
        headerIndexRight: {},
        topSmenuStyle: {}
      },
      date: new Date()
    }
  },
  watch: {
    /** 监听设备变化 */
    device() {
      if (this.mode === 'topmenu') {
        this.buildTopMenuStyle()
      }
    },
    /** 监听导航栏模式变化 */
    mode(newVal) {
      if (newVal === 'topmenu') {
        this.buildTopMenuStyle()
      }
    }
  },
  //update-end--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    //update-begin--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
    if (this.mode === 'topmenu') {
      this.buildTopMenuStyle()
    }
    //显示当前日期时间
    let _this = this// 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date() // 修改数据date
    }, 1000)
    //update-end--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    /**
     * 实时显示时间
     */
    dateFormat(time) {
      var date = new Date(time)
      var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      // 拼接
      return hours + ':' + minutes
    },
    handleScroll() {
      if (this.autoHideHeader) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 100) {
          this.headerBarFixed = true
        } else {
          this.headerBarFixed = false
        }
      } else {
        this.headerBarFixed = false
      }
    },
    toggle() {
      this.$emit('toggle')
    },
    //update-begin--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
    buildTopMenuStyle() {
      if (this.mode === 'topmenu') {
        if (this.device === 'mobile') {
          // 手机端需要清空样式，否则显示会错乱
          this.topMenuStyle.topNavHeader = {}
          this.topMenuStyle.topSmenuStyle = {}
          this.topMenuStyle.headerIndexRight = {}
          this.topMenuStyle.headerIndexLeft = {}
        } else {
          let rightWidth = '360px'
          this.topMenuStyle.topNavHeader = { 'min-width': '165px' }
          this.topMenuStyle.topSmenuStyle = { 'width': 'calc(100% - 165px)' }
          this.topMenuStyle.headerIndexRight = { 'min-width': rightWidth }
          this.topMenuStyle.headerIndexLeft = { 'width': `calc(100% - ${rightWidth})` }
        }
      }
    }
    //update-begin--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
  }
}
</script>

<style lang='less' scoped>
.header-input {
  width: 300px;
  box-shadow: 0px 4px 8px 0px rgba(72, 72, 250, 0.09) !important;
  overflow: hidden;
  border-radius: 7px !important;
}

/deep/ .ant-input {
  border-radius: 7px !important;

}

/* update_begin author:scott date:20190220 for: 缩小首页布局顶部的高度*/

@height: 59px;

.layout {

  .top-nav-header-index {

    .header-index-wide {
      margin-left: 10px;

      .ant-menu.ant-menu-horizontal {
        height: @height;
        line-height: @height;
      }
    }

    .trigger {
      line-height: 64px;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }

  .header {
    z-index: 2;
    color: white;
    height: @height;
    background-color: #f0f2f5;
    transition: background 300ms;
    padding-left: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #333333;
    box-shadow: none !important;
    /* dark 样式 */

    &.dark {
      color: #000000;
      background-color: white !important;
    }
  }

  .header, .top-nav-header-index {
    &.dark .trigger:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
}

.ant-layout-header {
  height: @height;
  line-height: @height;
}

/* update_end author:scott date:20190220 for: 缩小首页布局顶部的高度*/

</style>