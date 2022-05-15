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
        <a-form-item label="Scratch Pool" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['scratchPool']" placeholder="请输入Scratch Pool"></a-input>
        </a-form-item>
        <a-form-item label="Library" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['library']" placeholder="请输入Library"></a-input>
        </a-form-item>
        <a-form-item label="Number of Media(Inside/Outside)" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['mediaNumber']" placeholder="请输入Number of Media(Inside/Outside)"></a-input>
        </a-form-item>
        <a-form-item label="Watermark(Low/High)" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['watermark']" placeholder="请输入Watermark(Low/High)"></a-input>
        </a-form-item>
        <a-form-item label="Default Media Type" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['mediaType']" placeholder="请输入Default Media Type"></a-input>
        </a-form-item>
        <a-form-item label="Priority" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['priority']" placeholder="请输入Priority"></a-input>
        </a-form-item>
        <a-form-item label="Media Selection Criteria" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['mediaSelection']" placeholder="请输入Media Selection Criteria"></a-input>
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
    name: "PersistentExceptionShortageModal",
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
          add: "/persistentexceptionshortage/persistentExceptionShortage/add",
          edit: "/persistentexceptionshortage/persistentExceptionShortage/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','scratchPool','library','mediaNumber','watermark','mediaType','priority','mediaSelection'))
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
        this.form.setFieldsValue(pick(row,'domain','scratchPool','library','mediaNumber','watermark','mediaType','priority','mediaSelection'))
      },

      
    }
  }
</script>