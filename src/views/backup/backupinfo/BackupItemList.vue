<template >

  <div >
    <span v-for="item in backupItem">
      <a-checkbox :default-checked="item.checked">
        {{item.text}}
      </a-checkbox>
    </span>
  </div>

</template>


<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: 'FailList',
    mixins: [JeecgListMixin],
    components: {

    },
    data() {
      return {
        description: '备份项目页面',
        disableMixinCreated: true,
        url: {
          list: '/customerInfo/list'
        },
        dictOptions: {},
        // 数据
        backupItem: [
          {
            text: '前端',
            value: '',
            checked: true,
          },
          {
            text: '数据库',
            value: '',
            checked: true,
          },
          {
            text: '项目一',
            value: '',
            checked: false,
          },
          {
            text: '项目二',
            value: '',
            checked: false,
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
      handleView() {
        this.$emit('showDetail')
      }

    }
  }
</script>
<style scoped>
</style>