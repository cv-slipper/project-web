<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="处理" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['handled']" :trigger-change="true" dictCode="boolean_dict" placeholder="请选择处理"/>
        </a-form-item>
        <a-form-item label="备份域" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['domain']" placeholder="请输入备份域"></a-input>
        </a-form-item>
        <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['type']" placeholder="请输入类型"></a-input>
        </a-form-item>
        <a-form-item label="作业ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['workId']" placeholder="请输入作业ID"></a-input>
        </a-form-item>
        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['state']" placeholder="请输入状态"></a-input>
        </a-form-item>
        <a-form-item label="操作类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['operationType']" placeholder="请输入操作类型"></a-input>
        </a-form-item>
        <a-form-item label="作业类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['workType']" placeholder="请输入作业类型"></a-input>
        </a-form-item>
        <a-form-item label="客户端" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['client']" placeholder="请输入客户端"></a-input>
        </a-form-item>
        <a-form-item label="代理类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['agentType']" placeholder="请输入代理类型"></a-input>
        </a-form-item>
        <a-form-item label="Instance" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['instance']" placeholder="请输入Instance"></a-input>
        </a-form-item>
        <a-form-item label="存储策略" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['storageStrategy']" placeholder="请输入存储策略"></a-input>
        </a-form-item>
        <a-form-item label="开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择开始时间" v-decorator="['startTime']" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择结束时间" v-decorator="['endTime']" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="持续" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['duration']" placeholder="请输入持续"></a-input>
        </a-form-item>
        <a-form-item label="应用程序大小" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['programSize']" placeholder="请输入应用程序大小"></a-input>
        </a-form-item>
        <a-form-item label="平均吞吐量" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['speed']" placeholder="请输入平均吞吐量"></a-input>
        </a-form-item>
        <a-form-item label="保留直到" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择保留直到" v-decorator="['saveUntil']" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="clientId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['clientId']" placeholder="请输入clientId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="subclient" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['subClient']" placeholder="请输入subclient"></a-input>
        </a-form-item>
        <a-form-item label="destinationClient" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['destinationClient']" placeholder="请输入destinationClient"></a-input>
        </a-form-item>
        <a-form-item label="userName" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['userName']" placeholder="请输入userName"></a-input>
        </a-form-item>
        <a-form-item label="clientGroups" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['clientGroups']" placeholder="请输入clientGroups"></a-input>
        </a-form-item>

      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"



  export default {
    name: "BackupCurrentExceptionWorkModal",
    components: {
      JDate,
      JDictSelectTag
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        validatorRules: {
        },
        url: {
          add: "/job/add",
          edit: "/job/edit",
        }
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'handled','domain','type','workId','state','operationType','workType','client','agentType','instance','storageStrategy','startTime','endTime','duration','programSize','speed','saveUntil','clientId','subClient','destinationClient','userName','clientGroups'))
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据",formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }

        })
      },
      handleCancel () {
        this.close()
      },
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'type','workId','state','operationType','workType','client','agentType','instance','storageStrategy','startTime','endTime','duration','programSize','speed','saveUntil'))
      },


    }
  }
</script>