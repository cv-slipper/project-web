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
        <a-form-item label="copyId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['copyId']" placeholder="请输入copyId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="storagePolicyId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['storagePolicyId']" placeholder="请输入storagePolicyId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="spCopy" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['spCopy']" placeholder="请输入spCopy"></a-input>
        </a-form-item>
        <a-form-item label="dataSizeInGB" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dataSizeInGb']" placeholder="请输入dataSizeInGB"></a-input>
        </a-form-item>
        <a-form-item label="requiresBackupsOnOrAfterDate" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['requiresbackupsonorafterdate']" placeholder="请输入requiresBackupsOnOrAfterDate"></a-input>
        </a-form-item>
        <a-form-item label="oldestJobStartTime" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择oldestJobStartTime" v-decorator="['oldestJobStartTime']" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
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



  export default {
    name: "StoragePolicyCopySizeModal",
    components: { 
      JDate,
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
          add: "/storagepolicycopysize/storagePolicyCopySize/add",
          edit: "/storagepolicycopysize/storagePolicyCopySize/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','copyId','storagePolicyId','spCopy','dataSizeInGb','requiresbackupsonorafterdate','oldestJobStartTime'))
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
        this.form.setFieldsValue(pick(row,'domain','copyId','storagePolicyId','spCopy','dataSizeInGb','requiresbackupsonorafterdate','oldestJobStartTime'))
      },

      
    }
  }
</script>