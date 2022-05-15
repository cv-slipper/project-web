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
        <a-form-item label="clientId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['clientId']" placeholder="请输入clientId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="backupsetId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['backupsetId']" placeholder="请输入backupsetId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="modifiedTime" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择modifiedTime" v-decorator="['modifiedTime']" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="applicationSize" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['applicationSize']" placeholder="请输入applicationSize"></a-input>
        </a-form-item>
        <a-form-item label="lastBackupTime" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择lastBackupTime" v-decorator="['lastBackupTime']" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="firstBackupTime" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择firstBackupTime" v-decorator="['firstBackupTime']" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="dedupeRatio" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dedupeRatio']" placeholder="请输入dedupeRatio"></a-input>
        </a-form-item>
        <a-form-item label="content" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['content']" placeholder="请输入content"></a-input>
        </a-form-item>
        <a-form-item label="fsBackupSet" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['fsBackupSet']" placeholder="请输入fsBackupSet"></a-input>
        </a-form-item>
        <a-form-item label="planEntity" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['planEntity']" placeholder="请输入planEntity"></a-input>
        </a-form-item>
        <a-form-item label="backupSetEntity" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['backupSetEntity']" placeholder="请输入backupSetEntity"></a-input>
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
    name: "BackupSetModal",
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
          add: "/backupset/backupSet/add",
          edit: "/backupset/backupSet/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','clientId','backupsetId','modifiedTime','applicationSize','lastBackupTime','firstBackupTime','dedupeRatio','content','fsBackupSet','planEntity','backupSetEntity'))
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
        this.form.setFieldsValue(pick(row,'domain','clientId','backupsetId','modifiedTime','applicationSize','lastBackupTime','firstBackupTime','dedupeRatio','content','fsBackupSet','planEntity','backupSetEntity'))
      },

      
    }
  }
</script>