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
        <a-form-item label="storagePolicyId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['storagePolicyId']" placeholder="请输入storagePolicyId"></a-input>
        </a-form-item>
        <a-form-item label="copyId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['copyId']" placeholder="请输入copyId"></a-input>
        </a-form-item>
        <a-form-item label="isMirrorCopy" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['isMirrorCopy']" placeholder="请输入isMirrorCopy" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="spareMediaGroup" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['spareMediaGroup']" placeholder="请输入spareMediaGroup"></a-input>
        </a-form-item>
        <a-form-item label="copyPrecedence" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['copyPrecedence']" placeholder="请输入copyPrecedence" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="drivePool" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['drivePool']" placeholder="请输入drivePool"></a-input>
        </a-form-item>
        <a-form-item label="retentionRules" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['retentionRules']" placeholder="请输入retentionRules"></a-input>
        </a-form-item>
        <a-form-item label="copyFlags" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['copyFlags']" placeholder="请输入copyFlags"></a-input>
        </a-form-item>
        <a-form-item label="active" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['active']" placeholder="请输入active" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="sourceCopy" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['sourceCopy']" placeholder="请输入sourceCopy"></a-input>
        </a-form-item>
        <a-form-item label="isDefault" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['isDefault']" placeholder="请输入isDefault" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="mediaAgent" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['mediaAgent']" placeholder="请输入mediaAgent"></a-input>
        </a-form-item>
        <a-form-item label="StoragePolicyCopy" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['storagePolicyCopy']" placeholder="请输入StoragePolicyCopy"></a-input>
        </a-form-item>
        <a-form-item label="library" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['library']" placeholder="请输入library"></a-input>
        </a-form-item>
        <a-form-item label="throttleNetworkBandWidthMBHR" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['throttleNetworkBandWidthMbhr']" placeholder="请输入throttleNetworkBandWidthMBHR" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="dedupeFlags" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dedupeFlags']" placeholder="请输入dedupeFlags"></a-input>
        </a-form-item>
        <a-form-item label="isSnapCopy" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['isSnapCopy']" placeholder="请输入isSnapCopy" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="copyType" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['copyType']" placeholder="请输入copyType" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="startTime" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['startTime']" placeholder="请输入startTime"></a-input>
        </a-form-item>
        <a-form-item label="extendedFlags" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['extendedFlags']" placeholder="请输入extendedFlags"></a-input>
        </a-form-item>
        <a-form-item label="storagePool" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['storagePool']" placeholder="请输入storagePool"></a-input>
        </a-form-item>
        <a-form-item label="error" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['error']" placeholder="请输入error"></a-input>
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
    name: "StoragePolicyCopyDetailModal",
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
          add: "/storagepolicycopydetail/storagePolicyCopyDetail/add",
          edit: "/storagepolicycopydetail/storagePolicyCopyDetail/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','storagePolicyId','copyId','isMirrorCopy','spareMediaGroup','copyPrecedence','drivePool','retentionRules','copyFlags','active','sourceCopy','isDefault','mediaAgent','storagePolicyCopy','library','throttleNetworkBandWidthMbhr','dedupeFlags','isSnapCopy','copyType','startTime','extendedFlags','storagePool','error'))
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
        this.form.setFieldsValue(pick(row,'domain','storagePolicyId','copyId','isMirrorCopy','spareMediaGroup','copyPrecedence','drivePool','retentionRules','copyFlags','active','sourceCopy','isDefault','mediaAgent','storagePolicyCopy','library','throttleNetworkBandWidthMbhr','dedupeFlags','isSnapCopy','copyType','startTime','extendedFlags','storagePool','error'))
      },

      
    }
  }
</script>