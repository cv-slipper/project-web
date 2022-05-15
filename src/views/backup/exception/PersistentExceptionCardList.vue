<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div class="space" v-if="toggleSearchStatus">
        <a-row :gutter="24" class="tag-line">
          <span class="tag-title">备 份 域：</span>
          <template v-for="(item, index) in dictBkField">
            <a-checkable-tag
              :key="index"
              :checked="tagsBkField.indexOf(item.value) > -1"
              @change="checked => handleTagChange(item.value, checked, '2')"
              class="tag"
            >
              {{ item.text }}
            </a-checkable-tag>
          </template>
        </a-row>
        <hr style="height:1px;border:none;border-top:1px solid #e9e9e9;"/>
        <a-row :gutter="24" class="tag-line">
          <span class="tag-title">异常种类：</span>
          <a-radio-group default-value="a" button-style="solid" v-model="displayLevel" @change="onLevelChange">
            <a-radio-button size="small" value="a">
              作业连续失败2天以上
            </a-radio-button>
            <a-radio-button size="small" value="b">
              作业一周失败3次以上
            </a-radio-button>
            <a-radio-button size="small" value="c">
              资源不足2天以上
            </a-radio-button>
            <a-radio-button size="small" value="d">
              备份资源脱机
            </a-radio-button>
            <!--        <a-radio-button size="small" value="e">-->
            <!--          客户端脱机2天以上-->
            <!--        </a-radio-button>-->
            <a-radio-button size="small" value="e">
              重复事件2天以上
            </a-radio-button>
            <a-radio-button size="small" value="f">
              备份耗时过久
            </a-radio-button>

          </a-radio-group>
        </a-row>

      </div>

      <p></p>
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24" class="tag-line">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="查询">
              <a-input placeholder="请输入查询信息" v-model="keyWord"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
