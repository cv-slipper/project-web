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

        <a-form-item label="处理" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['handled']" :trigger-change="true" dictCode="boolean_dict" placeholder="请选择处理"/>
        </a-form-item>
        <a-form-item label="备份域" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['domain']" placeholder="请输入备份域"></a-input>
        </a-form-item>
        <a-form-item label="暂存池" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['scratchPool']" placeholder="请输入暂存池"></a-input>
        </a-form-item>
        <a-form-item label="库" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['library']" placeholder="请输入库"></a-input>
        </a-form-item>
        <a-form-item label="可用介质数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['mediaNumber']" placeholder="请输入可用介质数量"></a-input>
        </a-form-item>
        <a-form-item label="水位线" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['watermark']" placeholder="请输入水位线"></a-input>
        </a-form-item>
        <a-form-item label="介质型号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['mediaType']" placeholder="请输入介质型号"></a-input>
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
    name: "BackupCurrentResourceShortageModal",
    components: {
      JDictSelectTag
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
          add: "/cvResourceShortage/add",
          edit: "/cvResourceShortage/edit",
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
          this.form.setFieldsValue(pick(this.model,'handled','domain','scratchPool','library','mediaNumber','watermark','mediaType'))
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
        this.form.setFieldsValue(pick(row,'domain','scratchPool','library','mediaNumber','watermark','mediaType'))
      },


    }
  }
</script>