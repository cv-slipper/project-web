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
        <a-form-item label="name" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['name']" placeholder="请输入name"></a-input>
        </a-form-item>
        <a-form-item label="simOperatingSystemId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['simOperatingSystemId']" placeholder="请输入simOperatingSystemId"></a-input>
        </a-form-item>
        <a-form-item label="net_hostname" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['netHostname']" placeholder="请输入net_hostname"></a-input>
        </a-form-item>
        <a-form-item label="client_password" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['clientPassword']" placeholder="请输入client_password"></a-input>
        </a-form-item>
        <a-form-item label="refTime" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['reftime']" placeholder="请输入refTime" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="modified" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['modified']" placeholder="请输入modified" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="offlineEntity" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['offlineentity']" placeholder="请输入offlineEntity" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="offlineTimeStamp" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['offlineTimeStamp']" placeholder="请输入offlineTimeStamp" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="csHostName" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['csHostName']" placeholder="请输入csHostName"></a-input>
        </a-form-item>
        <a-form-item label="clientDescription" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['clientDescription']" placeholder="请输入clientDescription"></a-input>
        </a-form-item>
        <a-form-item label="jobResultDir" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['jobResultDir']" placeholder="请输入jobResultDir"></a-input>
        </a-form-item>
        <a-form-item label="clientSkewTime" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['clientSkewTime']" placeholder="请输入clientSkewTime" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="cvdPort" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['cvdPort']" placeholder="请输入cvdPort" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="evmgrcPort" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['evmgrcPort']" placeholder="请输入evmgrcPort" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="status" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['status']" placeholder="请输入status" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="releaseId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['releaseId']" placeholder="请输入releaseId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="spaceCheckFlags" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['spaceCheckFlags']" placeholder="请输入spaceCheckFlags" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="ccpId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['ccpid']" placeholder="请输入ccpId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="ccpTime" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['ccpTime']" placeholder="请输入ccpTime" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="origCCId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['origccid']" placeholder="请输入origCCId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="GUID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['guid']" placeholder="请输入GUID"></a-input>
        </a-form-item>
        <a-form-item label="specialClientFlags" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['specialClientFlags']" placeholder="请输入specialClientFlags" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="nvarchar" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['displayName']" placeholder="请输入nvarchar"></a-input>
        </a-form-item>
        <a-form-item label="clientId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['clientId']" placeholder="请输入clientId" style="width: 100%"/>
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
    name: "AppClientModal",
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
          add: "/appclient/appClient/add",
          edit: "/appclient/appClient/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','name','simOperatingSystemId','netHostname','clientPassword','reftime','modified','offlineentity','offlineTimeStamp','csHostName','clientDescription','jobResultDir','clientSkewTime','cvdPort','evmgrcPort','status','releaseId','spaceCheckFlags','ccpid','ccpTime','origccid','guid','specialClientFlags','displayName','clientId'))
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
        this.form.setFieldsValue(pick(row,'domain','name','simOperatingSystemId','netHostname','clientPassword','reftime','modified','offlineentity','offlineTimeStamp','csHostName','clientDescription','jobResultDir','clientSkewTime','cvdPort','evmgrcPort','status','releaseId','spaceCheckFlags','ccpid','ccpTime','origccid','guid','specialClientFlags','displayName','clientId'))
      },

      
    }
  }
</script>