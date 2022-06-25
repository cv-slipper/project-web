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

    this.detectZoom()
  },
  methods: {
    detectZoom() {
      var ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase()

      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio
      } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI
        }
      } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth
      }
      if (ratio != 2) {
        this.$refs.app.style.transform = 'scale(' + (1 - (ratio - 1)) + ')'
      }

      return ratio
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