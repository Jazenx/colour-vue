
  <template>
  <div class="app-container">
    <div class="main-container" v-loading="mainLoading">
      <div style="margin: 20px">
        <div>
          <el-button type="info" size="small" @click="changeState(0)">全部</el-button>
          <el-button type="info" size="small" @click="changeState(1)">待审</el-button>
          <el-button type="info" size="small" @click="changeState(2)">删除</el-button>
          <el-button type="info" size="small" @click="changeState(3)">通过</el-button>
          <el-button type="info" size="small" @click="changeState(4)">误删</el-button>
          <el-button type="info" size="small" @click="changeState(5)">漏删</el-button>
          <el-select v-model="state.timeHourpick" placeholder="请选择时间段" style="float:right; width:110px">
            <el-option v-for="item in timeSel" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker v-model="state.timeDayPick" type="date" placeholder="选择日期" style="float:right;margin-right:30px;width:120px" format="yyyy-MM-dd" @change="dateChange">
          </el-date-picker>
        </div>
        <div style="margin: 15px 0;"></div>
        <el-form>
          <el-form-item label="当前状态:">
            <el-radio-group v-model="state.currentState" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">通过</el-radio-button>
              <el-radio-button label="2">待审</el-radio-button>
              <el-radio-button label="3">删除</el-radio-button>
              <el-radio-button label="4">通过+待审</el-radio-button>
              <el-radio-button label="5">通过+删除</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="人工审核:">
            <el-radio-group v-model="state.humanReview" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">未确认</el-radio-button>
              <el-radio-button label="2">已确认</el-radio-button>
              <el-radio-button label="3">已忽略</el-radio-button>
            </el-radio-group>
            <el-button v-show="!listViewOpen" size="mini" type="warning" plain style="float:right" @click="listViewOpen=true">完整选项</el-button>
          </el-form-item>
          <div v-show="listViewOpen">
            <el-form-item label="内容类型:">
              <el-radio-group v-model="state.contentType" size="small">
                <el-radio-button label="0">不限</el-radio-button>
                <el-radio-button label="1">主题</el-radio-button>
                <el-radio-button label="2">回复</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="识别类型:">
              <el-radio-group v-model="state.indentifyType" size="small">
                <el-radio-button label="0">不限</el-radio-button>
                <el-radio-button label="1">涉政</el-radio-button>
                <el-radio-button label="2">涉黄</el-radio-button>
                <el-radio-button label="3">涉恐</el-radio-button>
                <el-radio-button label="4">广告</el-radio-button>
                <el-radio-button label="5">低俗</el-radio-button>
                <el-radio-button label="6">敏感</el-radio-button>
                <el-radio-button label="7">灌水</el-radio-button>
                <el-radio-button label="8">个性</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="彩数识别:">
              <el-radio-group v-model="state.colourdataType" size="small">
                <el-radio-button label="0">不限</el-radio-button>
                <el-radio-button label="1">通过</el-radio-button>
                <el-radio-button label="2">待审</el-radio-button>
                <el-radio-button label="3">删除</el-radio-button>
              </el-radio-group>
              <el-button size="mini" type="warning" plain style="float:right" @click="listViewOpen=false">简略选项</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <sticky className="sub-navbar">
        <el-select v-model="listQuery.seachCondition" placeholder="请选择筛选条件" class="filter-item" style="float:left;margin-left:20px">
          <el-option v-for="item in seachSel" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input style="width: 250px;float:left;margin-left:20px" class="filter-item" :placeholder="'请输入'+seachCondition" v-model="listQuery.seachContent">
        </el-input>
        <el-button class="filter-item" type="success" style="float:left;margin-left:20px;margin-top:8px" v-waves icon="search" @click="getList">搜索</el-button>
      </sticky>
      <div style="margin: 15px 0;"></div>
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
        <el-checkbox v-model="checkAll">全选</el-checkbox>
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
              <el-tag type="danger">{{item.contenttype}}</el-tag>
            </el-row>
            <el-row style="display: flex;align-items: center;height:22px">
              <!-- <input type="checkbox" :value="item.rowkey" v-model="item.checked"> -->
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
        <el-checkbox v-model="checkAll">全选</el-checkbox>
        <el-button type="danger" size="small">封禁跳转提交</el-button>
      </div>
      <div v-show="!listLoading" class="pagination-container" style="  display: flex;justify-content: center;align-items: center;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[20, 30 ,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import waves from '@/directive/waves.js'// 水波纹指令
