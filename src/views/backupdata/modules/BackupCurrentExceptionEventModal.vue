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
        <a-form-item label="严重性" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['seriousness']" placeholder="请输入严重性"></a-input>
        </a-form-item>
        <a-form-item label="事件ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['eventId']" placeholder="请输入事件ID"></a-input>
        </a-form-item>
        <a-form-item label="作业ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['workId']" placeholder="请输入作业ID"></a-input>
        </a-form-item>
        <a-form-item label="时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date
            placeholder="请选择时间"
            v-decorator="['time']"
            :trigger-change="true"
            :show-time="true"
            date-format="YYYY-MM-DD HH:mm:ss"
            style="width: 100%"/>
        </a-form-item>
        <a-form-item label="程序" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['program']" placeholder="请输入程序"></a-input>
        </a-form-item>
        <a-form-item label="计算机" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['computer']" placeholder="请输入计算机"></a-input>
        </a-form-item>
        <a-form-item label="事件代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['eventCode']" placeholder="请输入事件代码"></a-input>
        </a-form-item>
        <a-form-item label="说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['description']" placeholder="请输入说明"></a-input>
        </a-form-item>
        <a-form-item label="acknowledge" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['acknowledge']" placeholder="请输入acknowledge" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="subsystem" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['subsystem']" placeholder="请输入subsystem"></a-input>
        </a-form-item>
        <a-form-item label="clientEntity" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['clientEntity']" placeholder="请输入clientEntity"></a-input>
        </a-form-item>
        <a-form-item label="type" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['type']" placeholder="请输入type" style="width: 100%"/>
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
    name: "BackupCurrentExceptionEventModal",
    components: {
      JDate,
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
          add: "/Event/add",
          edit: "/Event/edit",
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
          this.form.setFieldsValue(pick(this.model,'handled','domain','seriousness','eventId','workId','time','program','computer','eventCode','description','acknowledge','subsystem','clientEntity','type'))
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
        this.form.setFieldsValue(pick(row,'domain','seriousness','eventId','workId','time','program','computer','eventCode','description'))
      },


    }
  }
</script>