<template>
  <a-modal
    width="80%"
    :visible="visible"
    okText="创建"
    @cancel="handleCancel"
    @ok="handleOk">
    <a-form>
      <a-row>
        <a-col :span="12">
          <a-form-item label="备份域" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-dict-select-tag type="list" v-model="domain" dictCode="domain" placeholder="请选择备份域"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="_type_" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.associations._type_" placeholder="请输入_type_"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="appName" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-dict-select-tag v-model="taskData.taskInfo.associations.appName" dictCode="appName" placeholder="请输入-appName"/>
<!--            <a-input v-model="taskData.taskInfo.associations.appName" placeholder="请输入-appName"></a-input>-->
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="applicationId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-dict-select-tag type="list" v-model="taskData.taskInfo.associations.applicationId" dictCode="applicationId" placeholder="请选择-applicationId"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="backupsetName" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.associations.backupsetName" placeholder="请输入-backupsetName"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="backupsetId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.associations.backupsetId" placeholder="请输入-backupsetId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="clientName" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.associations.clientName" placeholder="请输入-clientName"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="clientId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.associations.clientId" placeholder="请输入-clientId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="commCellId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.associations.commCellId" placeholder="请输入-commCellId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="instanceName" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.associations.instanceName" placeholder="请输入-instanceName"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="instanceId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.associations.instanceId" placeholder="请输入-instanceId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="subclientName" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.associations.subclientName" placeholder="请输入-subclientName"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="subclientId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.associations.subclientId" placeholder="请输入-subclientId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="backupLevel" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.backupLevel" placeholder="请输入-backupLevel"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="collectMetaInfo" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.collectMetaInfo" placeholder="请输入-collectMetaInfo"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="doNotTruncateLog" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.doNotTruncateLog" placeholder="请输入-doNotTruncateLog"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="incLevel" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.incLevel" placeholder="请输入-incLevel"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="isSpHasInLineCopy" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.isSpHasInLineCopy" placeholder="请输入-isSpHasInLineCopy"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="runIncrementalBackup" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.runIncrementalBackup" placeholder="请输入-runIncrementalBackup"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="runSILOBackup" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.runSILOBackup" placeholder="请输入-runSILOBackup"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="sybaseSkipFullafterLogBkp" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.sybaseSkipFullafterLogBkp" placeholder="请输入-sybaseSkipFullafterLogBkp"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="truncateLogsOnSource" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.truncateLogsOnSource" placeholder="请输入-truncateLogsOnSource"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="createNewIndex" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataOpt.createNewIndex" placeholder="请输入-truncateLogsOnSource"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="enableIndexCheckPointing" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataOpt.enableIndexCheckPointing" placeholder="请输入-enableIndexCheckPointing"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="enforceTransactionLogUsage" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataOpt.enforceTransactionLogUsage" placeholder="请输入-enforceTransactionLogUsage"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="followMountPoints" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataOpt.followMountPoints" placeholder="请输入-followMountPoints"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="skipCatalogPhaseForSnapBackup" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataOpt.skipCatalogPhaseForSnapBackup" placeholder="请输入-skipCatalogPhaseForSnapBackup"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="skipConsistencyCheck" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataOpt.skipConsistencyCheck" placeholder="请输入-skipConsistencyCheck"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="spaceReclamation" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataOpt.spaceReclamation" placeholder="请输入-spaceReclamation"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="verifySynthFull" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataOpt.verifySynthFull" placeholder="请输入-verifySynthFull"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="driveId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataPathOpt.drive.driveId" placeholder="请输入-driveId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="drivePoolId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataPathOpt.drivePool.drivePoolId" placeholder="请输入-drivePoolId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="libraryId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataPathOpt.library.libraryId" placeholder="请输入-libraryId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="mediaAgentId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataPathOpt.mediaAgent.mediaAgentId" placeholder="请输入-mediaAgentId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="spareMediaGroupId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.dataPathOpt.spareGroup.spareMediaGroupId" placeholder="请输入-spareMediaGroupId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="allowOtherSchedulesToUseMediaSet" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.mediaOpt.allowOtherSchedulesToUseMediaSet" placeholder="请输入-allowOtherSchedulesToUseMediaSet"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="markMediaFullOnSuccess" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.mediaOpt.markMediaFullOnSuccess" placeholder="请输入-markMediaFullOnSuccess"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="numberofDays" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.mediaOpt.numberofDays" placeholder="请输入-numberofDays"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="reserveResourcesBeforeScan" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.mediaOpt.reserveResourcesBeforeScan" placeholder="请输入-reserveResourcesBeforeScan"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="retentionJobType" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.mediaOpt.retentionJobType" placeholder="请输入-retentionJobType"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="startNewMedia" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.mediaOpt.startNewMedia" placeholder="请输入-startNewMedia"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="excludeMediaNotCopied" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.vaultTrackerOpt.excludeMediaNotCopied" placeholder="请输入-excludeMediaNotCopied"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="exportMediaAfterJobFinishes" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.vaultTrackerOpt.exportMediaAfterJobFinishes" placeholder="请输入-exportMediaAfterJobFinishes"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="filterMediaByRetention" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.vaultTrackerOpt.filterMediaByRetention" placeholder="请输入-filterMediaByRetention"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="mediaWithExtendedRetentionJobs" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.vaultTrackerOpt.mediaWithExtendedRetentionJobs" placeholder="请输入-mediaWithExtendedRetentionJobs"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="trackTransit" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.vaultTrackerOpt.trackTransit" placeholder="请输入-trackTransit"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="useVirtualMailSlots" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.vaultTrackerOpt.useVirtualMailSlots" placeholder="请输入-useVirtualMailSlots"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="active" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.vaultTrackerOpt.mediaStatus.active" placeholder="请输入-active"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="all" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.vaultTrackerOpt.mediaStatus.all" placeholder="请输入-all"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="bad" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.vaultTrackerOpt.mediaStatus.bad" placeholder="请输入-bad"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="full" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.vaultTrackerOpt.mediaStatus.full" placeholder="请输入-full"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="overwriteProtected" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.backupOpts.vaultTrackerOpt.mediaStatus.overwriteProtected" placeholder="请输入-overwriteProtected"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="jobDescription" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.commonOpts.jobDescription" placeholder="请输入-jobDescription"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="enableNumberOfRetries" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.commonOpts.jobRetryOpts.enableNumberOfRetries" placeholder="请输入-enableNumberOfRetries"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="killRunningJobWhenTotalRunningTimeExpires" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.commonOpts.jobRetryOpts.killRunningJobWhenTotalRunningTimeExpires" placeholder="请输入-killRunningJobWhenTotalRunningTimeExpires"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="numberOfRetries" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.commonOpts.jobRetryOpts.numberOfRetries" placeholder="请输入-numberOfRetries"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="enableTotalRunningTime" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.commonOpts.jobRetryOpts.runningTime.enableTotalRunningTime" placeholder="请输入-enableTotalRunningTime"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="totalRunningTime" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.commonOpts.jobRetryOpts.runningTime.totalRunningTime" placeholder="请输入-totalRunningTime"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="priority" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.commonOpts.startUpOpts.priority" placeholder="请输入-priority"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="startInSuspendedState" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.commonOpts.startUpOpts.startInSuspendedState" placeholder="请输入-startInSuspendedState"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="useDefaultPriority" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.options.commonOpts.startUpOpts.useDefaultPriority" placeholder="请输入-useDefaultPriority"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="active_end_date" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.active_end_date" placeholder="请输入-active_end_date"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="active_end_time" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.active_end_time" placeholder="请输入-active_end_time"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="active_start_date" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.active_start_date" placeholder="请输入-active_start_date"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="active_start_time" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.active_start_time" placeholder="请输入-active_start_time"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="description" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.description" placeholder="请输入-description"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="flags" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.flags" placeholder="请输入-flags"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="freq_interval" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.freq_interval" placeholder="请输入-freq_interval"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="freq_recurrence_factor" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.freq_recurrence_factor" placeholder="请输入-freq_recurrence_factor"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="freq_relative_interval" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.freq_relative_interval" placeholder="请输入-freq_relative_interval"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="freq_restart_interval" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.freq_restart_interval" placeholder="请输入-freq_restart_interval"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="freq_subday_interval" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.freq_subday_interval" placeholder="请输入-freq_subday_interval"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="freq_type" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.freq_type" placeholder="请输入-freq_type"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="name" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.name" placeholder="请输入-name"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="patternId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.patternId" placeholder="请输入-patternId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="calendarId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.calendar.calendarId" placeholder="请输入-calendarId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="calendarName" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.calendar.calendarName" placeholder="请输入-calendarName"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Monday" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.daysToRun.Monday" placeholder="请输入-Monday"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Tuesday" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.daysToRun.Tuesday" placeholder="请输入-Tuesday"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Wednesday" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.daysToRun.Wednesday" placeholder="请输入-Wednesday"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Thursday" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.daysToRun.Thursday" placeholder="请输入-Thursday"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Friday" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.daysToRun.Friday" placeholder="请输入-Friday"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Saturday" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.daysToRun.Saturday" placeholder="请输入-Saturday"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Sunday" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.daysToRun.Sunday" placeholder="请输入-Sunday"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="day" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.daysToRun.day" placeholder="请输入-day"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="week" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.daysToRun.week" placeholder="请输入-week"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="onDayNumber" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.daysToRun.onDayNumber" placeholder="请输入-onDayNumber"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="repeatPattern" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.repeatPattern.exception" placeholder="请输入-exception"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="occurrence" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.repeatPattern.occurrence" placeholder="请输入-occurrence"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="onDay" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.repeatPattern.onDay" placeholder="请输入-onDay"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="onDayNumber" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.repeatPattern.onDayNumber" placeholder="请输入-onDayNumber"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="TimeZoneId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.timeZone.TimeZoneId" placeholder="请输入-TimeZoneId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="TimeZoneName" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.pattern.timeZone.TimeZoneName" placeholder="请输入-TimeZoneName"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="operationType" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.subTask.operationType" placeholder="请输入-operationType"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="subTaskType" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.subTasks.subTask.subTaskType" placeholder="请输入-subTaskType"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="initiatedFrom" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.task.initiatedFrom" placeholder="请输入-initiatedFrom"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="policyType" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.task.policyType" placeholder="请输入-policyType"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="sequenceNumber" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.task.sequenceNumber" placeholder="请输入-sequenceNumber"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="taskId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.task.taskId" placeholder="请输入-taskId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="taskType" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.task.taskType" placeholder="请输入-taskType"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="alertId" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.task.alert.alertId" placeholder="请输入-alertId"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="alertName" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.task.alert.alertName" placeholder="请输入-alertName"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="disabled" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="taskData.taskInfo.task.taskFlags.disabled" placeholder="请输入-disabled"></a-input>
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
  import { getAction } from '@/api/manage'
  import dayjs from 'dayjs'
  import { httpAction } from '@/api/manage'

  export default {
    name: 'DetailModal',
    components: {
      JEllipsis,
      JDictSelectTag
    },
    data() {
      return {
        visible: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 10 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 11 },
        },
        domain:"",
        taskData:{
          taskInfo:{
            associations:{
              _type_:"",
              appName:"",
              applicationId:"",
              backupsetName:"",
              backupsetId:"",
              clientName:"",
              clientId:"",
              commCellId:"",
              instanceName:"",
              instanceId:"",
              subclientName:"",
              subclientId:"",
            },
            subTasks:{
              options:{
                backupOpts:{
                  backupLevel:"",
                  collectMetaInfo:"",
                  doNotTruncateLog:"",
                  incLevel:"",
                  isSpHasInLineCopy:"",
                  runIncrementalBackup:"",
                  runSILOBackup:"",
                  sybaseSkipFullafterLogBkp:"",
                  truncateLogsOnSource:"",
                  dataOpt:{
                    createNewIndex:"",
                    enableIndexCheckPointing:"",
                    enforceTransactionLogUsage:"",
                    followMountPoints:"",
                    skipCatalogPhaseForSnapBackup:"",
                    skipConsistencyCheck:"",
                    spaceReclamation:"",
                    verifySynthFull:"",
                  },
                  dataPathOpt:{
                    drive:{
                      driveId:""
                    },
                    drivePool:{
                      drivePoolId:""
                    },
                    library:{
                      libraryId:""
                    },
                    mediaAgent:{
                      mediaAgentId:""
                    },
                    spareGroup:{
                      spareMediaGroupId:""
                    }
                  },
                  mediaOpt:{
                    allowOtherSchedulesToUseMediaSet:"",
                    markMediaFullOnSuccess:"",
                    numberofDays:"",
                    reserveResourcesBeforeScan:"",
                    retentionJobType:"",
                    startNewMedia:"",
                  },
                  vaultTrackerOpt:{
                    excludeMediaNotCopied:"",
                    exportMediaAfterJobFinishes:"",
                    filterMediaByRetention:"",
                    mediaWithExtendedRetentionJobs:"",
                    trackTransit:"",
                    useVirtualMailSlots:"",
                    exportLocation:{},
                    inTransitLocation:{},
                    mediaStatus: {
                      active:"",
                      all:"",
                      bad:"",
                      full:"",
                      overwriteProtected:"",
                    }
                  },
                  vsaBackupOptions:{
                    backupFailedVMsOnly:false
                  }
                },
                commonOpts:{
                  jobDescription:"",
                  jobRetryOpts:{
                    enableNumberOfRetries:"",
                    killRunningJobWhenTotalRunningTimeExpires:"",
                    numberOfRetries:"",
                    runningTime:{
                      enableTotalRunningTime:"",
                      totalRunningTime:"",
                    }
                  },
                  startUpOpts:{
                    priority:"",
                    startInSuspendedState:"",
                    useDefaultPriority:"",
                  }
                }
              },
              pattern:{
                active_end_date:"",
                active_end_occurence:"",
                active_end_time:"",
                active_start_date:"",
                active_start_time:"",
                description:"",
                flags:"",
                freq_interval:"",
                freq_recurrence_factor:"",
                freq_relative_interval:"",
                freq_restart_interval:"",
                freq_subday_interval:"",
                freq_type:"",
                name:"",
                patternId:"",
                calendar:{
                  calendarId:"",
                  calendarName:""
                },
                daysToRun:{
                  Monday:"",
                  Tuesday:"",
                  Wednesday:"",
                  Thursday:"",
                  Friday:"",
                  Saturday:"",
                  Sunday:"",
                  day:"",
                  week:"",
                  onDayNumber:"",
                },
                repeatPattern:{
                  exception:"",
                  occurrence:"",
                  onDay:"",
                  onDayNumber:"",
                },
                timeZone:{
                  TimeZoneId:"",
                  TimeZoneName:"",
                }
              },
              subTask:{
                operationType:"",
                subTaskType:"",
              }
            },
            task:{
              initiatedFrom:"",
              policyType:"",
              sequenceNumber:"",
              taskId:"",
              taskType:"",
              alert : {
                alertId:"",
                alertName:"",
              },
              taskFlags:{
                disabled:""
              }
            }
          }
        },
        rawData:{
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
          createTask: '/job/createTask'
        }
      }
    },
    created() {
      initDictOptions('applicationId').then((res) => {
        if (res.success) {
          console.log('applicationId', res.result)
          this.applicationId = res.result
        }
      })
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      initDictConfig() {

      },
      add(){
        this.visible = true
      },
      showDetail(record) {
        let params = {}
        params.domain = record.domain
        params.jobId = record.workId
        getAction(this.url.dataList, params).then((res) => {
          if (res.success) {
            let records = res.result.records
            if (records.length > 0) {
              let result = records[0]
              let dataSource = JSON.parse(result.jobInfo)
              this.dataSource = dataSource.jobs[0].jobSummary
              this.subclient = this.dataSource.subclient
            } else {
              this.dataSource = {}
            }
            this.visible = true
          } else {
            this.$message.warning(res.message)
          }
        })

      },
      handleOk() {
        let param = {}
        param.domain = this.domain
        param.params = this.rawData
        httpAction(this.url.createTask,param,'post').then((res)=>{
          if(res.success){
            this.$message.success(res.message)
          }else {
            this.$message.warning(res.message)
          }
        })
        this.handleCancel()
      },
      handleCancel() {
        this.dataSource = {}
        this.subclient = {}
        this.visible = false
      },

    }
  }
</script>
<style scoped>

</style>