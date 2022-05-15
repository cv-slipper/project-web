<template>
  <a-modal
    width="680px"
    :visible="visible"
    :confirmLoading="confirmLoading"
    okText="执行"
    @cancel="handleCancel"
    @ok="handleOk">
    <a-form>
      <a-row>
        <a-col :span="12">
          <a-form-item label="备份类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <!--            <a-radio-group v-model="rawData.taskInfo.subTasks[0].options.backupOpts.backupLevel">-->
            <a-radio-group v-model="oncePlan.backupType">
              <a-radio :value="1">
                完全
              </a-radio>
              <a-radio :value="2">
                增量
              </a-radio>
              <!--              <a-radio :value="3">-->
              <!--                差分-->
              <!--              </a-radio>-->
              <!--              <a-radio :value="4">-->
              <!--                综合完全-->
              <!--              </a-radio>-->
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group v-model="oncePlan.type">
              <a-radio value="立即">
                立即
              </a-radio>
              <a-radio value="计划">
                计划
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>

      </a-row>
      <a-row>
        <a-col :span="12"><span> </span></a-col>
        <a-col :span="12" v-show="oncePlan.type=='计划'">
          <a-form-item label="计划" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-cron ref="innerVueCron" v-model="oncePlan.planTime"></j-cron>
          </a-form-item>
        </a-col>
      </a-row>

    </a-form>

  </a-modal>
</template>

