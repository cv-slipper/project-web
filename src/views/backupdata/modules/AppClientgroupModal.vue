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
        <a-form-item label="description" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['description']" placeholder="请输入description"></a-input>
        </a-form-item>
        <a-form-item label="flag" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['flag']" placeholder="请输入flag" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="status" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['status']" placeholder="请输入status" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="userId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['userId']" placeholder="请输入userId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="refTime" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['refTime']" placeholder="请输入refTime" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="modified" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['modified']" placeholder="请输入modified" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="fwPorts" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['fwPorts']" placeholder="请输入fwPorts"></a-input>
        </a-form-item>
        <a-form-item label="origCCId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['origCcid']" placeholder="请输入origCCId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="GUID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['guid']" placeholder="请输入GUID"></a-input>
        </a-form-item>
        <a-form-item label="clientGroupId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['clientGroupId']" placeholder="请输入clientGroupId" style="width: 100%"/>
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
    name: "AppClientgroupModal",
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
          add: "/appclientgroup/appClientgroup/add",
          edit: "/appclientgroup/appClientgroup/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','name','description','flag','status','userId','refTime','modified','fwPorts','origCcid','guid','clientGroupId'))
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
        this.form.setFieldsValue(pick(row,'domain','name','description','flag','status','userId','refTime','modified','fwPorts','origCcid','guid','clientId'))
      },


    }
  }
</script>