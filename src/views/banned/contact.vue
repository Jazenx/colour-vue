<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input style="width: 250px;" class="filter-item" placeholder="请输入联系方式" v-model="listQuery.searchKeyword">
      </el-input>
      <el-select clearable style="width: 200px" class="filter-item" v-model="listQuery.searchLocation" multiple placeholder="请选择范围">
        <el-option v-for="item in locationSel" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable style="width: 200px" class="filter-item" v-model="listQuery.searchWordType" placeholder="请选择类别">
        <el-option v-for="item in classifySel" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable style="width: 200px" class="filter-item" v-model="listQuery.searchWordstate" placeholder="请选择状态">
        <el-option v-for="item in wordStateSel" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="getList">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="plus">添加</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="minus" s @click="deleteKeyword()">删除</el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="exportExcel">导出</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="努力加载中..." border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" label="联系方式">
        <template scope="scope">
          <el-input v-show="scope.row.edit" size="small" v-model="scope.row.keyword"></el-input>
          <span v-show="!scope.row.edit">{{ scope.row.keyword }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类别">
        <template scope="scope">
          <span>{{scope.row.classify}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="范围" style="width: 10%">
        <template scope="scope">
          <el-select v-model="scope.row.locations" multiple placeholder="请选择" v-show="scope.row.edit">
            <el-option v-for="item in locationSel" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <span v-show="!scope.row.edit">{{scope.row.location}}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="有效期" width="270px">
        <template scope="scope">
          <span v-show="!scope.row.edit">{{scope.row.validity}}</span>
          <el-date-picker v-show="scope.row.edit" v-model="scope.row.validity" type="daterange" placeholder="选择日期范围" :picker-options="pickerOptions">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" align="center" label="状态" width="80px">
        <template scope="scope">
          <el-tag :type="scope.row.wordstate | statusFilter" close-transition>{{scope.row.wordstate}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="提交人" align="center" width="80px">
        <template scope="scope">
          <span>{{scope.row.submitor}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作时间" width="200px">
        <template scope="scope">
          <span>{{scope.row.updatetime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150px">
        <template scope="scope">
          <el-button :type="scope.row.edit?'success':'primary'" @click='updateKeywordDetail(scope.row)' size="small">{{scope.row.edit?'完成':'编辑'}}</el-button>
          <el-button v-if="scope.row.wordstate!='生效'" size="small" @click="handleModifyStatus(scope.row,'生效')">生效
          </el-button>
          <el-button v-if="scope.row.wordstate!='失效'" size="small" type="danger" @click="handleModifyStatus(scope.row,'失效')"> 失效
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" style="width: 900px;margin-left:23%">
      <el-form class="small-space" :model="form" :rules="submitRules" ref="form" label-position="left" label-width="70px" style='width: 300px; margin-left:50px;'>
        <el-form-item label="联系方式" prop="keywords">
          <el-input type="textarea" :rows="2" v-model="form.keywords" placeholder="请输入联系方式,多个以“回车符”换行！"></el-input>
        </el-form-item>
        <el-form-item label="范围" prop="location">
          <el-select v-model="form.location" multiple placeholder="请选择范围">
            <el-option v-for="item in locationSel" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="classify">
          <el-select v-model="form.classify" placeholder="请选择分类">
            <el-option v-for="item in classifySel" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="有效期">
          <el-date-picker v-model="validity" type="daterange" placeholder="选择日期范围" @change="dateChange" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="create">创建</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { fetchPv, addContacts, getContacts, updateContacts, changeContactsStatus, deleteContacts, getContactClassifyList, getLocationDropdownList } from '@/api/banned'
import waves from '@/directive/waves.js'// 水波纹指令
import { parseTime } from '@/utils'
import store from '../../store'

export default {
  name: 'contacts',
  directives: {
    waves
  },
  data() {
    return {
      activeName: 'first',
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        searchKeyword: null,
        searchLocation: [],
        searchWordType: null,
        searchWordstate: null
      },
      // searchKeyword: '',
      form: {
        validity: this.getCreateYMDTime(),
        wordstate: '',
        updatetime: '',
        keywords: '',
        submitor: '',
        location: [],
        classify: ''
      },
      // statusOptions: ['published', 'draft', 'deleted'],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      showAuditor: false,
      tableKey: 0,
      location: [],
      // searchLocation: [],
      validity: [new Date(), new Date(2099, 11, 31, 0, 0)],
      addValidity: '',
      value6: '',
      multipleSelection: [],
      // searchWordstate: '全部',
      classify: '',
      classifySel: null,
      wordStateSel: [{
        value: '全部',
        label: '全部'
      }, {
        value: '生效',
        label: '生效'
      }, {
        value: '失效',
        label: '失效'
      }],
      locationSel: [],
      submitRules: {
        keywords: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        location: [
          { type: 'array', required: true, message: '请选择范围', trigger: 'change' }
        ],
        classify: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '1天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '3天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 3);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '7天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '30天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }
        ]
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        生效: 'success',
        失效: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList();
    this.getClassify();
    this.getLocation();
  },
  methods: {
    getList() {
      console.log(this.listQuery);
      this.listLoading = true
      getContacts(this.listQuery).then(response => {
        console.log(response.data);
        this.list = response.data.items.map(v => {
          let location = [];
          location = v.location.split('、');
          this.$set(v, 'locations', location);
          this.$set(v, 'edit', false)
          return v
        })
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getLocation() {
      getLocationDropdownList().then(response => {
        console.log(response.data);
        this.locationSel = response.data.location
      })
    },
    getClassify() {
      getContactClassifyList().then(response => {
        console.log(response.data.classify);
        this.classifySel = response.data.classify
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$confirm('此操作将修改关键词状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.wordstate = status
        changeContactsStatus(row.id, status).then(response => {
          console.log(response);
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    getYMDTime(date) {
      if (typeof date !== 'object') {
        console.log('不是日期对象');
        return null;
      }
      const seperator1 = '-';
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      return date.getFullYear() + seperator1 + month + seperator1 + strDate;
    },
    getNowTime() {
      const date = new Date();
      const seperator1 = '-';
      const seperator2 = ':';
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      return date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    },
    updateKeywordDetail(row) {
      row.edit = !row.edit
      if (row.edit) {
        console.log('开启修改');
      } else {
        if (typeof row.validity[0] === 'object') {
          const validity = this.getYMDTime(row.validity[0]) + ' - ' + this.getYMDTime(row.validity[1]);
          row.validity = validity;
        }
        row.updatetime = this.getNowTime();
        row.submitor = store.state.user.name;  // 之后获取当前用户
        console.log(row.id, row.keyword, row.location, row.validity, row.submitor, row.updatetime)
        let tempLocation = '';
        for (const v of row.locations) {
          tempLocation += v + '、';
        }
        row.location = tempLocation.substr(0, tempLocation.length - 1)
        updateContacts(row.id, row.keyword, row.validity, row.updatetime, row.submitor, row.location).then(response => {
          console.log(response);
          this.getList();
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    getCreateYMDTime() {
      const date = new Date();
      const seperator1 = '-';
      const seperator2 = ':';
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      return date.getFullYear() + seperator1 + month + seperator1 + strDate + ' - 2099-12-31';
    },
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.wordstate = '生效';
          this.form.submitor = store.state.user.name;
          this.dialogFormVisible = false;
          // 获取当前时间 之后可抽出
          const date = new Date();
          const seperator1 = '-';
          const seperator2 = ':';
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = '0' + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate;
          }
          const updatetime = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
          let keywords = [];
          keywords = this.form.keywords.split('\n');
          // console.log(keywords, this.form.validity, updatetime, this.form.submitor, this.location, this.form.wordstate, this.form.classify);
          addContacts(keywords, this.form.validity, updatetime, this.form.submitor, this.form.location, this.form.wordstate, this.form.classify).then(response => {
                      if (response.data.result === 1) {
              this.$notify({
                title: '重复',
                message: response.data.msg + '内容重复',
                type: 'warning',
                duration: 2000
              })
            } else if (response.data.result === 2) {
              this.$notify({
                title: '错误',
                message: response.data.msg,
                type: 'error',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            }
            this.getList();
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    update() {
      this.temp.timestamp = +this.temp.timestamp
      for (const v of this.list) {
        if (v.id === this.temp.id) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1, this.temp)
          break
        }
      }
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 0,
        remark: '',
        timestamp: 0,
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    dateChange(val) {
      console.log(val);
      return this.form.validity = val;
    },
    filterTag(value, row) {
      console.log(value);
      console.log(row);
      return row.wordstate === value;
    },
    handleSelectionChange(val) {
      for (const item of val) {
        this.multipleSelection.push(item.id)
      }
    },
    deleteKeyword() {
      this.$confirm('此操作将批量删除联系方式, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        deleteContacts(this.multipleSelection).then(response => {
          console.log(response);
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    exportExcel() {
      location.href = 'export/excel/blacklist/contacts';
      this.$notify({
        title: '成功',
        message: '导出成功',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>
