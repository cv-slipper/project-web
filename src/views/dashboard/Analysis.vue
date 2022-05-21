<template>
  <div>
    <!--    <main-map></main-map>-->
    <!--  头部  -->
    <a-row>
      <head-card @domainChange='handleDomainChange' :domain='domain' />
    </a-row>
    <br />
    <!--  作业  -->
    <a-row>
      <a-col :span='22' :offset='1' style='background-color: white!important;'>
        <week-card :domain='domain' />
      </a-col>
    </a-row>
    <br />
    <!--  当前活动作业  -->
    <a-row>
      <a-col :span='22' :offset='1' style='background-color: white!important;'>
        <current-work :domain='domain' />
      </a-col>
    </a-row>
    <br />
  </div>

</template>

<script>
import HeadCard from './HeadCard'
import WeekCard from './WeekCard'
import CurrentWork from './CurrentWork'
import MainMap from '@views/dashboard/components/MainMap'

export default {
  name: 'Analysis',
  components: {
    HeadCard,
    WeekCard,
    CurrentWork,
    MainMap
  },
  data() {
    return {
      indexStyle: 1,
      domain: 'prod'
    }
  },
  created() {

  },
  methods: {
    handleDomainChange(domain) {
      this.domain = domain
    }

  }
}
</script>