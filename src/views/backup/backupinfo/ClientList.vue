<template>
  <div class="all">
    <div class="headArea">
      <!--  查询区域 开始-->
      <div class="searchArea">
        <a-card :bordered="false">
          <div class="table-page-search-wrapper">
            <a-form layout="inline"  @keyup.enter.native="searchQuery">
              <a-row :gutter="48">
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="备份域">
                    <!--                    <a-input placeholder="请输入备份域" v-model="params.domain"></a-input>-->
                    <a-select placeholder="请输入备份域" :allowClear="true" v-model="params.domain" @change="handleDomainChange">
                      <a-select-option value="prod">生产域</a-select-option>
                      <a-select-option value="branch">分行域</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="客户端组">
                    <a-select placeholder="请选择客户端组" :allowClear="true"  v-model="params.clientGroup">
                      <a-select-option v-for="item in clientGroupList" :key="item.id">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>

                  </a-form-item>
                </a-col>
                <a-col :span="6" :md="6" :sm="24">
                  <a-form-item label="IP">
                    <a-input placeholder="请输入" v-model="params.hostname"/>
                  </a-form-item>
                </a-col>
                <a-col :span="6" :md="6" :sm="24">
                  <a-form-item label="客户端">
                    <a-input placeholder="请输入" v-model="params.clientName"/>
                  </a-form-item>
                </a-col>

<!--                <template v-if="toggleSearchStatus">-->
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="描 述">
                      <a-input placeholder="请输入客户端描述" v-model="params.description"></a-input>
                    </a-form-item>
                  </a-col>
<!--                </template>-->

                <a-col :span="6" :md="6" :sm="24">
                  <span class="table-page-search-submitButtons">
                    <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                    <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
