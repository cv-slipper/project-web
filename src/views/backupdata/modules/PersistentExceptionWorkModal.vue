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

          <a-col :xs="24" :sm="12">
            <a-form-item label="备份域" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['domain']" placeholder="请输入备份域"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="客户端" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['client']" placeholder="请输入客户端"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="代理/实例" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['agent']" placeholder="请输入代理/实例"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="备份集/子客户端" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['childClient']" placeholder="请输入备份集/子客户端"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="作业ID(CommCell)(状态)" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['workId']" placeholder="请输入作业ID(CommCell)(状态)"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['type']" placeholder="请输入类型"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="扫描类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['scanType']" placeholder="请输入扫描类型"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="开始时间(写开始时间)" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择开始时间(写开始时间)"
                v-decorator="['startTime']"
                :trigger-change="true"
                :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="结束时间或当前阶段(写结束时间)" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择结束时间或当前阶段(写结束时间)"
                v-decorator="['endTime']"
                :trigger-change="true"
                :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="应用程序大小(压缩率)" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['programSize']" placeholder="请输入应用程序大小(压缩率)"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="已传送数据" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['transportData']" placeholder="请输入已传送数据"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="写入数据(空间节省百分比)" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['writeData']" placeholder="请输入写入数据(空间节省百分比)"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="数据大小更改" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dataSize']" placeholder="请输入数据大小更改"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="传送时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['transportTime']" placeholder="请输入传送时间"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="吞吐量(GB/小时)(当前)" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['speed']" placeholder="请输入吞吐量(GB/小时)(当前)"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="受保护对象" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['protectObject']" placeholder="请输入受保护对象" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="失败对象" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['failObject']" placeholder="请输入失败对象" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="失败文件夹" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['failFolder']" placeholder="请输入失败文件夹" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['reason']" placeholder="请输入原因"></a-input>
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>

      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="持续异常作业明细" :key="refKeys[0]" :forceRender="true">
          <j-editable-table
            :ref="refKeys[0]"
            :loading="persistentExceptionWorkDetailTable.loading"
            :columns="persistentExceptionWorkDetailTable.columns"
            :dataSource="persistentExceptionWorkDetailTable.dataSource"
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
  import JDate from '@/components/jeecg/JDate'  

  export default {
    name: 'PersistentExceptionWorkModal',
    mixins: [JEditableTableMixin],
    components: {
      JDate,
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
        refKeys: ['persistentExceptionWorkDetail', ],
        tableKeys:['persistentExceptionWorkDetail', ],
        activeKey: 'persistentExceptionWorkDetail',
        // 持续异常作业明细
        persistentExceptionWorkDetailTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '机器名',
              key: 'machineName',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '主机',
              key: 'host',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '代理',
              key: 'agent',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '状态',
              key: 'state',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '虚拟机大小',
              key: 'virtualSize',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '备份大小',
              key: 'backupSize',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '客户机大小',
              key: 'clientSize',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '开始时间',
              key: 'startTime',
              type: FormTypes.datetime,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '结束时间',
              key: 'endTime',
              type: FormTypes.datetime,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: 'VMware工具',
              key: 'vmTool',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '硬件版本',
              key: 'hardwareVersion',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '操作系统',
              key: 'os',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '备份类型',
              key: 'backupType',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: 'CBT状态',
              key: 'cbtState',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: 'APP感知状态',
              key: 'perceptionState',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '传输模式',
              key: 'transportMode',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
            {
              title: '所有者',
              key: 'owner',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: '',
            },
          ]
        },
        url: {
          add: "/persistentexceptionwork/persistentExceptionWork/add",
          edit: "/persistentexceptionwork/persistentExceptionWork/edit",
          persistentExceptionWorkDetail: {
            list: '/persistentexceptionwork/persistentExceptionWork/queryPersistentExceptionWorkDetailByMainId'
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
        let fieldval = pick(this.model,'domain','client','agent','childClient','workId','type','scanType','startTime','endTime','programSize','transportData','writeData','dataSize','transportTime','speed','protectObject','failObject','failFolder','reason')
        this.$nextTick(() => {
          this.form.setFieldsValue(fieldval)
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.persistentExceptionWorkDetail.list, params, this.persistentExceptionWorkDetailTable)
        }
      },
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)

        return {
          ...main, // 展开
          persistentExceptionWorkDetailList: allValues.tablesValue[0].values,
        }
      },
      validateError(msg){
        this.$message.error(msg)
      },
     popupCallback(row){
       this.form.setFieldsValue(pick(row,'domain','client','agent','childClient','workId','type','scanType','startTime','endTime','programSize','transportData','writeData','dataSize','transportTime','speed','protectObject','failObject','failFolder','reason'))
     },

    }
  }
</script>

<style scoped>
</style>