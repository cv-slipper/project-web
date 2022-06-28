import { USER_INFO } from '@/store/mutation-types'
import Vue from 'vue'

export const determineUserMinxin = {
  data() {
    return {
      zoom: 0
    }
  },
  mounted() {
    this.zoom = this.getZoom()
    window.addEventListener('resize', () => {
      this.zoom = 1 / document.body.style.zoom
    })
  },
  methods: {
    getUserRole() {
      let isNormal = null
      let roleCode = Vue.ls.get('RoleCode')
      if ((roleCode).length > 0) {
        isNormal = roleCode.indexOf('normal') == -1 ? false : true
      } else {
        isNormal = true
      }
      return isNormal
    },
    getZoom() {
      let zoom = (1 / document.body.style.zoom)
      return zoom
    }
  }
}