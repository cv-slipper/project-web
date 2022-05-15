<template>
  <div class="page-header-index-wide">
    <!-- 图表区域-begin -->
    <a-row :gutter="24">
      <a-col :span="6">
        <a-card title="DDB/CS状态" :bordered="false" style="width: 100%">
          <d-d-b-radar />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card :bordered="false" style="width: 100%">
          <a-row>
            <storage-space-chart/>
          </a-row>
          <a-row>
            <network-chart/>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card :bordered="false" style="width: 100%">
          <a-row>
            <a-col :span="22"></a-col>
            <a-col :span="2"><span style="font-size: 16px"><a-icon type="sync" /> 刷新</span></a-col>
          </a-row>
          <a-row><cpu-chart/></a-row>
        </a-card>
      </a-col>
    </a-row>
    <!-- 图表区域-end -->

    <br/>
  </div>

</template>

<script>
  import DDBRadar from './DDBRadar'
  import StorageSpaceChart from './StorageSpaceChart'
  import NetworkChart from './NetworkChart'
  import CpuChart from './CpuChart'

  export default {
    name: "WeekCard",
    components: {
      DDBRadar,
      StorageSpaceChart,
      NetworkChart,
      CpuChart,
    },
    data() {
      return {
        indexStyle:1,
        radarData: {}
      }
    },
    created() {

    },
    methods: {

    }
  }
</script>
<style>

</style>