<!--                    <a @click="handleToggleSearch" style="margin-left: 8px">-->
<!--                      {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                      <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
<!--                    </a>-->
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
        <a-list :grid="{ gutter: 30, xxl: 4  }"
                :data-source="data"
                :pagination="pagination"
                :loading="listLoading"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-card class="cardBackground">
              <div class="osimg">
                <template v-if="item.clientName.indexOf('WIN')!= -1">
                  <img src="@/assets/clientpicture/Windows.png"/>
                </template>
                <template v-else-if="item.clientName.indexOf('LINUX')!= -1">
                  <img src="@/assets/clientpicture/Linux.png"/>
                </template>
                <template v-else-if="item.clientName.indexOf('AIX')!= -1">
                  <img src="@/assets/clientpicture/Aix.png"/>
                </template>
                <template v-else>
                  <img src="@/assets/clientpicture/Unix.png"/>
                </template>
              </div>
              <div class="clientName">{{item.clientName}}</div>
              <!--              <div class="status">-->
              <!--                <a-radio :checked="item.status === '在线' ? true : false"></a-radio>-->
              <!--                <span :style="item.status === '在线' ? {color: 'green'} : {color: 'red'}">{{item.status}}</span>-->
              <!--              </div>-->
              <div class="extra">
<!--                <a-dropdown :trigger="['click']">-->
<!--                  <a-icon :style="{width: '20px', height: '20px'}" type="more"/>-->
<!--                  &ndash;&gt;-->
<!--                  <a-menu slot="overlay">-->
<!--                    <a-menu-item key="1" @click="">-->
<!--                      <a-icon type="eye"/>-->
<!--                      详情-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item key="2" @click="">-->
<!--                      <a-icon type="check"/>-->
<!--                      详情-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item key="3" @click="">-->
<!--                      <a-icon type="sync"/>-->
<!--                      详情-->
<!--                    </a-menu-item>-->
<!--                  </a-menu>-->
<!--                </a-dropdown>-->
              </div>
              <div style="align: center"><img style="width: 100%" src="@/assets/clientpicture/line.png"></div>
              <div class="clientInfo">
                <span>IP：<j-ellipsis :value="item.hostname" :length="20"/></span>
                <p>{{item.domain=='prod'?'生产域':'分行域'}}</p>
                <span></span>
                <p></p>
                <!-- 代理 -->
                <a-row>
                  <a-col :span="18">
                    <template>
                      <a-tree
                        :tree-data="item.treeData"
                        @select="selectTreeNode"
                        @click="clickTreeNode(item)"
                      />
                    </template>
                    <a-row>
                      <a-col :span="6">系统:</a-col>
                      <a-col :span="18"><j-ellipsis :value="item.osName"/></a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="6">版本:</a-col>
                      <a-col :span="18"><j-ellipsis :value="item.version?item.version:'null'"/></a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="6">描述:</a-col>
                      <a-col :span="18"><j-ellipsis :value="item.description?item.description:'null'"/></a-col>
                    </a-row>
                  </a-col>
                  <!-- tag标签 -->
                  <a-col :span="6">
                    <template v-for="tag in item.tags.slice(0,5)">
                      <a-row>
                        <a-tag color="orange">{{tag}}</a-tag>
                      </a-row>
                    </template>
                  </a-col>
                </a-row>


              </div>
              <div class="mainContent">

              </div>
              <template slot="actions">
                <span @click="handleCreateTask(item)"><a-icon key="setting" type="plus"/>备份</span>
                <span @click="handleShowList(item)"><a-icon key="list" type="menu-unfold"/>备份历史</span>
                <span @click="handleEdit(item)"><a-icon key="edit" type="edit"/>编辑描述</span>
<!--                <a-icon key="ellipsis" type="reload"/>-->
              </template>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
      <!--  客户端显示区域结束-->
      <create-task-model ref="createTask" />
      <task-list-modal ref="taskList" />
      <cvClient-modal ref="modalForm" @ok="modalFormOk"></cvClient-modal>

    </div>
  </div>


</template>


<script>
  import JSearchSelectTag from '@/components/dict/JSearchSelectTag'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction } from '@/api/manage'
  import CreateTaskModel from './modules/CreateTaskModel'
  import CvClientModal from './modules/CvClientModal'
  import TaskListModal from './modules/TaskListModal'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  export default {
    name: 'ClientList',
    components: {
      JSearchSelectTag,
      CreateTaskModel,
      CvClientModal,
      TaskListModal,
      JEllipsis
    },
    mixins:[ JeecgListMixin ],
    data() {
      return {
        data: [],
        groupList:[],
        groupAssocList:[],
        clientProperties:[],
        agent:[],
        subClient:[],
        selectedSubClient:{},
        selectedClientId: '',
        listLoading:false,
        pagination: {
          // pageSizeOptions: ['10', '20', '30', '40', '50'],
          current: 1,
          pageSize: 12,
          total: 0,
          onChange: (page,pageSize) => this.handlePaginationChange(page, pageSize)
        },
        url:{
          dataList:'/cvClient/list',
          groupList:'/cvClientGroup/dataList',
          groupAssocList:'/cvClientGroupAssociated/dataList',
          clientProperties:'/clientProperties/dataList',
          subClient:'/cvSubclientProperties/allList',
          agent:'/cvAgent/dataList',
        },
        params:{},
        clientGroupList:[],
        firstLoad: true,
      }


    },
    mounted() {
      this.handleDomainChange()
    },
    methods: {
      powerOff: function() {
        this.$message.warning('您确认要关机吗？')
      },
      async loadBaseData() {
        let that = this
        await getAction(this.url.groupAssocList,{}).then((res)=>{
          if(res.success){
            this.groupAssocList = res.result.records
          }else {
            that.$message.warning(res.message)
          }
        })
        await getAction(this.url.groupList,{}).then((res)=>{
          if (res.success){
            this.groupList = res.result.records
          }else {
            that.$message.warning(res.message)
          }
        })
      },
      async loadPropertiesData(){
        let that = this
        await getAction(this.url.clientProperties,that.params).then((res)=>{
          if(res.success){
            this.clientProperties = res.result.records
          }else {
            that.$message.warning(res.message)
          }
        })
        await getAction(this.url.subClient, that.params).then((res)=>{
          if(res.success){
            this.subClient = res.result.records
          }else {
            that.$message.warning(res.message)
          }
        })
      },
      // 加载数据
      async loadData(page) {
        this.listLoading = true
        if(page){
          this.pagination.current = page
        }
        let that = this
        if(this.firstLoad){
          await this.loadBaseData()
          await this.loadPropertiesData()
          this.firstLoad = false
        }else if(Object.keys(that.params).length>2){
          await this.loadPropertiesData()
        }
        // await getAction(this.url.groupAssocList,{}).then((res)=>{
        //   if(res.success){
        //     this.groupAssocList = res.result.records
        //   }else {
        //     that.$message.warning(res.message)
        //   }
        // })
        // await getAction(this.url.groupList,{}).then((res)=>{
        //   if (res.success){
        //     this.groupList = res.result.records
        //   }else {
        //     that.$message.warning(res.message)
        //   }
        // })
        // await getAction(this.url.clientProperties,that.params).then((res)=>{
        //   if(res.success){
        //     this.clientProperties = res.result.records
        //   }else {
        //     that.$message.warning(res.message)
        //   }
        // })
        // await getAction(this.url.subClient, that.params).then((res)=>{
        //   if(res.success){
        //     this.subClient = res.result.records
        //   }else {
        //     that.$message.warning(res.message)
        //   }
        // })
        let params = that.params
        params.pageNo = this.pagination.current
        params.pageSize = this.pagination.pageSize
        await getAction(this.url.dataList,params).then((res)=>{
          if (res.success){
            let result = res.result.records
            this.pagination.total = res.result.total
            console.log('result',params,result)
            for (let item of result){
              let groupAssocs = this.groupAssocList.filter(d => d.clientId == item.clientId)
              let tags = []
              let tagsId = []
              item.agents = []
              // 从客户端组关联中拼出客户端组标签
              if(groupAssocs.length>0){
                for(let groupAssoc of groupAssocs){
                  for(let group of this.groupList){
                    if(groupAssoc.clientGroupId == group.groupId){
                      tags.push(group.name)
                      tagsId.push(group.id)
                    }
                  }
                }
              }
              // 从客户端明细中拼出客户端详细属性
              for(let properties of this.clientProperties){
                if(item.clientId == properties.clientId && item.domain == properties.domain){
                  let client = JSON.parse(properties.client)
                  let clientReadiness = JSON.parse(properties.clientReadiness)
                  item.status = clientReadiness.DRStatus == 'Ready.'? '在线':'离线'
                  item.osName = client.osInfo.OsDisplayInfo.OSName
                  item.version = client.versionInfo.version
                }
              }
              let treeData = []
              // 从子客户端明细中拼出子客户端树数据结构
              for(let subClient of this.subClient){
                if(item.clientId == subClient.clientId && item.domain == subClient.domain){
                  let subClientEntity = JSON.parse(subClient.subClientEntity)
                  if(subClientEntity.subclientName == '(command line)' ){
                    continue
                  }
                  let parentNode = {}
                  parentNode.title = subClientEntity.appName
                  parentNode.key = subClientEntity.applicationId + '/%P'
                  parentNode.children = []
                  let childrenNode = {}
                  childrenNode.title = subClientEntity.subclientName
                  childrenNode.key = subClientEntity.subclientId
                  let checkCode = this.checkNode(treeData,parentNode)
                  if(checkCode!=-1){
                    treeData[checkCode].children.push(childrenNode)
                  }else {
                    parentNode.children.push(childrenNode)
                    treeData.push(parentNode)
                  }
                }
              }

              item.treeData = [{title:"agent",key:"",children:treeData}]
              item.tags = tags
              item.tagsId = tagsId
            }
            console.log(result)
            // 客户端组筛选
            this.data = result
            if(this.params.clientGroup!=undefined){
              this.data = result.filter(item => item.tagsId.includes(this.params.clientGroup))
            }else {
              this.data = result
            }
          }else {
            that.$message.warning(res.message)
          }
        })
        this.listLoading = false
      },
      searchReset(){
        this.params = {}
        this.loadData(1)
      },
      checkNode(treeData,node){
        if(treeData.length==0){
          return -1
        }else {
          treeData.find((item)=>{
            if(item.key == node.key){
              return item.index
            }
          })
          for(let i=0;i<treeData.length;i++){
            if(treeData[i].key == node.key){
              return i
            }
          }
        }
        return -1
      },
      selectTreeNode(selectedKeys,e){
        this.selectedSubClient = {}
        let {selected,selectedNodes} = e
        if(selected){
          let [{data}] = selectedNodes
          this.selectedSubClient = {subClientId:data.key,subClientName:data.props.title}
        }
      },
      clickTreeNode(item){
        this.selectedClientId= item.clientId
      },
      handleCreateTask(item){
        if(item.clientId!=this.selectedClientId){
          this.$message.warning("请选择正确的客户端执行")
          return
        }
        this.$refs.createTask.create(item,this.selectedSubClient)
      },
      handleShowList(item){
        this.$refs.taskList.show(item)
      },
      handleDomainChange(value){
        delete this.params.clientGroup
        let params = {}
        if(value != null || value != 'undefined'){
          params.domain = value
        }
        getAction(this.url.groupList, params).then((res)=>{
          if (res.success){
            this.clientGroupList = res.result.records
          }else {
            that.$message.warning(res.message)
          }
        })
      },
      handlePaginationChange(page, pageSize){
        if(page && pageSize){
          console.log('handlePaginationChange',page,pageSize)
          this.pagination.current = page
          this.pagination.pageSize = pageSize
          this.loadData()
        }
      }

    }
  }
</script>

<style scoped>
  .contentArea {
    background: rgb(240, 242, 245);
    padding-top: 10px;
  }

  .blockArea {
    margin-top: 10px;
  }

  .clientName {
    display: inline-block;
    position: absolute;
    font-weight: bold;
    top: 5px;
    padding-left: 15px;

  }

  .cardBackground {
    box-shadow: 1px 5px 3px rgba(0, 12, 23, 0.43);
    transform: translateX(20);
  }

  .osimg {
    display: inline-block;
    position: absolute;
    top: 5px;
    left: 10px;
    padding-right: 10px;
  }

  .osimg > img {
    width: 25px;
    height: 25px;
  }

  .status {
    position: absolute;
    top: 5px;
    right: 20%;

  }

  .extra {
    top: 5px;
    right: 5%;
    position: absolute;
  }
  .clientInfo{
    height: 5rem;
  }

  .clientInfo > span {
    margin-top: 15px;
  }

  .clientInfo > p {
    display: inline-block;
    margin-left: 30%;
    margin-bottom: 0px;
    float: right
  }
</style>