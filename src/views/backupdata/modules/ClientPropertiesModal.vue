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

        <a-form-item label="备份域" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['domain']" placeholder="请输入备份域"></a-input>
        </a-form-item>
        <a-form-item label="clientId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['clientId']" placeholder="请输入clientId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="clusterClientProperties" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['clusterClientProperties']" placeholder="请输入clusterClientProperties"></a-input>
        </a-form-item>
        <a-form-item label="pseudoClientInfo" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['pseudoClientInfo']" placeholder="请输入pseudoClientInfo"></a-input>
        </a-form-item>
        <a-form-item label="clientConfiguration" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['clientConfiguration']" placeholder="请输入clientConfiguration"></a-input>
        </a-form-item>
        <a-form-item label="clientProps" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['clientProps']" placeholder="请输入clientProps"></a-input>
        </a-form-item>
        <a-form-item label="clientReadiness" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['clientReadiness']" placeholder="请输入clientReadiness"></a-input>
        </a-form-item>
        <a-form-item label="client" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['client']" placeholder="请输入client"></a-input>
        </a-form-item>
        <a-form-item label="clientGroups" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['clientGroups']" placeholder="请输入clientGroups"></a-input>
        </a-form-item>
        <a-form-item label="AdvancedFeatures" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['advancedFeatures']" placeholder="请输入AdvancedFeatures"></a-input>
        </a-form-item>
        <a-form-item label="ActivePhysicalNode" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['activePhysicalDode']" placeholder="请输入ActivePhysicalNode"></a-input>
        </a-form-item>

      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'



  export default {
    name: "ClientPropertiesModal",
    components: { 
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
          add: "/clientproperties/clientProperties/add",
          edit: "/clientproperties/clientProperties/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','clientId','clusterClientProperties','pseudoClientInfo','clientConfiguration','clientProps','clientReadiness','client','clientGroups','advancedFeatures','activePhysicalDode'))
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
        this.form.setFieldsValue(pick(row,'domain','clientId','clusterClientProperties','pseudoClientInfo','clientConfiguration','clientProps','clientReadiness','client','clientGroups','advancedFeatures','activePhysicalDode'))
      },

      
    }
  }
</script>