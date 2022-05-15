<template>
  <div>

    <div class="headArea">
      <!--  查询区域 开始-->
      <div class="searchArea">
        <a-card :bordered="false">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="24" :class="dictOsDetailList.length>0?'big-row':'row'">
                <a-col :span="2">
                  <span class="label">操作系统：</span>
                </a-col>
                <a-col :span="12" style="font-size: 16px">
                  <template v-for="(item, index) in dictOsList">
                    <a-checkable-tag
                      :key="index"
                      :checked="osList.indexOf(item.value) > -1"
                      @change="checked => handleTagChange('os', item.value, checked)"
                      class="tag"
                    >
                      {{ item.text }}
                    </a-checkable-tag>
                  </template>
                </a-col>
              </a-row>
              <a-row :gutter="24" :class="dictOsDetailList.length>0?'row':''">
                <a-col :span="12" :offset="2" style="font-size: 16px">
                  <template v-for="(item, index) in dictOsDetailList">
                    <a-checkable-tag
                      :key="index"
                      :checked="osDetailList.indexOf(item.value) > -1"
                      @change="checked => handleTagChange('osDetail', item.value, checked)"
                      class="tag"
                    >
                      {{ item.text }}
                    </a-checkable-tag>
                  </template>
                </a-col>
              </a-row>
              <!--  主机类型  -->

              <!--  应用  -->
              <hr class="split-line">
              <a-row :gutter="24" class="row">
                <a-col :span="2">
                  <span class="label">备份域：</span>
                </a-col>
                <a-col :span="12" style="font-size: 16px">
                  <template v-for="(item, index) in dictApplicationList">
                    <a-checkable-tag
                      :key="index"
                      :checked="applicationList.indexOf(item.value) > -1"
                      @change="checked => handleTagChange('app', item.value, checked)"
                      class="tag"
                    >
                      {{ item.text }}
                    </a-checkable-tag>
                  </template>
                </a-col>
              </a-row>
              <!--  IP  -->
              <!--  关键字  -->
              <hr class="split-line">
              <a-row :gutter="24">
                <a-col :span="2">
                  <span class="label">关键字：</span>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="">
                    <a-input></a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <span class="table-page-search-submitButtons">
                    <a-button type="primary">查询</a-button>
                    <a-button style="margin-left: 8px">重置</a-button>
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-card>
      </div>
      <!--    查询区域结束-->
    </div>
    <div style="height: 10px;padding: 5px; background: rgb(240,242,245);"></div>
    <bk-trend-echarts></bk-trend-echarts>
    <div style="height: 10px;padding: 5px; background: rgb(240,242,245);"></div>
    <ma-trend-echarts></ma-trend-echarts>
    <div style="height: 10px;padding: 5px; background: rgb(240,242,245);"></div>
    <task-qty></task-qty>
  </div>

</template>



<script>
  import JSearchSelectTag from '@/components/dict/JSearchSelectTag'
  import BkTrendEcharts from './BkTrendEcharts'
  import MaTrendEcharts from './MaTrendEcharts'
  import TaskQty from './TaskQty'


  export default {
    name: 'TrendPredictionList',
    components: {
      JSearchSelectTag,
      BkTrendEcharts,
      MaTrendEcharts,
      TaskQty
    },
    data() {
      return {
        // data: data,
        dictApplicationList: [{ text: 'xxxx', value: 1 }, { text: 'xxxx', value: 2 }],
        applicationList: [],
        dictHostList: [{ text: '物理机', value: 1 }, { text: '私有云', value: 2 }, { text: '公有云', value: 3 }],
        hostList: [],
        dictOsList: [
          {
            text: 'Win',
            value: 'Win',
            sonList: [
              {
                parent: 'Win',
                text: '2008 R5',
                value: '2008 R5'
              },
              {
                parent: 'Win',
                text: 'Win 2016',
                value: 'Win 2016'
              }
            ]
          },
          {
            text: 'Linux',
            value: 'Linux',
            sonList: [
              {
                parent: 'Linux',
                text: 'Red Hat',
                value: 'Red Hat'
              },
              {
                parent: 'Linux',
                text: 'Ubuntu',
                value: 'Ubuntu'
              },
              {
                parent: 'Linux',
                text: 'SuSE',
                value: 'SuSE'
              },
              {
                parent: 'Linux',
                text: 'Gentoo',
                value: 'Gentoo'
              },
            ]
          },
          {
            text: 'AIX',
            value: 'AIX',
            sonList: [
              {
                parent: 'AIX',
                text: 'AIX 6.1',
                value: 'AIX 6.1'
              },
              {
                parent: 'AIX',
                text: 'AIX 5.3',
                value: 'AIX 5.3'
              },
            ]
          },
          {
            text: 'Unix',
            value: 'Unix',
            sonList: [
              {
                parent: 'Unix',
                text: 'SCO UNIX',
                value: 'SCO UNIX'
              },
            ]
          }
        ],
        dictOsDetailList: [],
        osList: [],
        osDetailList: [],
        pagination: {
          // pageSizeOptions: ['10', '20', '30', '40', '50'],
          // current: 1,
          pageSize: 12,
          // showTotal: (total, range) => {
          //   return range[0] + "-" + range[1] + " 共" + total + "条"
          // },
        }
      }
    }
  }

</script>

<style scoped>
  .label{
    display: block;
    width: 100%;
    text-align: right;
    font-size: 16px;
    font-weight: bold
  }
  .tag{
    font-size: 15px;
  }
  .big-row{
    margin-bottom: 24px;
  }
  .row{
    margin-bottom: 12px;
  }
  .split-line{
    margin-bottom: 12px;
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  .contentArea {
    background: rgb(240,242,245);
    padding-top: 10px;
  }
  .blockArea {
    margin-top: 10px;
  }
</style>