<!--            <a @click="handleToggleSearch" style="margin-left: 15px">-->
<!--            {{ toggleSearchStatus ? '收起筛选' : '展开筛选' }}-->
<!--            <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
<!--          </a>-->
          </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-card :bordered="false">
      <template v-if="['a','b','f'].includes(displayLevel)">
        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          class="j-table-force-nowrap"
          :scroll="{x:'max-content'}"
          :columns="continuedJobColumns"
          :dataSource="continuedJobDataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">

          <template slot="endTime" slot-scope="text">
            <span>{{text=='1970-01-01 00:00:00'?'':text}}</span>
          </template>
          <template slot="duration" slot-scope="text">
            <span>{{formatTime(text)}}</span>
          </template>
          <template slot="programSize" slot-scope="text">
            <span>{{`${(text/1024/1024).toFixed(2)}G`}}</span>
          </template>
          <span slot="details" slot-scope="text">
            <j-ellipsis :value="text" :length="90"/>
          </span>
          <span slot="action" slot-scope="text, record">
            <a @click="showDetail(record)">详情</a>
            <a-divider type="vertical" />
            <a-popconfirm placement="topLeft" ok-text="确认" cancel-text="取消" @confirm="confirmHandle(record)"
                          style="width: 300rem">
              <a-icon slot="icon" type="question-circle-o" style="color: red"/>
              <template slot="title">
                <a-form layout="vertical" style="width: 30rem;height: 8rem">
                  <a-form-item label="处理原因:">
                    <a-textarea placeholder="请输入处理原因" v-model="handleReason" :rows="4"
                                :auto-size="{minRows:4,maxRows:4}"></a-textarea>
                  </a-form-item>
                </a-form>
              </template>
              <a>处理</a>
            </a-popconfirm>
          </span>
        </a-table>
      </template>

      <template v-if="displayLevel=='c'">
        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          class="j-table-force-nowrap"
          :scroll="{x:'max-content'}"
          :columns="shortageColumns"
          :dataSource="shortageDataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">

          <span slot="details" slot-scope="text">
            <j-ellipsis :value="text" :length="90"/>
          </span>
          <span slot="action" slot-scope="text, record">
            <a-popconfirm placement="topLeft" ok-text="确认" cancel-text="取消" @confirm="confirmHandle(record)"
                          style="width: 300rem">
              <a-icon slot="icon" type="question-circle-o" style="color: red"/>
              <template slot="title">
                <a-form layout="vertical" style="width: 30rem;height: 8rem">
                  <a-form-item label="处理原因:">
                    <a-textarea placeholder="请输入处理原因" v-model="handleReason" :rows="4"
                                :auto-size="{minRows:4,maxRows:4}"></a-textarea>
                  </a-form-item>
                </a-form>
              </template>
              <a>处理</a>
            </a-popconfirm>
          </span>
        </a-table>
      </template>

      <template v-if="displayLevel=='d'">
        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          class="j-table-force-nowrap"
          :scroll="{x:'max-content'}"
          :columns="resourceOfflineColumns"
          :dataSource="resourceOfflineDataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">

          <span slot="details" slot-scope="text">
            <j-ellipsis :value="text" :length="90"/>
          </span>
          <span slot="action" slot-scope="text, record">
            <a-popconfirm placement="topLeft" ok-text="确认" cancel-text="取消" @confirm="confirmHandle(record)"
                          style="width: 300rem">
              <a-icon slot="icon" type="question-circle-o" style="color: red"/>
              <template slot="title">
                <a-form layout="vertical" style="width: 30rem;height: 8rem">
                  <a-form-item label="处理原因:">
                    <a-textarea placeholder="请输入处理原因" v-model="handleReason" :rows="4"
                                :auto-size="{minRows:4,maxRows:4}"></a-textarea>
                  </a-form-item>
                </a-form>
              </template>
              <a>处理</a>
            </a-popconfirm>
            <!--          <a @click="handleRepeatEvent2(record)">处理</a>-->
            <!--          <a-divider type="vertical"/>-->
          </span>
        </a-table>
      </template>

      <template v-if="displayLevel=='e'">
        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          class="j-table-force-nowrap"
          :scroll="{x:'max-content'}"
          :columns="repeatEvent2Columns"
          :dataSource="repeatEvent2DataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">

          <span slot="details" slot-scope="text">
            <j-ellipsis :value="text" :length="90"/>
          </span>
          <span slot="action" slot-scope="text, record">
            <a-popconfirm placement="topLeft" ok-text="确认" cancel-text="取消" @confirm="confirmHandle(record)"
                          style="width: 300rem">
              <a-icon slot="icon" type="question-circle-o" style="color: red"/>
              <template slot="title">
                <a-form layout="vertical" style="width: 30rem;height: 8rem">
                  <a-form-item label="处理原因:">
                    <a-textarea placeholder="请输入处理原因" v-model="handleReason" :rows="4"
                                :auto-size="{minRows:4,maxRows:4}"></a-textarea>
                  </a-form-item>
                </a-form>
              </template>
              <a>处理</a>
            </a-popconfirm>
          </span>
        </a-table>
      </template>


    </a-card>
    <!-- 详情 -->
    <detail-modal ref="detail"/>
    <!--    <jpaiProduct-modal ref="modalForm"></jpaiProduct-modal>-->

  </a-card>
</template>

