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
      </div>
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
      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="努力加载中..." border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="用户ID">
          <template scope="scope">
            <span style="margin-left:10px;cursor:pointer" v-html="scope.row.authorid" v-clipboard:copy='scope.row.authorid' v-clipboard:success='clipboardSuccess'>{{scope.row.authorid}}</span>
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
            {{scope.row.thread_suspicion}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="回贴重复">
          <template scope="scope">
            {{scope.row.reply_suspicion}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="异常行为">
          <template scope="scope">
            {{scope.row.behavior_suspicion}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="目前状态">
          <template scope="scope">
            <el-tag v-if="scope.row.mark_banned!==1" type="success">正常</el-tag>
            <el-tag v-if="scope.row.mark_banned===1" type="danger">关禁闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="暂不封禁">
          <template scope="scope">
            <el-checkbox v-if="scope.row.mark_banned!==1"></el-checkbox>
            <el-checkbox v-if="scope.row.mark_banned===1" checked></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" label="采取封禁操作">
          <template scope="scope">
            <el-checkbox v-if="scope.row.mark_banned!==1"></el-checkbox>
            <el-checkbox v-if="scope.row.mark_banned===1" checked></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" label="机器判断结果有误">
          <template scope="scope">
            <el-checkbox v-if="scope.row.mark_banned!==1"></el-checkbox>
            <el-checkbox v-if="scope.row.mark_banned===1" checked></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" label="撤销操作">
          <template scope="scope">
            <el-button type="info" plain size="mini">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="  display: flex;justify-content: center;align-items: center;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[20, 30 ,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </div>
  </div>
</template>
<script>
import Sticky from '@/components/Sticky'; // 粘性header组件
import waves from '@/directive/waves.js'; // 水波纹指令
import BackToTop from '@/components/BackToTop';
import { getWaterArmyList } from '@/api/waterarmy';
import store from '../../store';
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
      banurl: null,
      banBtn: false,
      listLoading: true,
      tableKey: 0,
      massList: [],
      listQuery: {
        page: 1,
        limit: 50,
        forum: 0, //  查询种类 默认全部
        userType: 0,
        date: this.getCreateYMDTime()
      },
      validity: [new Date(), new Date()],
      state: {
        currentState: 2,
        humanReview: 1,
        contentType: 0,
        indentifyType: 0,
        recognitionType: 0,
        colourdataType: 0,
        timeHourpick: '0000',
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
      return date.getFullYear() + seperator1 + month + seperator1 + strDate + ' - ' + date.getFullYear() + seperator1 + month + seperator1 + strDate;
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