import BackToTop from '@/components/BackToTop'
import { getContentList, submitAllList, submitOneOperation } from '@/api/content'
import store from '../../store'
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js'  // use clipboard by v-directive
export default {
  name: 'contentTemplate',
  components: { Sticky, BackToTop },
  directives: {
    waves,
    clipboard
  },
  data() {
    return {
      mainLoading: true,
      listViewOpen: false,
      list: [],
      total: null,
      listLoading: true,
      massList: [],
      listQuery: {
        page: 1,
        limit: 50,
        seachCondition: '用户IP',  //  查询种类 默认全部
        seachContent: this.$route.query.ip, //  查询详情 默认全部
        ip: null    // 用户ip
      },
      state: {
        currentState: 0,
        humanReview: 0,
        contentType: 0,
        indentifyType: 0,
        recognitionType: 0,
        colourdataType: 0,
        timeHourpick: '0000',
        timeDayPick: this.getNowDay()
      },
      seachCondition: '',
      seachContent: '',
      seachSel: [{
        value: '帖子ID',
        label: '帖子ID'
      }, {
        value: '主题ID',
        label: '主题ID'
      }, {
        value: '用户名',
        label: '用户名'
      }, {
        value: '用户ID',
        label: '用户ID'
      }, {
        value: '用户IP',
        label: '用户IP'
      }],
      timeSel: [{
        value: '0000',
        label: '近2小时'
      },
      {
        value: '0024',
        label: '全天'
      }, {
        value: '0002',
        label: '0点-2点'
      }, {
        value: '0204',
        label: '2点-4点'
      }, {
        value: '0406',
        label: '4点-6点'
      }, {
        value: '0608',
        label: '6点-8点'
      }, {
        value: '0810',
        label: '8点-10点'
      }, {
        value: '1012',
        label: '10点-12点'
      }, {
        value: '1214',
        label: '12点-14点'
      }, {
        value: '1416',
        label: '14点-16点'
      }, {
        value: '1618',
        label: '16点-18点'
      }, {
        value: '1820',
        label: '18点-20点'
      }, {
        value: '2022',
        label: '20点-22点'
      }, {
        value: '2224',
        label: '22点-24点'
      }],
      locationSel: [{
        label: '论坛、评论',
        options: [{
          value: '论坛',
          label: '论坛'
        }, {
          value: '回帖',
          label: '回帖'
        }, {
          value: '历史数据清洗',
          label: '历史数据清洗'
        }]
      }, {
        label: '问答',
        options: [{
          value: '提问',
          label: '提问'
        }, {
          value: '答案',
          label: '答案'
        }]
      }, {
        label: '精华帖',
        options: [{
          value: '精华帖',
          label: '精华贴'
        }]
      }],
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中
        background: '#e7eaf1'// 按钮的背景颜色
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
    this.listQuery.ip = this.$route.query.ip;
    console.log(this.listQuery.ip);
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      console.log(this.listQuery, this.state);
      getContentList(this.listQuery, this.state).then(response => {
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
          return v;
        });
        // console.log(this.list);
        this.total = response.data.total;
        this.listLoading = false;
        // 渲染完执行函数
        this.$nextTick(() => {
          this.mainLoading = false;
        })
      });
    },
    changeIp(ip) {
      // console.log(ip);
      this.listQuery.seachContent = ip;
      this.getList();
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
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
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
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
    },
    changeState(state) {
      if (state === 0) {
        this.state.currentState = 0;
        this.state.humanReview = 1;
        this.state.contentType = 0;
        this.state.indentifyType = 0;
        this.state.recognitionType = 0;
        this.state.colourdataType = 0;
      }
      if (state === 1) {
        this.state.currentState = 4;
        this.state.humanReview = 1;
        this.state.contentType = 0;
        this.state.indentifyType = 0;
        this.state.recognitionType = 0;
        this.state.colourdataType = 0;
      }
      if (state === 2) {
        this.state.currentState = 3;
        this.state.humanReview = 1;
        this.state.contentType = 0;
        this.state.indentifyType = 0;
        this.state.recognitionType = 0;
        this.state.colourdataType = 0;
      }
      if (state === 3) {
        this.state.currentState = 1;
        this.state.humanReview = 1;
        this.state.contentType = 0;
        this.state.indentifyType = 0;
        this.state.recognitionType = 0;
        this.state.colourdataType = 0;
      }
      if (state === 4) {
        this.state.currentState = 1;
        this.state.humanReview = 2;
        this.state.contentType = 0;
        this.state.indentifyType = 0;
        this.state.recognitionType = 0;
        this.state.colourdataType = 3;
      }
      if (state === 5) {
        this.state.currentState = 3;
        this.state.humanReview = 2;
        this.state.contentType = 0;
        this.state.indentifyType = 0;
        this.state.recognitionType = 0;
        this.state.colourdataType = 1;
      }
    },
    getNowDay() {
      const date = new Date();
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
    dateChange(val) {
      console.log(val);
      return this.listQuery.timeDayPick = val;
    }
  },
  watch: {
    state: {
      handler() {
        this.mainLoading = true;
        this.listQuery.page = 1;
        this.getList()
      },
      deep: true
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
  border: 1px solid #d3dce6;
  background: #F0FFFF
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