<script>
  import DetailModal from './modules/DetailModal'
  import '@/assets/less/TableExpand.less'
  import {
    resourceOfflineColumns,
    repeatEvent2Columns,
    shortageColumns,
    continuedJobColumns
  } from './PersistentExceptionCardList'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import Trend from '@/components/Trend'
  import { initDictOptions } from '@/components/dict/JDictSelectUtil'
  import { getAction, httpAction } from '@/api/manage'

  export default {
    name: 'PersistentExceptionCardList',
    mixins: [JeecgListMixin],
    components: {
      DetailModal,
      JEllipsis,
      Trend
    },
    data() {
      return {
        /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
        queryParam: {},
        /* 数据源 */
        dataSource: [],
        /* 分页参数 */
        ipagination: {
          current: 1,
          pageSize: 10
        },
        /* 排序参数 */
        isorter: {
          column: 'createTime',
          order: 'desc'
        },
        /* 筛选参数 */
        filters: {},
        /* table加载状态 */
        loading: false,
        handleReason: '',
        displayLevel: 'a',
        shortageColumns: shortageColumns,
        resourceOfflineColumns:resourceOfflineColumns,
        repeatEvent2Columns: repeatEvent2Columns,
        repeatEvent2DataSource: [],
        shortageDataSource: [],
        resourceOfflineDataSource: [],
        continuedJobColumns:continuedJobColumns,
        continuedJobDataSource:[],
        url: {
          list: '/product/jpaiProduct/displayList?column=itemNoDisplay&order=asc',
          repeatEvent2DataSource: '/cvEventContinuedException/dataList',
          handleRepeatEvent2: '/cvEventContinuedException/handled',
          shortageDataSource: '/cvContinuedResourceShortage/dataList',
          handleShortage: '/cvContinuedResourceShortage/handled',
          resourceOfflineDataSource: '/cvContinuedOfflineLibrary/dataList',
          handleResourceOffline: '/cvContinuedOfflineLibrary/handled',
          continuedJobDataSource: '/cvContinuedJob/dataList',
          handleContinuedJobData: '/cvContinuedJob/handled',
          addProcess: '/processhistory/handle'
        },
        toggleSearchStatus: true,
        dictBkField: [],  //备份域列表
        tagsBkField: [],
        keyWord: ''
      }
    },
    created() {
      // this.loadData();
      this.initDictConfig()
    },
    methods: {
      calcValue(val1, val2) {
        return val1 - val2
      },
      initDictConfig() {

        // 备份域
        initDictOptions('domain').then((res) => {
          if (res.success) {
            this.dictBkField = res.result
          }
        })

      },
      checkTags(tag, checked, tags) {
        const nextSelectedTags = checked
          ? [...tags, tag]
          : tags.filter(t => t !== tag)
        return nextSelectedTags
      },
      // 筛选条件变更（备份域）
      handleTagChange(tag, checked, num) {
        switch (num) {
          // case '1':
          //   this.tagsSystemType = this.checkTags(tag, checked, this.tagsSystemType);
          //   break;
          case '2':
            this.tagsBkField = this.checkTags(tag, checked, this.tagsBkField)
            break
          default:
            console.log('error!')
        }
        this.loadData()
      },
      filterDataSource() {
        let keyWord = this.keyWord
        let reg = new RegExp(keyWord)
        this.data = this.data.filter(d => (this.tagsBkField.length > 0 ? this.tagsBkField.includes(d.domain) : true)
          && (keyWord != '' && d.reasonTitle ? (d.reasonTitle.match(reg)) : true))
        this.offlineData1 = this.offlineData1.filter(d => (this.tagsBkField.length > 0 ? this.tagsBkField.includes(d.domain) : true)
          && (keyWord != '' && d.reasonTitle ? (d.reasonTitle.match(reg)) : true))
        this.offlineData2 = this.offlineData2.filter(d => (this.tagsBkField.length > 0 ? this.tagsBkField.includes(d.domain) : true)
          && (keyWord != '' && d.reasonTitle ? (d.reasonTitle.match(reg)) : true))
      },
      loadData(arg) {
        this.onClearSelected()
        let params = this.tagsBkField.length === 1 ? { domain: this.tagsBkField[0] } : {}
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        switch (this.displayLevel) {
          // 作业连续失败2天以上
          case 'a':
            params.handled = '0'
            params.errorType = '2'
            params.client = this.keyWord
            getAction(this.url.continuedJobDataSource,params).then((res)=>{
              if(res.success){
                console.log(res)
                this.continuedJobDataSource = res.result.records
              }
            })
            break
          // 作业一周失败3次以上
          case 'b':
            params.handled = '0'
            params.errorType = '3'
            params.client = this.keyWord
            getAction(this.url.continuedJobDataSource,params).then((res)=>{
              if(res.success){
                this.continuedJobDataSource = res.result.records
              }
            })
            break
          // 资源不足2天以上
          case 'c':
            params.handled = '0'
            params.library = this.keyWord
            getAction(this.url.shortageDataSource,params).then((res)=>{
              if(res.success){
                this.shortageDataSource = res.result.records
              }
            })
            break
          // 备份资源脱机2天以上
          case 'd':
            params.handled = '0'
            params.library = this.keyWord
            getAction(this.url.resourceOfflineDataSource,params).then((res)=>{
              if(res.success){
                this.resourceOfflineDataSource = res.result.records
              }
            })
            break
          // 重复事件2天以上
          case 'e':
            params.handled = '0'
            getAction(this.url.repeatEvent2DataSource, params).then((res) => {
              if (res.success) {
                this.repeatEvent2DataSource = res.result.records
              }
            })
            break
          // 备份耗时过久
          case 'f':
            params.handled = '0'
            params.errorType = 'tooLong'
            params.client = this.keyWord
            getAction(this.url.continuedJobDataSource,params).then((res)=>{
              if(res.success){
                this.continuedJobDataSource = res.result.records
              }
            })
            break
        }
        // this.filterDataSource()
      },
      // 页签切换
      onLevelChange() {
        this.loadData()
      },
      getQueryParams() {
        //获取查询条件
        let sqp = {}
        // this.queryParam.productType_MultiString = this.tagsProductType.toString()

        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        return filterObj(param)
      },
      getQueryField() {
        var str = 'id,'
        this.columns.forEach(function(value) {
          str += ',' + value.dataIndex
        })
        return str
      },
      // 执行查询
      searchQuery() {
        this.loadData(1)
      },
      // 查询条件重置
      searchReset() {
        this.tagsBkField = []
        this.keyWord = ''
        // this.queryParam = {}
        this.loadData(1)
      },
      handlePageChange(current) {
        this.ipagination.current = current
        this.loadData()
      },
      onShowSizeChange(current, pageSize) {
        this.ipagination.current = current
        this.ipagination.pageSize = pageSize
        this.loadData()
      },
      handleToggleSearch() {
        this.toggleSearchStatus = !this.toggleSearchStatus
      },
      // 确认处理
      confirmHandle(record) {
        // let ids = this.selectedRowKeys.join(",")
        this.handleRepeatEvent(record)
      },
      // 执行处理
      handleRepeatEvent(record) {
        let content = ""
        let url = ""
        let params = { ids: record.id }
        switch (this.displayLevel) {
          case 'a':
            content = `持续异常/作业连续失败2天以上------处理作业: ${record.domain}-${record.workId}`
            url = this.url.handleContinuedJobData
            break
          case 'b':
            content = `持续异常/作业一周失败3次以上------处理作业: ${record.domain}-${record.workId}`
            url = this.url.handleContinuedJobData
            break
          case 'c':
            content = `持续异常/资源不足2天以上------处理资源不足: ${record.domain}-${record.scratchPool}`
            url = this.url.handleShortage
            break
          case 'd':
            content = `持续异常/资源脱机2天以上------处理资源脱机: ${record.domain}-${record.library}/${record.driver}`
            url = this.url.handleResourceOffline
            break
          case 'e':
            content = `持续异常/重复事件2天以上------处理事件: ${record.domain}-${record.eventCode}`
            url = this.url.handleRepeatEvent2
            break
          case 'f':
            content = `持续异常/备份耗时过久------处理作业: ${record.domain}-${record.workId}`
            url = this.url.handleContinuedJobData
            break
        }
        getAction(url, params).then((res) => {
          if (res.success) {
            this.createHandleRecord(content)
          }
        })
      },
      // 写入到记录
      createHandleRecord(content) {
        let that = this
        httpAction(this.url.addProcess, { content: content, reason: this.handleReason }, 'post').then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.$emit('ok')
            that.handleReason = ''
            this.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
      // 查看作业详情
      showDetail(record){
        this.$refs.detail.showDetail(record)
      },
      formatTime(time) {
        let hours = Math.floor((time) / 3600000); //时
        let minutes = Math.floor((time % 3600000) / 60000); //分
        let seconds = Math.floor((time % 60000) / 1000); //秒
        return  `${hours>10?hours:`0${hours}`}:${minutes>10?minutes:`0${minutes}`}:${seconds>10?seconds:`0${seconds}`}`;
      },

    }
  }
</script>

<style lang="less" scoped>

  .ant-card-actions {
    background: #f7f9fa;
    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;
      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }
      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
  .tag-title {
    margin-left: 10px;
    white-space: pre;
    font-weight: bold;
  }
  .tag-line {
    padding: 0px;
  }
  .tag {
    font-size: 15px;
  }
  .space {
    font-size: 15px;
    font-family: Consolas;
    border: 2px solid #e9e9e9;
    padding: 8px;
  }
  .description {
    position: relative;
  }
  .ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }
  .list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span {
      line-height: 20px;
    }
    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }

</style>
