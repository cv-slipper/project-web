<template>
  <j-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-row>

          <a-form-item label="备份域" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['domain']" placeholder="请输入备份域"></a-input>
          </a-form-item>
          <a-col :xs="24" :sm="12">
            <a-form-item label="备份名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['planName']" placeholder="请输入备份名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="系统名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['systemName']" placeholder="请输入系统名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="客户端" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['client']" placeholder="请输入客户端"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="IP" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['ip']" placeholder="请输入IP"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['state']" placeholder="请输入状态"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="内容简述" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['contentSketch']" placeholder="请输入内容简述"></a-input>
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>

      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="备份内容明细" :key="refKeys[0]" :forceRender="true">
          <j-editable-table
            :ref="refKeys[0]"
            :loading="backupInfoContentDetailTable.loading"
            :columns="backupInfoContentDetailTable.columns"
            :dataSource="backupInfoContentDetailTable.dataSource"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="true"/>
        </a-tab-pane>

      </a-tabs>

    </a-spin>
  </j-modal>
</template>

<script>

  import pick from 'lodash.pick'
  import { FormTypes,getRefPromise } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: 'BackupInfoContentModal',
    mixins: [JEditableTableMixin],
    components: {
    },
    data() {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        labelCol2: {
          xs: { span: 24 },
          sm: { span: 3 },
        },
        wrapperCol2: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        refKeys: ['backupInfoContentDetail', ],
        tableKeys:['backupInfoContentDetail', ],
        activeKey: 'backupInfoContentDetail',
        // 备份内容明细
        backupInfoContentDetailTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '备份项目',
              key: 'backupItem',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
          ]
        },
        url: {
          add: "/backupinfocontent/backupInfoContent/add",
          edit: "/backupinfocontent/backupInfoContent/edit",
          backupInfoContentDetail: {
            list: '/backupinfocontent/backupInfoContent/queryBackupInfoContentDetailByMainId'
          },
        }
      }
    },
    methods: {
      getAllTable() {
        let values = this.tableKeys.map(key => getRefPromise(this, key))
        return Promise.all(values)
      },
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        let fieldval = pick(this.model,'domain','planName','systemName','client','ip','state','contentSketch')
        this.$nextTick(() => {
          this.form.setFieldsValue(fieldval)
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.backupInfoContentDetail.list, params, this.backupInfoContentDetailTable)
        }
      },
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        return {
          ...main, // 展开
          backupInfoContentDetailList: allValues.tablesValue[0].values,
        }
      },
      validateError(msg){
        this.$message.error(msg)
      },
     popupCallback(row){
       this.form.setFieldsValue(pick(row,'planName','systemName','client','ip','state','contentSketch'))
     },

    }
  }
</script>

<style scoped>
</style>