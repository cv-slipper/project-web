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

        <a-form-item label="公司名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['companyName', validatorRules.companyName]" placeholder="请输入公司名称"></a-input>
        </a-form-item>
        <a-form-item label="计费类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['chargingType', validatorRules.chargingType]" :trigger-change="true" dictCode="chargingType" placeholder="请选择计费类型" @change="handleTypeChage"/>
        </a-form-item>
        <a-form-item label="库" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="chargingType == '后端'">
          <a-input v-decorator="['library']" placeholder="请输入库"></a-input>
        </a-form-item>
        <a-form-item label="单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['unit', validatorRules.unit]" placeholder="请输入单位"></a-input>
        </a-form-item>
        <a-form-item label="价格" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['price', validatorRules.price]" placeholder="请输入价格" style="width: 100%"/>
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
    name: "CvChargingSetModal",
    components: {
      JDictSelectTag,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
        visible: false,
        chargingType: '',
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
          companyName: {
            rules: [
              { required: true, message: '请输入公司名称!'},
            ]
          },
          chargingType: {
            rules: [
              { required: true, message: '请输入计费类型!'},
            ]
          },
          unit: {
            rules: [
              { required: true, message: '请输入单位!'},
            ]
          },
          price: {
            rules: [
              { required: true, message: '请输入价格!'},
            ]
          },
        },
        url: {
          add: "/cvChargingSet/add",
          edit: "/cvChargingSet/edit",
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
          let data = pick(this.model,'companyName','chargingType','library','unit','price')
          this.chargingType = data.chargingType
          this.form.setFieldsValue(data)
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
        this.form.setFieldsValue(pick(row,'companyName','chargingType','library','unit','price'))
      },
      handleTypeChage(val){
        console.log("handleTypeChage",val)
        let unit = val==='服务费'?'台':'G'
        this.form.setFieldsValue({unit:unit})
        this.chargingType = val
      }


    }
  }
</script>