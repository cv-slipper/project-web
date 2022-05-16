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

        <!--        <a-form-item label="备份域" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--          <j-dict-select-tag type="list" v-decorator="['domain']" :trigger-change="true" dictCode="domain" placeholder="请选择备份域"/>-->
        <!--        </a-form-item>-->
        <!--        <a-form-item label="client对象" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--          <a-input-number v-decorator="['clientId']" placeholder="请输入client对象" style="width: 100%"/>-->
        <!--        </a-form-item>-->
        <!--        <a-form-item label="客户端名称" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--          <a-input v-decorator="['clientName']" placeholder="请输入客户端名称"></a-input>-->
        <!--        </a-form-item>-->
        <a-form-item label="客户端描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['description']" placeholder="请输入客户端描述"></a-input>
        </a-form-item>
        <!--        <a-form-item label="ip地址" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--          <a-input v-decorator="['hostname']" placeholder="请输入ip地址"></a-input>-->
        <!--        </a-form-item>-->
        <!--        <a-form-item label="CV里客户端描述" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--          <a-input v-decorator="['displayName']" placeholder="请输入CV里客户端描述"></a-input>-->
        <!--        </a-form-item>-->
        <!--        <a-form-item label="客户端全局ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--          <a-input v-decorator="['clientGuid']" placeholder="请输入客户端全局ID"></a-input>-->
        <!--        </a-form-item>-->

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
    name: "CvClientModal",
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
          add: "/cvClient/add",
          edit: "/cvClient/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','clientId','clientName','description','hostname','displayName','clientGuid'))
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
        this.form.setFieldsValue(pick(row,'domain','clientId','clientName','description','hostname','displayName','clientGuid'))
      },


    }
  }
</script>