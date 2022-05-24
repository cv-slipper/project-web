<template>
  <div style='height:100%'>
    <div class='tabs'>
      <div class='tab-list'>
        <a-tabs class='my-tabs' default-active-key='1'>
          <a-tab-pane key='1' tab='生产域'>

          </a-tab-pane>
          <a-tab-pane key='2' tab='分行域'>

          </a-tab-pane>
        </a-tabs>
      </div>
      <div class='reload mr-20' style='cursor:pointer'>
        <div class='flex-center'>
          <img src='@/assets/reload.png' width='20px' height='20px' alt=''>
          <span style='margin-left:5px'>同步正常</span>
        </div>
      </div>
    </div>
    <div class='wrapper mt-20'>
      <div style='display:flex;justify-content:space-between'>
        <div style='width:20.83333%'>
          <div>
            <a-card :bordered='false' style='width: 100%'>
              <div slot='title'>
                <div class='flex-center' style='justify-content:space-between'>
                  <div class='flex-center fl'>
                    <img class='fl' style='width:20px;height:20px' src='@/assets/dailyWork.png' alt=''>
                    <span class='ml-5 fl' style='font-size:14px'>当前作业</span>
                    <div class='fl ml-5'>
                      <span class='reset'>刷新</span>
                    </div>
                  </div>
                  <div class='fr'>
                    <div class='work-control'>
                      <img class='mr-5' src='@/assets/workCon.png' alt='' />
                      作业控制器
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class='flex-box'>
                  <div class='item'>
                    <div class='content'>
                      <div class='title'>运行</div>
                      <div class='num'>9</div>
                    </div>
                  </div>
                  <div class='item'>
                    <div class='content'>
                      <div class='title'>等待</div>
                      <div class='num'>9</div>
                    </div>
                  </div>
                  <div class='item mt-10'>
                    <div class='content'>
                      <div class='title'>暂停</div>
                      <div class='num'>9</div>
                    </div>
                  </div>
                  <div class='item mt-10'>
                    <div class='content'>
                      <div class='title'>未决</div>
                      <div class='num'>9</div>
                    </div>
                  </div>
                </div>
              </div>
            </a-card>
            <div style='height:10px'></div>
            <a-card :bordered='false'>
              <div slot='title'>
                <div class='flex-center'>
                  <img src='@/assets/24h.png' style='width:20px;height:20px' alt=''>
                  <span class='ml-5'>24小时作业</span>
                </div>
              </div>
              <div>
                <div class='flex-box tfh'>
                  <div class='item'>
                    <div class='content'>
                      <div class='title' style='font-size:16px !important'>完成</div>
                      <div class='num' style='font-size:25px'>9</div>
                    </div>
                  </div>
                  <div class='item'>
                    <div class='content'>
                      <div class='title' style='font-size:16px !important'>失败</div>
                      <div class='num' style='font-size:25px'>9</div>
                    </div>
                  </div>
                </div>
              </div>
            </a-card>
            <div style='height:10px'></div>
            <a-card :bordered='false'>
              <div slot='title'>
                <div class='flex-center'>
                  <div class='flex-center' style='width:100%'>
                    <img src='@/assets/currentSuccess.png' style='width:20px;height:20px' alt=''>
                    <span class='ml-5'>备份成功率</span>

                  </div>
                  <div class='fr'>
                    <a-select style='min-width:100px'>
                      <a-select-option value='1'>最近一周</a-select-option>
                      <a-select-option value='2'>最近一月</a-select-option>
                      <a-select-option value='3'>最近一年</a-select-option>
                    </a-select>
                  </div>
                </div>
              </div>
              <backup-success-rate></backup-success-rate>
            </a-card>
          </div>
        </div>
        <div style='width:calc(54.36% - 20px)'>
          <div class='content-top'>
            <div class='flex-between top-list'>
              <div class='item' v-for='(item,index) in listData' :key='index'>
                <div>
                  <div class='title fs-12' style='color:#666666'>{{ item.title }}</div>
                  <div class='num fs-12'>{{ item.num }}{{ item.unit }}</div>
                </div>
                <div>
                  <img :src='item.src' alt='' />
                </div>
              </div>
            </div>
          </div>
          <div class='center-content'>

          </div>
          <div style='height:10px'></div>
          <div class='table-box'>
            <a-card :bordered='false'>
              <div slot='title'>
                <div class='flex-center flex-between' style='height:32px'>
                  <div>
                    <img src='@/assets/abnormal.png' style='width:20px;height:20px' alt=''>
                    <span class='ml-5'>未处理异常信息  <span style='color:#DC2929'> (8)</span></span>
                  </div>
                  <div>
                    <a-icon style='font-size:16px;color:#999999;cursor:pointer' type='fullscreen' />
                  </div>
                </div>

              </div>
              <div>
                <a-table
                  :columns='columns'
                  :data-source='data'
                  :loading='loading'
                  :pagination='false'
                  :scroll='{y:68}'

                >

                </a-table>
              </div>
            </a-card>
          </div>
        </div>
        <div style='width:24.833333%'>
          <a-card :bordered='false'>
            <div slot='title'>
              <div>
                <img src='@/assets/worknum.png' style='width:20px;height:20px' alt=''>
                <span class='ml-5'>每日备份作业数</span>
              </div>
            </div>
            <div>
              <main-trend></main-trend>
            </div>
          </a-card>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import HeadCard from './HeadCard'
import WeekCard from './WeekCard'
import CurrentWork from './CurrentWork'
import MainMap from '@views/dashboard/components/MainMap'
import BackupSuccessRate from '@views/dashboard/components/BackupSuccessRate'
import MainTrend from '@views/dashboard/components/MainTrend'

