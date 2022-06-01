<template>
  <div>

    <div class='searchParams'>
      <div class='form-item'>
        <div class='label ml-5'>异常类型：</div>
        <div class='content ml-5'>
          <a-select style='width:100px'>
            <a-select-option v-for='item in exceptionTypeList' :value='item.value' :key='item.value'>{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>严重程度：</div>
        <div class='content ml-5'>
          <a-select style='width:100px'>
            <a-select-option v-for='item in severityList' :value='item.value' :key='item.value'>{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>备份域：</div>
        <div class='content ml-5'>
          <a-select style='width:100px'>
            <a-select-option v-for='item in domainList' :value='item.value' :key='item.value'>{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>应用系统／分行：</div>
        <div class='content ml-5'>
          <a-select style='width:100px'>
            <a-select-option v-for='item in branchList' :value='item.value' :key='item.value'>{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>处理状态：</div>
        <div class='content ml-5'>
          <a-select style='width:100px'>
            <a-select-option v-for='item in processStatusList' :value='item.value' :key='item.value'>{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>处理人：</div>
        <div class='content ml-5'>
          <a-select style='width:100px'>
            <a-select-option v-for='item in processUserList' :value='item.value' :key='item.value'>{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class='searchParams'>
      <div class='form-item'>
        <div class='label'>异常发生时间：</div>
        <div class='content'>
          <a-range-picker></a-range-picker>
        </div>
        <div class='label ml-10'>处理时间：</div>
        <div class='content'>
          <a-range-picker></a-range-picker>
        </div>
        <a-button type='primary ml-10'>查询</a-button>
      </div>
    </div>
    <div class='searchParams'>
      <div class='form-item'>
        <div class='label'>
          <a-button type='primary'>导出</a-button>
        </div>
      </div>
    </div>
    <div class='table-box' style='padding:0px 20px'>
      <a-table
        :data-source='tableData'
        :columns='columns'
        :loading='loading'
        :pagination='pagination'
        :scroll='{x:"100%"}'
      >
        <template #action='row'>
          <div>
            <a-button type='link'>详情</a-button>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      processUserList: [],
      exceptionTypeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '系统异常'
        },
        {
          value: '2',
          label: '业务异常'
        }
      ],
      severityList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '一般'
        },
        {
          value: '2',
          label: '严重'
        }
      ],
      domainList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '系统'
        },
        {
          value: '2',
          label: '业务'
        }
      ],
      branchList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '系统'
        },
        {
          value: '2',
          label: '业务'
        }
      ],
      processStatusList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '未处理'
        },
        {
          value: '2',
          label: '已处理'
        }
      ],
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center',
          customRender: (text, row, index) => {
            return index + 1
          }
        },
        {
          title: '异常ID',
          key: 'exceptionId',
          dataIndex: 'exceptionId',
          align: 'center',
          width: 100
        },
        {
          title: '严重程度',
          key: 'severity',
          dataIndex: 'severity',
          align: 'center',
          width: 100
        },
        {
          title: '备份域',
          key: 'domain',
          dataIndex: 'domain',
          align: 'center',
          width: 100
        },
        {
          title: '应用系统／分行',
          key: 'branch',
          dataIndex: 'branch',
          align: 'center',
          width: 200
        },
        {
          title: '发生时间',
          key: 'occurTime',
          dataIndex: 'occurTime',
          align: 'center',
          width: 200
        },
        {
          title: '异常类型',
          key: 'exceptionType',
          dataIndex: 'exceptionType',
          align: 'center',
          width: 100
        },
        {
          title: '描述',
          key: 'description',
          dataIndex: 'description',
          align: 'center',
          width: 200
        },
        {
          title: '处理状态',
          key: 'processStatus',
          dataIndex: 'processStatus',
          align: 'center',
          width: 100
        },
        {
          title: '处理人',
          key: 'processUser',
          dataIndex: 'processUser',
          align: 'center',
          width: 100
        },
        {
          title: '处理内容',
          key: 'processContent',
          dataIndex: 'processContent',
          align: 'center',
          width: 200
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 200,
          scopedSlots: {
            customRender: 'action'
          }
        }

      ],
      tableData: [{}],
      loading: false,
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0,
        showTotal: total => {
          return `共 ${total} 条`
        }
      }
    }
  }
}
</script>