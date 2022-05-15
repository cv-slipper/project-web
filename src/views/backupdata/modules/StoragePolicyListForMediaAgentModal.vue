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
        <a-form-item label="MediaAgentId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['mediaAgentId']" placeholder="请输入MediaAgentId"></a-input>
        </a-form-item>
        <a-form-item label="mediaAgent" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['mediaagent']" placeholder="请输入mediaAgent"></a-input>
        </a-form-item>
        <a-form-item label="isMADefaultDataPathInCopy" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['ismadefaultdatapathincopy']" placeholder="请输入isMADefaultDataPathInCopy"></a-input>
        </a-form-item>
        <a-form-item label="isPrimaryCopy" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['isprimarycopy']" placeholder="请输入isPrimaryCopy"></a-input>
        </a-form-item>
        <a-form-item label="isProxyMAInCopy" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['isproxymaincopy']" placeholder="请输入isProxyMAInCopy"></a-input>
        </a-form-item>
        <a-form-item label="isMADDBHost" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['ismaddbhost']" placeholder="请输入isMADDBHost"></a-input>
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
    name: "StoragePolicyListForMediaAgentModal",
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
          add: "/storagepolicylistformediaagent/storagePolicyListForMediaAgent/add",
          edit: "/storagepolicylistformediaagent/storagePolicyListForMediaAgent/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','mediaAgentId','mediaagent','ismadefaultdatapathincopy','isprimarycopy','isproxymaincopy','ismaddbhost'))
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
        this.form.setFieldsValue(pick(row,'domain','mediaAgentId','mediaagent','ismadefaultdatapathincopy','isprimarycopy','isproxymaincopy','ismaddbhost'))
      },

      
    }
  }
</script>