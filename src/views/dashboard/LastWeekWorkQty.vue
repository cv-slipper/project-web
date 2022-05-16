<template>
  <a-table
    rowKey="id"
    size="middle"
    :loading="loading"
    :columns="columns"
    :dataSource="tableData"
    :pagination="false">

    <template slot="increase" slot-scope="text">
      {{ text }}%<span v-if="text>0" style="color: #f00056"><a-icon type="caret-up" /></span>
      <span v-else-if="text<0" style="color: #00e500"><a-icon type="caret-down" /></span>
    </template>
    <span slot="client" slot-scope="text">
      <j-ellipsis :value="text" :length="25"/>
    </span>
    <span slot="action" slot-scope="text, record">
      <a @click="handleView(record)">详情</a>
    </span>


  </a-table>

</template>


<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import JEllipsis from '@/components/jeecg/JEllipsis'

  export default {
    name: 'LastWeekWorkQty',
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JDictSelectTag,
    },
    props:{
      tableData:{
        type:Array,
      }
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
            title: '作业量',
            width: 120,
            align: 'center',
            dataIndex: 'qty',
          },
          {
            title: '涨幅',
            width: 120,
            align: 'center',
            dataIndex: 'increase',
            scopedSlots: { customRender: 'increase' }
          },
          // {
          //   title: '操作',
          //   width: 120,
          //   dataIndex: 'action',
          //   align: 'center',
          //   scopedSlots: { customRender: 'action' }
          // }
        ],
        url: {
          list: '/customerInfo/list'
        },
        dictOptions: {},
        // 数据
        dataSource: [
          {
            id: 1,
            client: 'XXXXX',
            workQty: 2234,
            increase: 128,
          },
          {
            id: 2,
            client: 'XXXXX',
            workQty: 2404,
            increase: 3,
          },
          {
            id: 3,
            client: 'XXXXX',
            workQty: 1231,
            increase: 58,
          },
          {
            id: 4,
            client: 'XXXXXX',
            workQty: 1655,
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