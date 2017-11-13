<template>
  <div class="app-container">

    <div class="main-container">
      <div style="margin: 15px; display: flex;justify-content:space-between;">
        <label style="float:left">总量：{{total}}</label>
        <div>
          <el-button type="primary" size="small" @click="passAllContent">全部通过</el-button>
          <el-button type="primary" size="small" @click="deleteAllContent">全部删除</el-button>
          <el-button type="primary" size="small" @click="ignoreAllContent">全部忽略</el-button>
          <el-button type="primary" size="small" @click="cancelAllContent">全部取消</el-button>
          <el-button type="success" @click="submitAllOperation">提交</el-button>
        </div>
      </div>
      <div style="margin: 15px;  display: flex;justify-content: space-between;">
        <el-checkbox size="large" v-model="checkAll">全选</el-checkbox>
        <el-button type="danger" size="small">封禁跳转提交</el-button>
      </div>

      <el-row v-for="(item, index) in list" :key="item.pid" v-loading="listLoading" style="margin:12px">
        <el-row class="detail-box" :style="{ backgroundColor: item.bgcolor}">
          <el-col :span="20" style="margin:4px">
            <el-row>
              <label>
                <a class="aTitle">{{item.location}}</a>
              </label>>
              <label>
                <a class="aTitle" :href="item.url" target="_blank">{{item.title}}</a>
              </label>
              <el-tag v-if="item.contenttype != null" type="danger">{{item.contenttype}}</el-tag>
              <el-tag v-if="item.bbsname != null" type="success">论坛:{{item.bbsname}}</el-tag>
            </el-row>
            <el-row style="display: flex;align-items: center;height:22px">
              <el-checkbox :value="item.rowkey" v-model="item.checked"></el-checkbox>
              <h5 class="infoGrey" style="margin-left:10px;cursor:pointer" v-html="item.username" v-clipboard:copy='item.usernamereal' v-clipboard:success='clipboardSuccess'>{{item.username}}</h5>
              <p class="infoGrey">(
                <router-link class="aHref" :to="{ path: '/userinfo', query: { userid: item.userid }}">{{item.userid}}</router-link>） |
                <router-link class="aHref" :to="{ path: '/ipinfo', query: { ip: item.ip }}">{{item.ip}}</router-link> | {{item.subtime}}
              </p>
            </el-row>
            <el-row>
              <el-col :span="20" style="display: flex;align-items: center;height:40px">
                <p class="infoGrey">帖子ID:{{item.pid}}</p>
                <p class="infoGrey" style="margin-left:15px">主题ID:{{item.threadid}}</p>
                <p class="infoGrey" style="margin-left:15px">提交时间:{{item.subtime}}</p>
                <p class="infoGrey" style="margin-left:30px" v-if="item.submitor != null">操作者:{{item.submitor}}</p>
              </el-col>
              <el-col :span="4" style="display: flex;justify-content: center;align-items: center;height:40px">
                <h4 class="infoGrey">{{item.state}}</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-row style="border: 1px solid #d3dce6;background: #f3f3f3;height:130px;width:99%;overflow:auto;margin-top:5px;position:absolute;" v-html="item.content">
              </el-row>
            </el-row>
            <el-row style="margin-top:140px">
              <el-col :span="16" style="display: flex;align-items: center;height:30px">
                <h4 style="color: red">{{item.wordtype}}</h4>
                <p class="infoGrey" style="margin-left:15px">{{item.judgedetail}}</p>
              </el-col>
              <el-col :span="8" style="display: flex;align-items: center;margin-top:5px">
                <el-button type="primary" size="mini" @click="submitOneOperation(item,index,1)">通过</el-button>
                <el-button type="primary" size="mini" @click="submitOneOperation(item,index,2)">删除</el-button>
                <el-button type="primary" size="mini" @click="submitOneOperation(item,index,3)">忽略</el-button>
                <el-button type="primary" size="mini" @click="submitOneOperation(item,index,4)">禁ID</el-button>
                <!-- <el-button type="danger" size="mini" @click="submitOneOperation(item,index,5)">封杀用户</el-button> -->
                <el-button type="danger" size="mini">封杀用户</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3" style="margin:4px">
            <div style="height:220px;display:flex;justify-content: center;align-items: center;">
              <el-radio-group v-model="item.optinfo" @change="changeColor(item)" style="display: flex;flex-direction: column;justify-content: space-between;">
                <div>
                  <el-radio :label="1" class="infoGrey">通过</el-radio>
                </div>
                <div>
                  <el-radio :label="2" class="infoGrey">删除</el-radio>
                </div>
                <div>
                  <el-radio :label="3" class="infoGrey">忽略</el-radio>
                </div>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
      </el-row>
      <div style="margin: 15px; display: flex;justify-content:space-between;">
        <label style="float:left">总量：{{total}}</label>
        <div>
          <el-button type="primary" size="small" @click="passAllContent">全部通过</el-button>
          <el-button type="primary" size="small" @click="deleteAllContent">全部删除</el-button>
          <el-button type="primary" size="small" @click="ignoreAllContent">全部忽略</el-button>
          <el-button type="primary" size="small" @click="cancelAllContent">全部取消</el-button>
          <el-button type="success" @click="submitAllOperation">提交</el-button>
        </div>
      </div>
      <div style="margin: 15px;  display: flex;justify-content: space-between;">
        <el-checkbox size="large" v-model="checkAll">全选</el-checkbox>
        <el-button type="danger" size="small">封禁跳转提交</el-button>
      </div>
      <div v-show="!listLoading" class="pagination-container" style="display: flex;justify-content: center;align-items: center;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageQuery.page" :page-sizes="[5, 10, 20]" :page-size="pageQuery.limit" layout="total, sizes, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import waves from '@/directive/waves.js'// 水波纹指令
import BackToTop from '@/components/BackToTop'
import { getIpList, submitAllList, submitOneOperation } from '@/api/content'
import store from '../../store'
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js'  // use clipboard by v-directive

export default {
  name: 'workstationip',
  components: { Sticky, BackToTop },
  directives: {
    waves,
    clipboard
  },
  props: {
    listQueryIp: {},
    state: {},
    ip: null
  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
      massList: [],
      pageQuery: {
        page: 1,
        limit: 5,
        ip: ''
      }
    };
  },
  computed: {
    checkAll: {
      get() {
        return this.checkedCount === this.list.length;
      },
      set(value) {
        this.lists = this.list.map(item => {
          item.checked = value;
          return item;
        });
      }
    },
    checkedCount: {
      get() {
        return this.list.filter(item => item.checked).length;
      }
    }
  },
  created() {
    this.listLoading = false;
    this.pageQuery.ip = this.ip;
    // this.listQuery = this.listQueryIp;
    this.getList();
  },
  methods: {
    getList() {
      getIpList(this.listQueryIp, this.state, this.pageQuery).then(response => {
        console.log(response.data);
        this.list = response.data.items.map(v => {
          let mainword = [];
          let maincontent = v.content;
          if (v.keyword != null && v.keyword !== '') {
            mainword = v.keyword.split('&');
            for (const word of mainword) {
              if (word != null) {
                maincontent = maincontent.replace(
                  new RegExp(word, 'ig'),
                  '<span style="color: red;font-weight: bold;background-color: yellow;">' +
                  word +
                  '</span>'
                );
              }
            }
          }
          let username = v.username;
          for (const word of mainword) {
            if (word != null) {
              username = username.replace(
                new RegExp(word, 'ig'),
                '<span style="color: red;font-weight: bold;background-color: yellow;">' +
                word +
                '</span>'
              );
            }
          }
          this.$set(v, 'usernamereal', v.username);
          this.$set(v, 'username', username);
          this.$set(v, 'content', maincontent);
          this.$set(v, 'checked', false);
          if (v.optinfo === 0) {
            this.$set(v, 'bgcolor', '#F0FFFF');
          } else if (v.optinfo === 1) {
            this.$set(v, 'bgcolor', '#CCE7CD');
          } else if (v.optinfo === 2) {
            this.$set(v, 'bgcolor', '#FFCCD5');
          } else if (v.optinfo === 3) {
            this.$set(v, 'bgcolor', '#D3D3D3');
          } else {
            this.$set(v, 'bgcolor', '#F0FFFF');
          }
          return v
        })
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.pageQuery.limit = val;
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      this.getList()
    },
    changeColor(item) {
      if (item.optinfo === 0) {
        item.bgcolor = '#F0FFFF';
      } else if (item.optinfo === 1) {
        item.bgcolor = '#CCE7CD';
      } else if (item.optinfo === 2) {
        item.bgcolor = '#FFCCD5';
      } else if (item.optinfo === 3) {
        item.bgcolor = '#D3D3D3';
      } else {
        item.bgcolor = '#F0FFFF';
      }
    },
    passAllContent() {
      this.list.map(v => {
        this.$set(v, 'optinfo', 1);
        return v
      })
    },
    deleteAllContent() {
      this.list.map(v => {
        this.$set(v, 'optinfo', 2);
        return v
      })
    },
    ignoreAllContent() {
      this.list.map(v => {
        this.$set(v, 'optinfo', 3);
        return v
      })
    },
    cancelAllContent() {
      this.list.map(v => {
        this.$set(v, 'optinfo', 0);
        return v
      })
    },
    submitAllOperation() {
      this.massList = [];
      this.listLoading = true;
      this.list.map(v => {
        if (v.checked) {
          this.massList.push(v);
        }
        return v
      })
      console.log(this.massList);
      this.submitor = store.state.user.name; // 获取操作者名字
      submitAllList(this.massList, this.submitor).then(response => {
        console.log(response);
        this.$notify({
          title: '成功',
          message: '批量提交成功',
          type: 'success',
          duration: 2000
        })
        this.getList();
      })
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    },
    submitOneOperation(row, index, opt) {
      this.submitor = store.state.user.name; // 获取操作者名字
      // row.push({ optsubmitor: this.submitor });
      // row.push({ optx: optx });
      row.optsubmitor = this.submitor;
      row.opt = opt;
      console.log(row);
      submitOneOperation(row).then(response => {
        this.list.splice(index, 1);
        console.log(response);
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        });
      });
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.main-container {
  border: 1px solid #d3dce6;
  margin: 80px;
  margin-top: 10px;
  background: #f3f3f3
}

.detail-box {
  border: 1px solid #d3dce6; // background: #F0FFFF
}

.aTitle {
  color: #4682B4;
}

.aHref {
  color: #00BFFF;
  text-decoration: underline;
}

.infoGrey {
  color: #808080;
}
</style>
