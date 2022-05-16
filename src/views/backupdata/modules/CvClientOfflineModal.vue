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

        <a-form-item label="域" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['domain']" :trigger-change="true" dictCode="domain" placeholder="请选择域"/>
        </a-form-item>
        <a-form-item label="客户端名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['client']" placeholder="请输入客户端名称"></a-input>
        </a-form-item>
        <a-form-item label="客户端Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['clientId']" placeholder="请输入客户端Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="脱机原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['reason']" placeholder="请输入脱机原因"></a-input>
        </a-form-item>
        <a-form-item label="ip地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['host']" placeholder="请输入ip地址"></a-input>
        </a-form-item>
        <a-form-item label="发生时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date
            placeholder="请选择发生时间"
            v-decorator="['triggerTime']"
            :trigger-change="true"
            :show-time="true"
            date-format="YYYY-MM-DD HH:mm:ss"
            style="width: 100%"/>
        </a-form-item>
        <a-form-item label="是否处理" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['handled']" :trigger-change="true" dictCode="boolean_dict" placeholder="请选择是否处理"/>
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
    name: "CvClientOfflineModal",
    components: {
      JDate,
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
          add: "/cvClientOffline/add",
          edit: "/cvClientOffline/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','client','clientId','reason','host','triggerTime','handled'))
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
        this.form.setFieldsValue(pick(row,'domain','client','clientId','reason','host','triggerTime','handled'))
      },


    }
  }
</script>