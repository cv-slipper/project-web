<template>
  <a-locale-provider :locale='locale'>
    <div id='app' ref='app'>
      <router-view />
    </div>
  </a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enquireScreen from '@/utils/device'

export default {
  data() {
    return {
      locale: zhCN
    }
  },
  created() {
    let that = this
    enquireScreen(deviceType => {
      // tablet
      if (deviceType === 0) {
        that.$store.commit('TOGGLE_DEVICE', 'mobile')
        that.$store.dispatch('setSidebar', false)
      }
      // mobile
      else if (deviceType === 1) {
        that.$store.commit('TOGGLE_DEVICE', 'mobile')
        that.$store.dispatch('setSidebar', false)
      } else {
        that.$store.commit('TOGGLE_DEVICE', 'desktop')
        that.$store.dispatch('setSidebar', true)
      }

    })
  },
  mounted() {
    this.refreshScale()
    window.addEventListener('resize', () => {
      this.refreshScale()
    })
  },
  methods: {
    refreshScale() {
      var devicewidth = document.documentElement.clientWidth//获取当前分辨率下的可是区域宽度
      var scale = devicewidth / 1920 // 分母——设计稿的尺寸
      document.body.style.zoom = scale//放大缩小相应倍数
    }

  }
}
</script>
<style>
body, html {
  height: 100%;
}

@import './assets/less/common.less';

#app {
  height: 100%;
}

section {
  height: 100%
}


</style>