export default {
  name: 'Analysis',
  components: {
    HeadCard,
    WeekCard,
    CurrentWork,
    MainMap,
    BackupSuccessRate,
    MainTrend
  },
  data() {
    return {
      indexStyle: 1,
      domain: 'prod',
      listData: [
        {
          title: '应用系统',
          num: '149',
          unit: '个',
          src: require('@/assets/app.png')
        },
        {
          title: '客户端',
          num: '149',
          unit: '个',
          src: require('@/assets/client.png')
        },
        {
          title: '介质服务器',
          num: '149',
          unit: '个',
          src: require('@/assets/server.png')
        },
        {
          title: '前端许可',
          num: '149',
          unit: '个',
          src: require('@/assets/front.png')
        },
        {
          title: '磁盘存储／云存储',
          num: '149',
          unit: '个',
          src: require('@/assets/storage.png')

        }
      ],
      columns: [
        {
          title: '异常ID',
          key: 'id',
          width: 100,
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: '应用系统',
          key: 'app',
          width: 100,
          align: 'center',
          dataIndex: 'app'
        },
        {
          title: '发生时间',
          key: 'time',
          width: 140,
          align: 'center',
          dataIndex: 'time'
        },
        {
          title: '异常类型',
          key: 'type',
          width: 120,
          align: 'center',
          dataIndex: 'type'
        },
        {
          title: '描述',
          key: 'desc',
          align: 'center',
          dataIndex: 'desc'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          dataIndex: 'action',
          scopedSlots: {
            customRender: 'action'
          }
        }

      ],
      data: [{}, {}, {}, {}],
      loading: false
    }
  },
  created() {

  },
  methods: {
    handleDomainChange(domain) {
      this.domain = domain
    }

  }
}
</script>
<style scoped lang='less'>
.tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
}

/deep/ .my-tabs .ant-tabs-tab {
  margin: 0 !important;
  background: #F4F5F7;
  color: #9C9A9A;
  padding: 10px 30px;
  border-radius: 5px;
}

/deep/ .my-tabs .ant-tabs-tab-active {
  border: none !important;
  background: #3475EF;
  color: white
}

/deep/ .my-tabs .ant-tabs-bar {
  margin-bottom: 0 !important;
}

/deep/ .my-tabs .ant-tabs-nav-container {
  margin-top: 0 !important;
}

/deep/ .my-tabs .ant-tabs-ink-bar-animated {
  display: none !important;
}

.reset {
  background: rgba(26, 186, 113, 0.09);
  border: 1px solid #1ABA71;
  border-radius: 4px;
  color: #1ABA71;
  font-size: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2px 4px;
  cursor: pointer;
}

.work-control {
  border: 1px solid #76A3F9;
  background: linear-gradient(71deg, #9FC1F0 0%, #5087F0 75%);
  border-radius: 5px;
  font-size: 12px;
  color: white;
  padding: 3px 6px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer
}

/deep/ .wrapper .ant-card-head {
  padding: 0 10px !important;
  font-size: 14px !important
}

/deep/ .wrapper .ant-card-body {
  padding: 10px !important
}

.flex-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .item {
    width: calc(50% - 5px);
    padding: 5px 0;
    background-size: 100% 100% !important;

    .content {
      margin-left: 20%;
      text-align: center;
      display: inline-block;

      .title {
        font-weight: 400;
        color: #333333;
      }

      .num {
        font-size: 20px;
      }


    }
  }

  .item:first-child {
    background: url("../../assets/run.png") no-repeat;

    .num {
      font-weight: 500;
      color: #6C81FF;
    }
  }

  .item:nth-child(2) {
    background: url("../../assets/wait.png") no-repeat;

    .num {
      font-weight: 500;
      color: #36BDF5;
    }
  }

  .item:nth-child(3) {
    background: url("../../assets/pause.png") no-repeat;

    .num {
      font-weight: 500;
      color: #F5C551;
    }
  }

  .item:nth-child(4) {
    background: url("../../assets/unstart.png") no-repeat;

    .num {
      font-weight: 500;
      color: #F7B464;
    }
  }
}

.tfh {
  .item {
    padding: 10px 0;
  }

  .item:first-child {
    background: url("../../assets/finish.png") no-repeat;

    .num {
      color: #5CC8BB !important;
    }

  }

  .item:nth-child(2) {
    background: url("../../assets/error.png") no-repeat;

    .num {
      color: #F17366 !important;
    }

  }
}

.top-list {
  width: 100%;

  .item:nth-child(2) {
    width: calc(17% - 8px);
  }

  .item:first-child {
    width: calc(17% - 8px);
  }

  .item:nth-child(3) {
    width: calc(19% - 8px);
  }

  .item:last-child {
    width: calc(28% - 8px);
  }

  .item {
    width: calc(19% - 8px);
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;

    .title {
      transform: scale(0.8);
    }

    .num {
      transform: scale(0.8);
    }

    img {
      width: 30px;
      object-fit: cover;
    }
  }
}

.center-content {
  width: 100%;
  height: calc(100% - 261px);
  background: white;
}

.table-box {
  width: 100%;
  height: 185px;
}

/deep/ .table-box table thead th {
  padding: 5px 0 !important;
  background: #EDF3FE !important;
  font-size: 14px !important;
  color: #3E3E3E !important;
}

/deep/ .table-box .ant-table-body::-webkit-scrollbar, .info::-webkit-scrollbar {
  height: 9px;
  width: 5px;
  background-color: #4d64bd;
}

// 滚动条颜色
/deep/ .table-box .ant-table-body::-webkit-scrollbar-thumb, .info::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #3475EF;
}

</style>