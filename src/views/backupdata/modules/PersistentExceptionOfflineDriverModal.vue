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
        <a-form-item label="驱动器" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['driver']" placeholder="请输入驱动器"></a-input>
        </a-form-item>
        <a-form-item label="型号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['model']" placeholder="请输入型号"></a-input>
        </a-form-item>
        <a-form-item label="版本" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['version']" placeholder="请输入版本"></a-input>
        </a-form-item>
        <a-form-item label="作业ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['workId']" placeholder="请输入作业ID"></a-input>
        </a-form-item>
        <a-form-item label="介质" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['medium']" placeholder="请输入介质"></a-input>
        </a-form-item>
        <a-form-item label="上次清洁时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择上次清洁时间" v-decorator="['lastClearTime']" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['state']" placeholder="请输入状态"></a-input>
        </a-form-item>
        <a-form-item label="已启动" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['enable']" placeholder="请输入已启动"></a-input>
        </a-form-item>
        <a-form-item label="计程器" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['meter']" placeholder="请输入计程器"></a-input>
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
    name: "PersistentExceptionOfflineDriverModal",
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
          add: "/persistentexceptionofflinedriver/persistentExceptionOfflineDriver/add",
          edit: "/persistentexceptionofflinedriver/persistentExceptionOfflineDriver/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','driver','model','version','workId','medium','lastClearTime','state','enable','meter'))
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
        this.form.setFieldsValue(pick(row,'domain','driver','model','version','workId','medium','lastClearTime','state','enable','meter'))
      },

      
    }
  }
</script>