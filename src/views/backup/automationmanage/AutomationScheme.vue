<template>
  <div class="all">
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
              <hr class="split-line">
              <a-row :gutter="24" class="row">
                <a-col :span="2">
                  <span class="label">主机类型：</span>
                </a-col>
                <a-col :span="12" style="font-size: 16px">
                  <template v-for="(item, index) in dictHostList">
                    <a-checkable-tag
                      :key="index"
                      :checked="hostList.indexOf(item.value) > -1"
                      @change="checked => handleTagChange('host', item.value, checked)"
                      class="tag"
                    >
                      {{ item.text }}
                    </a-checkable-tag>
                  </template>
                </a-col>
              </a-row>
              <!--  应用  -->
              <hr class="split-line">
              <a-row :gutter="24" class="row">
                <a-col :span="2">
                  <span class="label">应用：</span>
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
              <hr class="split-line">
              <a-row :gutter="24">
                <a-col :span="2">
                  <span class="label">IP：</span>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="" style="margin-bottom: 12px">
                    <a-input-group compact>
                      <a-input style=" width: 200px; text-align: center" placeholder="如：127.0.0.1" />
                      <a-input
                        style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                        placeholder="~"
                        disabled
                      />
                      <a-input style="width: 200px; text-align: center; border-left: 0" placeholder="如：127.0.0.1" />
                    </a-input-group>
                  </a-form-item>
                </a-col>
              </a-row>
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
    <div class="contentArea">
      <!--    客户端显示区域-->
      <div class="blockArea">
        <a-list
          :grid="{ gutter: 24, xxl: 4 }"
          :data-source="data"
          :pagination="pagination"
          @change="listChange"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <template v-if="item.type == 'view'">
              <a-card hoverable>
                <!--              <img-->
                <!--                slot="cover"-->
                <!--                alt="example"-->
                <!--                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"-->
                <!--              />-->
                <template slot="actions" class="ant-card-actions">
                  <span>操作一</span>
                  <span>操作二</span>
                  <!--                <a-icon key="setting" type="setting" />-->
                </template>
                <a-card-meta :title="item.title" >
                  <a-avatar
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                  <div slot="description">
                    <j-ellipsis :value="item.description" :length="20"></j-ellipsis>

                  </div>
                </a-card-meta>
                <br/>
                <a-row>
                  <a-col :span="12"></a-col>
                  <a-col :span="12"></a-col>
                </a-row>
              </a-card>
            </template>
            <template v-else>
              <a-card hoverable style="height: 64px">
                <a-button slot="cover" class="new-btn" type="dashed" style="height: 64px">
                  <a-icon type="plus"/>
                  新增方案
                </a-button>
              </a-card>
            </template>
          </a-list-item>
        </a-list>
      </div>
      <!--  客户端显示区域结束-->
    </div>
  </div>


</template>


<script>
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import JSearchSelectTag from '@/components/dict/JSearchSelectTag'
  const data =  [
    {
      type: 'addBtn',
      title: '新增',
      description: '新增',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },
    {
      type: 'view',
      title: 'XXXXX',
      description: 'XXXXXXXXXXXXXX',
    },

  ]

  export default {
    name: 'AutomationScheme',
    components: { JSearchSelectTag,JEllipsis },
    data() {
      return {
        data: data,
        dictApplicationList:[{text:'数据&应用', value:1},{text:'应用', value:2}, {text:'数据', value:3}, {text:'文件', value:4}],
        applicationList:[],
        dictHostList:[{text:'物理机', value:1},{text:'私有云', value:2},{text:'公有云', value:3}],
        hostList:[],
        dictOsList:[
          {
            text:'X',
            value:'X',
            sonList:[
              {
                parent:'X',
                text:'XXXX',
                value:'XXXX'
              },
              {
                parent:'X',
                text:'XXXX',
                value:'XXXXX'
              }
            ]
          },
          {
            text: 'XX',
            value: 'XX',
            sonList: [
              {
                parent: 'XX',
                text: 'XXXXXXX',
                value: 'XXXXX'
              },
              {
                parent: 'XX',
                text: 'XXXX',
                value: 'XXXXX'
              },
              {
                parent: 'XX',
                text: 'XXXXX',
                value: 'XXXXXX'
              },
              {
                parent: 'XX',
                text: 'XXXXXX',
                value: 'XXXXXX'
              },
            ]
          },
          {
            text: 'XXX',
            value: 'XXX',
            sonList: [
              {
                parent: 'XXX',
                text: 'XXXXXX',
                value: 'XXXX'
              },
              {
                parent: 'XXX',
                text: 'XXXXX',
                value: 'XXXX'
              },
            ]
          },
          {
            text: 'XXXX',
            value: 'XXXX',
            sonList: [
              {
                parent: 'XXXX',
                text: 'XXXXX',
                value: 'XXXXX'
              },
            ]
          }
        ],
        dictOsDetailList:[],
        osList:[],
        osDetailList:[],
        pagination: {
          // pageSizeOptions: ['10', '20', '30', '40', '50'],
          // current: 1,
          pageSize: 12,
          // showTotal: (total, range) => {
          //   return range[0] + "-" + range[1] + " 共" + total + "条"
          // },
        }
      }

    },
    methods: {
      powerOff: function() {
         this.$message.warning('您确认要关机吗？')
      },
      handleClick(){
        console.log("click")
      },
      changeTagList(value,checked,list){
        return checked?[...list,value]:list.filter( d => d !== value )
      },
      handleTagChange(dimension, value, checked) {
        switch (dimension) {
          case "app":
            this.applicationList = this.changeTagList(value, checked, this.applicationList)
            break
          case "host":
            this.hostList = this.changeTagList(value, checked, this.hostList)
            break
          case "os":
            this.osList = this.changeTagList(value, checked, this.osList)
            let item = this.dictOsList.find(i => i.value == value)
            if(checked){
              this.dictOsDetailList = this.dictOsDetailList.concat(item.sonList)
            }else {
              this.dictOsDetailList = this.dictOsDetailList.filter(d => d.parent != item.value)
              this.osDetailList = this.osDetailList.filter(d => (item.sonList.find(i => i.value == d)==null))
            }
            break
          case "osDetail":
            this.osDetailList = this.changeTagList(value, checked, this.osDetailList)
            break
        }
      },
      listChange(){
        this.ipagination1.current = pagination.current
        this.queryTimeoutInfo()
      },
      formatTime(createTime){
        createTime = Math.round(new Date(createTime))/1000
        let mistiming=Math.round(new Date() / 1000)-createTime;
        let unitList = ['year','month','week','day','hour','minute','second'];
        let unitLong = [31536000,2592000,604800,86400,3600,60,1];
        for(let i=6;i>=0;i--){
          let inm = 0
          if(i-1>=0 && mistiming>unitLong[i-1]){
            continue
          }else {
            inm = Math.floor(mistiming/unitLong[i]);
          }
          if(inm==1){
            return inm+' '+unitList[i]+' ago';
          }else {
            return inm+' '+unitList[i]+'s ago';
          }
        }
      },
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