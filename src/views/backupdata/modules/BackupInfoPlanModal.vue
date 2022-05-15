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
        <a-form-item label="计划名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['planName']" placeholder="请输入计划名"></a-input>
        </a-form-item>
        <a-form-item label="客户端" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['client']" placeholder="请输入客户端"></a-input>
        </a-form-item>
        <a-form-item label="计划策略" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['strategy']" placeholder="请输入计划策略"></a-input>
        </a-form-item>
        <a-form-item label="IP" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['ip']" placeholder="请输入IP"></a-input>
        </a-form-item>
        <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['type']" placeholder="请输入类型"></a-input>
        </a-form-item>
        <a-form-item label="执行周期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['executionCycle']" placeholder="请输入执行周期"></a-input>
        </a-form-item>
        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['state']" placeholder="请输入状态"></a-input>
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
    name: "BackupInfoPlanModal",
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
          add: "/backupinfoplan/backupInfoPlan/add",
          edit: "/backupinfoplan/backupInfoPlan/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','planName','client','strategy','ip','type','executionCycle','state'))
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
        this.form.setFieldsValue(pick(row,'planName','client','strategy','ip','type','executionCycle','state'))
      },


    }
  }
</script>