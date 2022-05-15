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
        <a-form-item label="appGroup" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['appGroup']" placeholder="请输入appGroup"></a-input>
        </a-form-item>
        <a-form-item label="GUID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['guid']" placeholder="请输入GUID"></a-input>
        </a-form-item>
        <a-form-item label="alertId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['alertId']" placeholder="请输入alertId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="associatedObjects" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['associatedObjects']" placeholder="请输入associatedObjects"></a-input>
        </a-form-item>
        <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['description']" placeholder="请输入描述"></a-input>
        </a-form-item>
        <a-form-item label="originalCC" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['originalcc']" placeholder="请输入originalCC"></a-input>
        </a-form-item>
        <a-form-item label="ownerId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['ownerId']" placeholder="请输入ownerId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="ownerName" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['ownerName']" placeholder="请输入ownerName"></a-input>
        </a-form-item>
        <a-form-item label="policyType" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['policyType']" placeholder="请输入policyType" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="runUserId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['runUserid']" placeholder="请输入runUserId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="task" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['task']" placeholder="请输入task"></a-input>
        </a-form-item>
        <a-form-item label="任务ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['taskId']" placeholder="请输入任务ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="任务名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['taskName']" placeholder="请输入任务名"></a-input>
        </a-form-item>
        <a-form-item label="taskFlags" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['taskFlags']" placeholder="请输入taskFlags"></a-input>
        </a-form-item>
        <a-form-item label="taskType" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['tasktype']" placeholder="请输入taskType" style="width: 100%"/>
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
    name: "CvSchedulePolicyModal",
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
          add: "/cvSchedulePolicy/add",
          edit: "/cvSchedulePolicy/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','appGroup','guid','alertId','associatedObjects','description','originalcc','ownerId','ownerName','policyType','runUserid','task','taskId','taskName','taskFlags','tasktype'))
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
        this.form.setFieldsValue(pick(row,'domain','appGroup','guid','alertId','associatedObjects','description','originalcc','ownerId','ownerName','policyType','runUserid','task','taskId','taskName','taskFlags','tasktype'))
      },


    }
  }
</script>