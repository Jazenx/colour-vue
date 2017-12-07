<template>
  <div class="app-container">
    <div class="main-container" v-loading="mainLoading">
      <!-- <div style="margin: 20px">
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
                                                                                            <el-date-picker v-model="state.timeDayPick" type="date" placeholder="选择日期" style="float:right;margin-right:30px;width:120px" :clearable="false" format="yyyy-MM-dd" @change="dateChange">
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
                                                                                        </div> -->
      <sticky className="sub-navbar">
        <label style="float:left;margin-left:20px;font-size:16px">论坛:</label>
        <el-select v-model="listQuery.forum" placeholder="请选择论坛" class="filter-item" style="float:left;margin-left:20px">
          <el-option v-for="item in seachSel" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <label style="float:left;margin-left:20px;font-size:16px">用户类型:</label>
        <el-select v-model="listQuery.userType" placeholder="请选择用户类型" class="filter-item" style="float:left;margin-left:20px">
          <el-option v-for="item in seachSel" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <label style="float:left;margin-left:20px;font-size:16px">范围:</label>
        <el-date-picker style="float:left;margin-left:20px" v-model="validity" type="daterange" placeholder="选择日期范围" @change="dateChange">
        </el-date-picker>
        <el-button class="filter-item" type="success" style="float:left;margin-left:20px;margin-top:8px" v-waves icon="search" @click="getList">查询</el-button>
      </sticky>
      <div style="margin: 15px 0;"></div>
      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="努力加载中..." border fit highlight-current-row style="width: 100%;">
        <el-table-column align="center" label="用户ID">
          <template scope="scope">
            <span style="margin-left:10px;cursor:pointer" v-html="scope.row.authorid" v-clipboard:copy='scope.row.authorid' v-clipboard:success='clipboardSuccess'>{{scope.row.authorid}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名">
          <template scope="scope">
            <span style="margin-left:10px;cursor:pointer" v-html="scope.row.username" v-clipboard:copy='scope.row.username' v-clipboard:success='clipboardSuccess'>{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户类型">
          <template scope="scope">
            <el-tag v-if="scope.row.thread_suspicion<1" type="warning">嫌疑</el-tag>
            <el-tag v-if="scope.row.thread_suspicion>=1" type="danger">建议删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="主贴重复">
          <template scope="scope">
            <span style="color:#4682B4;cursor:pointer" @click="showPostDetails(scope.row)">{{scope.row.thread_suspicion}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="异常行为">
                                                                                            <template scope="scope">
                                                                                              {{scope.row.behavior_suspicion}}
                                                                                            </template>
                                                                                          </el-table-column> -->
        <el-table-column align="center" label="目前状态">
          <template scope="scope">
            <el-tag :type="scope.row.userstate | statusFilter" close-transition>{{scope.row.userstate === 0 ? "正常" : "已封禁"}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="封禁操作">
          <template scope="scope">
            <el-button size="small" type="danger" @click="bannedAndSubmit(scope.row)">封禁</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="display: flex;justify-content: center;align-items: center;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[20, 30 ,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

      <el-dialog :title="this.postTitle+'-主贴详情'" :visible.sync="dialogVisible" width="30%">
        <div v-for="(item, index) in postDetail" :key="item.id" v-loading="listLoading">
          <el-row style="border: 1px solid #d3dce6;background:#D3D3D3; border-radius:5px;margin-top:30px">
            <el-row style="margin: 5px">
              <el-row>
                <a class="aTitle" :href="item.url" target="_blank">PID:{{ item.thread }}</a>
                <el-tag type="success" v-if="item.forumname">{{item.forumname}}</el-tag>
                <i class="el-icon-time" style="float:right">{{item.replydate}}</i>
              </el-row>
              <el-row style="margin:10px;overflow:auto;max-height:60px" v-html="item.content">
              </el-row>
              <el-row style="display:flex;justify-content: center;">
                <i @click="boxIsShow(item)" ref="clickBtn" class="el-icon-arrow-right" style="cursor: pointer;transform: rotate(90deg);" :name="item.userid"></i>
              </el-row>
            </el-row>
            <el-row v-if="item.boxshow">
              <Similarity :thread="item.thread"></Similarity>
            </el-row>
          </el-row>
        </div>
      </el-dialog>
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </div>
  </div>
</template>
<script>
import Sticky from '@/components/Sticky'; // 粘性header组件
import waves from '@/directive/waves.js'; // 水波纹指令
import BackToTop from '@/components/BackToTop';
import { getWaterArmyList, bannedAndSubmit, getPostList, getPostSimilarity } from '@/api/waterarmy';
import store from '../../store';
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js'  // use clipboard by v-directive
import Similarity from './similarity'

export default {
  name: 'contentTemplate',
  components: { Sticky, BackToTop, Similarity },
  directives: {
    waves,
    clipboard
  },
  data() {
    return {
      mainLoading: true,
      listViewOpen: false,
      dialogVisible: false,
      postTitle: '',
      postDetail: null,
      list: [],
      similarity: [],
      total: null,
      similarityTotal: null,
      banurl: null,
      banBtn: false,
      listLoading: true,
      tableKey: 0,
      thread: null,
      massList: [],
      listQuery: {
        page: 1,
        limit: 50,
        forum: 0, //  查询种类 默认全部
        userType: 0,
        date: this.getCreateYMDTime()
      },
      similarityQuery: {
        page: 1,
        limit: 5
      },
      validity: [new Date().getTime() - 3600 * 1000 * 24 * 1, new Date()],
      state: {
        currentState: 2,
        humanReview: 1,
        contentType: 0,
        indentifyType: 0,
        recognitionType: 0,
        colourdataType: 0,
        timeHourpick: '0024',
        timeDayPick: this.getNowDay()
      },
      seachSel: [
        {
          value: 0,
          label: '全部'
        }
      ],
      timeSel: [
        {
          value: '0000',
          label: '近2小时'
        },
        {
          value: '0024',
          label: '全天'
        },
        {
          value: '0002',
          label: '0点-2点'
        },
        {
          value: '0204',
          label: '2点-4点'
        },
        {
          value: '0406',
          label: '4点-6点'
        },
        {
          value: '0608',
          label: '6点-8点'
        },
        {
          value: '0810',
          label: '8点-10点'
        },
        {
          value: '1012',
          label: '10点-12点'
        },
        {
          value: '1214',
          label: '12点-14点'
        },
        {
          value: '1416',
          label: '14点-16点'
        },
        {
          value: '1618',
          label: '16点-18点'
        },
        {
          value: '1820',
          label: '18点-20点'
        },
        {
          value: '2022',
          label: '20点-22点'
        },
        {
          value: '2224',
          label: '22点-24点'
        }
      ],
      locationSel: [
        {
          label: '论坛、评论',
          options: [
            {
              value: '论坛',
              label: '论坛'
            },
            {
              value: '回帖',
              label: '回帖'
            },
            {
              value: '历史数据清洗',
              label: '历史数据清洗'
            }
          ]
        },
        {
          label: '问答',
          options: [
            {
              value: '提问',
              label: '提问'
            },
            {
              value: '答案',
              label: '答案'
            }
          ]
        },
        {
          label: '精华帖',
          options: [
            {
              value: '精华帖',
              label: '精华贴'
            }
          ]
        }
      ],
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中
        background: '#e7eaf1' // 按钮的背景颜色
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      console.log(this.listQuery);
      getWaterArmyList(this.listQuery, this.state).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
        this.mainLoading = false;
      });
    },
    GetDateStr(AddDayCount) {
      const dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount);// 获取AddDayCount天后的日期 
      const y = dd.getFullYear();
      const m = dd.getMonth() + 1;// 获取当前月份的日期 
      const d = dd.getDate();
      return y + '-' + m + '-' + d;
    },
    getCreateYMDTime() {
      console.log(this.GetDateStr(-1) + ' - ' + this.GetDateStr(0))
      return this.GetDateStr(-1) + ' - ' + this.GetDateStr(0);
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      console.log('一页展示的条数变了，load一次list');
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      console.log('页数的条数变了，load一次list');
      this.getList();
    },
    handleSimilaritySizeChange(val) {
      this.similarityQuery.limit = val;
      console.log('一页展示的条数变了，load一次list');
      this.getSimilarityList(this.thread);
    },
    handleSimilarityCurrentChange(val) {
      this.similarityQuery.page = val;
      console.log('一页展示的条数变了，load一次list');
      this.getSimilarityList(this.thread);
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
      return this.listQuery.date = val;
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    },
    bannedAndSubmit(row) {
      const username = [];
      row.userstate = 1;
      username.push(row.username);
      let url = '';
      bannedAndSubmit(username).then(response => {
        url = response.data.result
        window.open(url);
      })
      // this.getList();
    },
    showPostDetails(row) {
      this.dialogVisible = true
      this.postTitle = row.username;
      console.log(row)
      getPostList(row.authorid).then(response => {
        this.postDetail = response.data.items.map(v => {
          this.$set(v, 'boxshow', false);
          return v
        });
      })
      console.log(this.postDetail)
    },
    boxIsShow(row) {
      const clickTarget = event.currentTarget;
      if (row.boxshow) {
        clickTarget.style.transform = 'rotate(90deg)';
      } else {
        clickTarget.style.transform = 'rotate(-90deg)';
      }
      row.boxshow = !row.boxshow
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
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.main-container {
  border: 1px solid #d3dce6;
  margin: 80px;
  margin-top: 10px;
  background: #f3f3f3;
}

.detail-box {
  border: 1px solid #d3dce6; // background: #F0FFFF
}

.aTitle {
  color: #4682b4;
}

.aHref {
  color: #00bfff;
  text-decoration: underline;
}

.infoGrey {
  color: #808080;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
