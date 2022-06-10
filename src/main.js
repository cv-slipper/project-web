import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import router from './router'
import store from './store/'

import { VueAxios } from '@/utils/request'

import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import 'ant-design-vue/dist/antd.less'  // or 'ant-design-vue/dist/antd.less'

import '@/permission' // permission control
import '@/utils/filter' // base filter
import Print from 'vue-print-nb-jeecg'

import VueAMap from 'vue-amap'

/*import '@babel/polyfill'*/
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

import {
  ACCESS_TOKEN,
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR_WEAK,
  SIDEBAR_TYPE,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_PAGE
} from '@/store/mutation-types'
import config from '@/defaultSettings'

import JDictSelectTag from './components/dict/index.js'
import hasPermission from '@/utils/hasPermission'
import DynamicForm from '@/components/online/autoform/index'
import vueBus from '@/utils/vueBus'
import JeecgComponents from '@/components/jeecg/index'
import '@/assets/less/JAreaLinkage.less'
import VueAreaLinkage from 'vue-area-linkage'


Vue.config.productionTip = false
Vue.use(Storage, config.storageOptions)
Vue.use(Antd)
Vue.use(VueAxios, router)
Vue.use(Viser)
Vue.use(DynamicForm)
Vue.use(hasPermission)
Vue.use(JDictSelectTag)
Vue.use(Print)
Vue.use(preview)
Vue.use(vueBus)
Vue.use(JeecgComponents)
Vue.use(VueAreaLinkage)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  // 高德key
  key: 'f5ada6176c6a7f1a9ae57985b2f9e1a1', // 自己到官网申请，我随便写的
  // 插件集合 （插件按需引入）
  v: '1.4.15', // 我也不知道为什么要写这个，不写项目会报错，而且我随便写的，跟我下载的版本对应不了
  uiVersion: '1.0.11' // ui版本号，也是需要写，不配置不加载,

})
new Vue({
  router,
  store,
  mounted() {
    store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true))
    store.commit('TOGGLE_THEME', Vue.ls.get(DEFAULT_THEME, config.navTheme))
    store.commit('TOGGLE_LAYOUT_MODE', Vue.ls.get(DEFAULT_LAYOUT_MODE, config.layout))
    store.commit('TOGGLE_FIXED_HEADER', Vue.ls.get(DEFAULT_FIXED_HEADER, config.fixedHeader))
    store.commit('TOGGLE_FIXED_SIDERBAR', Vue.ls.get(DEFAULT_FIXED_SIDEMENU, config.fixSiderbar))
    store.commit('TOGGLE_CONTENT_WIDTH', Vue.ls.get(DEFAULT_CONTENT_WIDTH_TYPE, config.contentWidth))
    store.commit('TOGGLE_FIXED_HEADER_HIDDEN', Vue.ls.get(DEFAULT_FIXED_HEADER_HIDDEN, config.autoHideHeader))
    store.commit('TOGGLE_WEAK', Vue.ls.get(DEFAULT_COLOR_WEAK, config.colorWeak))
    store.commit('TOGGLE_COLOR', Vue.ls.get(DEFAULT_COLOR, config.primaryColor))
    store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
    store.commit('SET_MULTI_PAGE', Vue.ls.get(DEFAULT_MULTI_PAGE, config.multipage))
  },
  render: h => h(App)
}).$mount('#app')
