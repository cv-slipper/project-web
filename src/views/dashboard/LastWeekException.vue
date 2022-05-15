<template>
  <a-table
    rowKey="id"
    size="middle"
    :loading="loading"
    :columns="columns"
    :dataSource="dataSource"
    :pagination="false">

    <template slot="type" slot-scope="text">
          <svg v-if="text=='错误'" t="1631494471802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2414" width="10" height="10"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" p-id="2415" fill="#ff0000"></path></svg>
          <svg v-else t="1631494471802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2414" width="10" height="10"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" p-id="2415" fill="#F88BB6"></path></svg>
          <span >{{text}}</span>

<!--      <svg t="1631494371812" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2277" width="10" height="10"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" p-id="2278" data-spm-anchor-id="a313x.7781069.0.i0" class="selected"></path></svg>-->

    </template>
    <span slot="client" slot-scope="text">
      <j-ellipsis :value="text" :length="25"/>
    </span>
    <span slot="action" slot-scope="text, record">
      <a @click="handleView(record)">处理</a>
    </span>


  </a-table>

</template>


<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import JEllipsis from '@/components/jeecg/JEllipsis'

  export default {
    name: 'LastWeekException',
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JDictSelectTag,
    },
    data() {
      return {
        description: '失败页面',
        disableMixinCreated: true,
        loading: false,
        columns: [
          {
            title: '行号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '客户端',
            width: 120,
            align: 'center',
            dataIndex: 'client',
            scopedSlots: { customRender: 'client' }
          },
          {
            title: '类型',
            width: 120,
            align: 'center',
            dataIndex: 'type',
            scopedSlots: { customRender: 'type' }
          },
          {
            title: '操作',
            width: 120,
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/customerInfo/list'
        },
        dictOptions: {},
        // 数据
        dataSource: [
          {
            id: 1,
            client: 'XXXX',
            type: "错误",
            increase: 128,
          },
          {
            id: 2,
            client: 'XXXXXX',
            type: "超时",
            increase: 3,
          },
          {
            id: 3,
            client: 'XXXXX',
            type: "无响应",
            increase: 58,
          },
          {
            id: 4,
            client: 'XXXXX',
            type: "错误",
            increase: 35,
          },
        ]

      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      initDictConfig() {
      },
      loadData(arg) {
        // if(!this.url.list){
        //   this.$message.error("请设置url.list属性!")
        //   return
        // }
        // //加载数据 若传入参数1则加载第一页的内容
        // if (arg === 1) {
        //   this.ipagination.current = 1;
        // }
        // var params = this.getQueryParams();//查询条件
        // this.loading = true;
        // getAction(this.url.list, params).then((res) => {
        //   if (res.success) {
        //     this.dataSource = res.result.records;
        //     this.ipagination.total = res.result.total;
        //   }
        //   if(res.code===510){
        //     this.$message.warning(res.message)
        //   }
        //   this.loading = false;
        // })
      },


    }
  }
</script>
<style scoped>
</style>