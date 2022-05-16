<template>
  <div class="page-header-index-wide">
    <a-row :gutter="22" type="flex" justify="center">
      <a-col :span="8">
        <a-card :bordered="false" style="height: 12.6rem">
          <a-row type="flex" justify="space-around" align="middle" style="height: 10rem">
            <!-- 头像侧-begin -->
            <a-col :span="12">
              <a-row>
                <a-col :span="6">
                  <a-avatar :size="35" src="https://img0.baidu.com/it/u=1815442429,69051200&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=324"/>
                  <!--                  <a-avatar :size="35" src="https://p1.itc.cn/q_70/images03/20220125/33358d3b6537475aa94cb1872a99ed25.jpeg"/>-->
                  <!--                  <a-avatar :size="35" :src="userInfo().avatar"/>-->
                </a-col>
                <a-col :span="18">
                  <a-row>
                    <span style="font-size: 1.5em;font-weight: bold">欢迎：{{ nickname() }}</span>
                  </a-row>
                  <a-row>
                    <span>上次登录时间 </span><br/>
                    <span>{{ loginTime }}</span>
                  </a-row>
                </a-col>
              </a-row>
            </a-col>
            <!-- 头像侧-end -->
            <!-- 信息侧-begin -->
            <a-col :span="12">
              <a-row>
                <a-button-group>
                  <a-button value="large" :type="prodBtnType" @click="handleFieldChange('prod')">
                    {{ getDomainText('prod') }}
                  </a-button>
                  <a-button value="default" :type="branchBtnType" @click="handleFieldChange('branch')">
                    {{ getDomainText('branch') }}
                  </a-button>
                </a-button-group>
              </a-row>
              <br/>
              <a-row>
                <a-col :span="14">
                  <a-icon type="laptop" style="font-size: 1.25em"/>
                  <span style="margin-left: 10px;font-size: 1em;font-weight: bold">{{ hostInfo.host }}</span>
                </a-col>
                <a-col :span="6" :offset="4">
                  <span style="font-size: 0.75em;">{{ hostInfo.ip }}</span>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="18">
                  <span style="margin-left: 0.625em;font-size: 1em;font-weight: bold">{{ hostInfo.hostName }}</span>
                </a-col>
                <a-col :span="6">
                  <span style="font-size: 0.75em;">{{ hostInfo.os }}</span>
                </a-col>
              </a-row>
            </a-col>
            <!-- 信息侧-end -->
          </a-row>
        </a-card>
      </a-col>

      <a-col :span="14" style="height: 13rem">
        <yesterday-card :domain="domain"/>
      </a-col>
    </a-row>
  </div>

</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  import { getAction } from '@/api/manage'
  import YesterdayCard from './YesterdayCard'
  import { formatDate } from '@/utils/util'
  import { initDictOptions } from '@/components/dict/JDictSelectUtil'

  export default {
    name: "HeadCard",
    components: {
      YesterdayCard
    },
    data() {
      return {
        indexStyle:1,
        prodBtnType:'primary',
        branchBtnType:'default',
        url: {
          loginTime: "/sys/log/loginTime",
          hostInfo: "/cvBaseConfig/dataList",
        },
        loginTime:"",
        hostInfo:{},
        domain:'prod',
        dictDomainList: [],
      }
    },
    created() {
      this.getLoginTime()
      this.getHostInfo()
      this.initDictConfig()
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initDictConfig() {
        // 备份域
        initDictOptions('domain').then((res) => {
          if (res.success) {
            this.dictDomainList = res.result
            console.log('this.dictDomainList',this.dictDomainList)
          }
        })
      },
      getDomainText(domain){
        let text = ''
        this.dictDomainList.forEach((item) => {if(item.value == domain){text = item.text}})
        return text
      },
      handleFieldChange(domain) {
        this.$emit('domainChange', domain)
        this.domain = domain
        this.prodBtnType = domain ==='prod'? 'primary' : 'default'
        this.branchBtnType = domain ==='branch'? 'primary' : 'default'
        // if(this.prodBtnType ==='primary'){
        //   this.prodBtnType = 'default'
        // }else {
        //   this.prodBtnType = 'primary'
        // }
        // if(this.branchBtnType ==='primary'){
        //   this.branchBtnType = 'default'
        // }else {
        //   this.branchBtnType = 'primary'
        // }
        this.getHostInfo()
      },
      getLoginTime(){
        getAction(this.url.loginTime,{user:this.userInfo().username}).then((res)=>{
          if(res.success){
            let loginTime = res.result.createTime.toString()
            this.loginTime = loginTime
          }else {
            return
          }
        })
      },
      getHostInfo(){
        getAction(this.url.hostInfo,{domain:this.domain}).then((res)=>{
          if(res.success){
            this.hostInfo = res.result.records[0]
          }
        })
      }
    }
  }
</script>