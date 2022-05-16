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
        <a-form-item label="库" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['library']" placeholder="请输入库"></a-input>
        </a-form-item>
        <a-form-item label="型号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['model']" placeholder="请输入型号"></a-input>
        </a-form-item>
        <a-form-item label="版本" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['version']" placeholder="请输入版本"></a-input>
        </a-form-item>
        <a-form-item label="安装时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date
            placeholder="请选择安装时间"
            v-decorator="['installTime']"
            :trigger-change="true"
            :show-time="true"
            date-format="YYYY-MM-DD HH:mm:ss"
            style="width: 100%"/>
        </a-form-item>
        <a-form-item label="默认暂存池" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['defaultCache']" placeholder="请输入默认暂存池"></a-input>
        </a-form-item>
        <a-form-item label="默认介质类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['defaultMediumType']" placeholder="请输入默认介质类型"></a-input>
        </a-form-item>
        <a-form-item label="超时(装载/卸载)" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['overTime']" placeholder="请输入超时(装载/卸载)"></a-input>
        </a-form-item>
        <a-form-item label="驱动器数/介质数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['mediumNumber']" placeholder="请输入驱动器数/介质数"></a-input>
        </a-form-item>
        <a-form-item label="槽数(邮件槽/空/总数)" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['grooveNumber']" placeholder="请输入槽数(邮件槽/空/总数)"></a-input>
        </a-form-item>
        <a-form-item label="错误(软/硬)" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['error']" placeholder="请输入错误(软/硬)"></a-input>
        </a-form-item>
        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['state']" placeholder="请输入状态"></a-input>
        </a-form-item>
        <a-form-item label="关联的用户组" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['relationGroup']" placeholder="请输入关联的用户组"></a-input>
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
    name: "PersistentExceptionOfflineLibraryModal",
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
          add: "/persistentexceptionofflinelibrary/persistentExceptionOfflineLibrary/add",
          edit: "/persistentexceptionofflinelibrary/persistentExceptionOfflineLibrary/edit",
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
          this.form.setFieldsValue(pick(this.model,'domain','library','model','version','installTime','defaultCache','defaultMediumType','overTime','mediumNumber','grooveNumber','error','state','relationGroup'))
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
        this.form.setFieldsValue(pick(row,'domain','library','model','version','installTime','defaultCache','defaultMediumType','overTime','mediumNumber','grooveNumber','error','state','relationGroup'))
      },

      
    }
  }
</script>