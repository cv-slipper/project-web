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
          <j-dict-select-tag type="list" v-decorator="['domain']" :trigger-change="true" dictCode="domain" placeholder="请选择备份域"/>
        </a-form-item>
        <a-form-item label="主机名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['hostName']" placeholder="请输入主机名"></a-input>
        </a-form-item>
        <a-form-item label="主机" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['host']" placeholder="请输入主机"></a-input>
        </a-form-item>
        <a-form-item label="IP" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['ip']" placeholder="请输入IP"></a-input>
        </a-form-item>
        <a-form-item label="操作系统" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['os']" placeholder="请输入操作系统"></a-input>
        </a-form-item>
        <a-form-item label="备份总容量" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['backendTotalSize']" placeholder="请输入备份总容量" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="前端单价" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['frontendPrice']" placeholder="请输入前端单价" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="备份单价" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['backendPrice']" placeholder="请输入备份单价" style="width: 100%"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"



  export default {
    name: "CvBaseConfigModal",
    components: {
      JDictSelectTag,
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
          add: "/cvBaseConfig/add",
          edit: "/cvBaseConfig/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','hostName','host','ip','os','backendTotalSize','frontendPrice','backendPrice'))
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
        this.form.setFieldsValue(pick(row,'domain','hostName','host','ip','os','backendTotalSize','frontendPrice','backendPrice'))
      },


    }
  }
</script>