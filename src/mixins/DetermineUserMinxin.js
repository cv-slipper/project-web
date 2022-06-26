import { USER_INFO } from '@/store/mutation-types'
import Vue from 'vue'

export const determineUserMinxin = {
  data() {
    return {}
  },
  methods: {
    getUserRole() {
      let isNormal = null
      let userInfo = Vue.ls.get(USER_INFO)
      if (Object.keys(userInfo).length > 0) {
        let roleCode = userInfo.roleCode || []
        isNormal = roleCode.indexOf('normal') == -1 ? false : true
      } else {
        isNormal = true
      }
      return isNormal
    },
    getZoom() {
      return (1 / document.body.style.zoom)
    }
  }
}