<script>

  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import { initDictOptions } from '@/components/dict/JDictSelectUtil'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import JCron from '@/components/jeecg/JCron.vue'
  import { httpAction } from '@/api/manage'

  export default {
    name: 'createTaskModal',
    components: {
      JCron,
      JEllipsis,
      JDictSelectTag
    },
    data() {
      return {
        visible: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 10 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 11 }
        },
        confirmLoading: false,
        oncePlan: {
          domain: '',
          clientId: '',
          client: '',
          subClientId: '',
          subClient: '',
          planTime: '* * * * * ? *',
          backupType: 2,
          jobId: '',
          status: '',
          type: '',
          taskData: ''
        },
        domain: '',
        taskData: {
          taskInfo: {
            associations: {
              _type_: '',
              appName: '',
              applicationId: '',
              backupsetName: '',
              backupsetId: '',
              clientName: '',
              clientId: '',
              commCellId: '',
              instanceName: '',
              instanceId: '',
              subclientName: '',
              subclientId: ''
            },
            subTasks: {
              options: {
                backupOpts: {
                  backupLevel: '',
                  collectMetaInfo: '',
                  doNotTruncateLog: '',
                  incLevel: '',
                  isSpHasInLineCopy: '',
                  runIncrementalBackup: '',
                  runSILOBackup: '',
                  sybaseSkipFullafterLogBkp: '',
                  truncateLogsOnSource: '',
                  dataOpt: {
                    createNewIndex: '',
                    enableIndexCheckPointing: '',
                    enforceTransactionLogUsage: '',
                    followMountPoints: '',
                    skipCatalogPhaseForSnapBackup: '',
                    skipConsistencyCheck: '',
                    spaceReclamation: '',
                    verifySynthFull: ''
                  },
                  dataPathOpt: {
                    drive: {
                      driveId: ''
                    },
                    drivePool: {
                      drivePoolId: ''
                    },
                    library: {
                      libraryId: ''
                    },
                    mediaAgent: {
                      mediaAgentId: ''
                    },
                    spareGroup: {
                      spareMediaGroupId: ''
                    }
                  },
                  mediaOpt: {
                    allowOtherSchedulesToUseMediaSet: '',
                    markMediaFullOnSuccess: '',
                    numberofDays: '',
                    reserveResourcesBeforeScan: '',
                    retentionJobType: '',
                    startNewMedia: ''
                  },
                  vaultTrackerOpt: {
                    excludeMediaNotCopied: '',
                    exportMediaAfterJobFinishes: '',
                    filterMediaByRetention: '',
                    mediaWithExtendedRetentionJobs: '',
                    trackTransit: '',
                    useVirtualMailSlots: '',
                    exportLocation: {},
                    inTransitLocation: {},
                    mediaStatus: {
                      active: '',
                      all: '',
                      bad: '',
                      full: '',
                      overwriteProtected: ''
                    }
                  },
                  vsaBackupOptions: {
                    backupFailedVMsOnly: false
                  }
                },
                commonOpts: {
                  jobDescription: '',
                  jobRetryOpts: {
                    enableNumberOfRetries: '',
                    killRunningJobWhenTotalRunningTimeExpires: '',
                    numberOfRetries: '',
                    runningTime: {
                      enableTotalRunningTime: '',
                      totalRunningTime: ''
                    }
                  },
                  startUpOpts: {
                    priority: '',
                    startInSuspendedState: '',
                    useDefaultPriority: ''
                  }
                }
              },
              pattern: {
                active_end_date: '',
                active_end_occurence: '',
                active_end_time: '',
                active_start_date: '',
                active_start_time: '',
                description: '',
                flags: '',
                freq_interval: '',
                freq_recurrence_factor: '',
                freq_relative_interval: '',
                freq_restart_interval: '',
                freq_subday_interval: '',
                freq_type: '',
                name: '',
                patternId: '',
                calendar: {
                  calendarId: '',
                  calendarName: ''
                },
                daysToRun: {
                  Monday: '',
                  Tuesday: '',
                  Wednesday: '',
                  Thursday: '',
                  Friday: '',
                  Saturday: '',
                  Sunday: '',
                  day: '',
                  week: '',
                  onDayNumber: ''
                },
                repeatPattern: {
                  exception: '',
                  occurrence: '',
                  onDay: '',
                  onDayNumber: ''
                },
                timeZone: {
                  TimeZoneId: '',
                  TimeZoneName: ''
                }
              },
              subTask: {
                operationType: '',
                subTaskType: ''
              }
            },
            task: {
              initiatedFrom: '',
              policyType: '',
              sequenceNumber: '',
              taskId: '',
              taskType: '',
              alert: {
                alertId: '',
                alertName: ''
              },
              taskFlags: {
                disabled: ''
              }
            }
          }
        },
        rawData: {
          taskInfo: {
            associations: [
              {
                applicationId: 33,
                clientId: 0,
                clientName: '',
                subclientName: '',
                subclientId: '',
                commCellId: 0,
                backupsetName: 'defaultBackupSet',
                _type_: 7,
                appName: 'File System'
              }
            ],
            task: {
              sequenceNumber: 10,
              initiatedFrom: 2,
              taskType: 1,
              policyType: 0,
              taskId: 0,
              taskFlags: {
                disabled: false
              }
            },
            subTasks: [
              {
                subTask: {
                  subTaskType: 2,
                  operationType: 2
                },
                options: {
                  backupOpts: {
                    truncateLogsOnSource: false,
                    sybaseSkipFullafterLogBkp: false,
                    backupLevel: 1,
                    runIncrementalBackup: true,
                    isSpHasInLineCopy: false,
                    runSILOBackup: false,
                    doNotTruncateLog: false,
                    dataOpt: {
                      skipCatalogPhaseForSnapBackup: false,
                      followMountPoints: true,
                      enableIndexCheckPointing: false,
                      enforceTransactionLogUsage: false,
                      spaceReclamation: false,
                      skipConsistencyCheck: false,
                      createNewIndex: false,
                      verifySynthFull: false
                    },
                    dataPathOpt: {
                      mediaAgent: {
                        mediaAgentId: 0
                      },
                      library: {
                        libraryId: 0
                      },
                      drivePool: {
                        drivePoolId: 0
                      },
                      spareGroup: {
                        spareMediaGroupId: 0
                      },
                      drive: {
                        driveId: 0
                      }
                    },
                    mediaOpt: {
                      markMediaFullOnSuccess: false,
                      numberofDays: 30,
                      startNewMedia: true,
                      retentionJobType: 2,
                      allowOtherSchedulesToUseMediaSet: true,
                      reserveResourcesBeforeScan: false
                    }
                  },
                  commonOpts: {
                    jobDescription: '',
                    jobRetryOpts: {
                      killRunningJobWhenTotalRunningTimeExpires: false,
                      numberOfRetries: 0,
                      enableNumberOfRetries: false,
                      runningTime: {
                        enableTotalRunningTime: false,
                        totalRunningTime: 3600
                      }
                    },
                    startUpOpts: {
                      startInSuspendedState: false,
                      useDefaultPriority: true,
                      priority: 166
                    }
                  }
                }
              }
            ]
          }
        },
        url: {
          createTask: '/job/createTask',
          addOncePlan: '/cvOncePlan/add'
        }
      }
    },
    created() {

      initDictOptions('applicationId').then((res) => {
        if (res.success) {
          this.applicationId = res.result
        }
      })
    },
    mounted() {
      this.oncePlan.backupType = 2
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      initDictConfig() {

      },
      add() {
        this.visible = true
      },
      create(item, subClientEntity) {
        if ((item.treeData[0].key == subClientEntity.subClientId && item.treeData[0].title == subClientEntity.subClientName)
          || Object.keys(subClientEntity).length == 0 || (subClientEntity.subClientId).toString().includes("/%P")) {
          this.$message.warning('请正确选择子客户端')
          return
        }
        this.visible = true
        this.rawData.taskInfo.associations[0].clientId = item.clientId
        this.rawData.taskInfo.associations[0].clientName = item.clientName
        this.rawData.taskInfo.associations[0].subclientId = subClientEntity.subClientId
        this.rawData.taskInfo.associations[0].subclientName = subClientEntity.subClientName
        this.oncePlan.clientId = item.clientId
        this.oncePlan.client = item.clientName
        this.oncePlan.subClientId = subClientEntity.subClientId
        this.oncePlan.subClient = subClientEntity.subClientName
        this.domain = item.domain
        this.oncePlan.domain = item.domain

      },
      async handleOk() {
        this.confirmLoading = true
        let param = {}
        param.domain = this.domain
        this.rawData.taskInfo.subTasks[0].options.backupOpts.backupLevel = this.oncePlan.backupType
        this.oncePlan.taskData = JSON.stringify(this.rawData)
        param.params = this.rawData
        if (this.oncePlan.type === '立即') {
          await httpAction(this.url.createTask, param, 'post').then((res) => {
            if (res.success) {
              let result = res.message
              let jobIds = JSON.parse(res.message).join(",")
              this.oncePlan.jobId = jobIds
              this.oncePlan.status = 'success'
              httpAction(this.url.addOncePlan, this.oncePlan, 'post').then((res) => {
                if (res.success) {
                  this.$message.success(result)
                }
              })
            } else {
              this.$message.warning(res.message)
            }
          })
        } else {
          this.oncePlan.status = 'wait'
          await httpAction(this.url.addOncePlan, this.oncePlan, 'post').then((res) => {
            if (res.success) {
              this.$message.success('已保存计划')
            } else {
              this.$message.warning(res.message)
            }
          })
        }
        this.handleCancel()
        this.confirmLoading = false
      },
      handleCancel() {
        this.oncePlan = {
          domain: '',
          clientId: '',
          client: '',
          subClientId: '',
          subClient: '',
          planTime: '* * * * * ? *',
          backupType: 2,
          jobId: '',
          status: '',
          type: '',
          taskData: ''
        }
        this.dataSource = {}
        this.subclient = {}
        this.visible = false
      }

    }
  }
</script>
<style scoped>

</style>