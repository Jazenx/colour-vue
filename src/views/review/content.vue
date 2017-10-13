<template>
  <div class="app-container">

    <div class="main-container">
      <div style="margin: 20px">
        <div>
          <el-button type="info" size="small" @click="changeState(0)">全部</el-button>
          <el-button type="info" size="small" @click="changeState(1)">待审</el-button>
          <el-button type="info" size="small" @click="changeState(2)">删除</el-button>
          <el-button type="info" size="small" @click="changeState(3)">通过</el-button>
          <el-button type="info" size="small" @click="changeState(4)">误删</el-button>
          <el-button type="info" size="small" @click="changeState(5)">漏删</el-button>
          <el-button type="info" size="small">复议</el-button>
          <el-select v-model="listQuery.timeHourpick" placeholder="请选择时间段" style="float:right; width:110px">
            <el-option v-for="item in timeSel" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker v-model="listQuery.timeDayPick" type="date" placeholder="选择日期" style="float:right;margin-right:30px;width:120px">
          </el-date-picker>
        </div>
        <div style="margin: 15px 0;"></div>
        <el-form>
          <el-form-item label="版块名称:">
            <el-select v-model="listQuery.locations" multiple placeholder="请选择板块名">
              <el-option-group v-for="group in locationSel" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="当前状态:">
            <el-radio-group v-model="listQuery.currentState" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">通过</el-radio-button>
              <el-radio-button label="2">待审</el-radio-button>
              <el-radio-button label="3">删除</el-radio-button>
              <el-radio-button label="4">通过+待审</el-radio-button>
              <el-radio-button label="5">通过+删除</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="人工审核:">
            <el-radio-group v-model="listQuery.humanReview" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">未确认</el-radio-button>
              <el-radio-button label="2">已确认</el-radio-button>
              <el-radio-button label="3">已忽略</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="内容类型:">
            <el-radio-group v-model="listQuery.contentType" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">主题</el-radio-button>
              <el-radio-button label="2">回复</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="识别类型:">
            <el-radio-group v-model="listQuery.indentifyType" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">涉政</el-radio-button>
              <el-radio-button label="2">涉黄</el-radio-button>
              <el-radio-button label="3">涉恐</el-radio-button>
              <el-radio-button label="4">广告</el-radio-button>
              <el-radio-button label="5">低俗</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="识别类型:">
            <el-radio-group v-model="listQuery.recognitionType" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">未确认</el-radio-button>
              <el-radio-button label="2">已确认</el-radio-button>
              <el-radio-button label="3">已忽略</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="彩数识别:">
            <el-radio-group v-model="listQuery.colourdataType" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">通过</el-radio-button>
              <el-radio-button label="2">待审</el-radio-button>
              <el-radio-button label="3">删除</el-radio-button>
            </el-radio-group>
          </el-form-item>
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
            </el-row>
            <el-row style="display: flex;align-items: center;height:22px">
              <el-checkbox :value="item.rowkey" v-model="item.checked"></el-checkbox>
              <h5 class="infoGrey" style="margin-left:10px">{{item.username}}</h5>
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
      <div v-show="!listLoading" class="pagination-container" style="  display: flex;justify-content: center;align-items: center;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[20, 50, 100]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
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

export default {
  name: 'contentTemplate',
  components: { Sticky, BackToTop },
  directives: {
    waves
  },
  data() {
    function getNowDay() {
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
    }
    return {
      testInfo: '本人最近打算换车，10年的大众要退休了，皮实耐用，用料厚道是这10年来用车经验对我选下一款车所留下的深刻影响，上网站搜了搜，正好看到最近这款车上了首页SUV，看了看大家分享的雪铁龙经验，觉得挺符合我的要求，直奔4S看实车。 &nbsp;&nbsp;&nbsp;&nbsp;先说外型，这车，不喜欢的人绝对认为它丑得一塌糊涂，不过我承认还是电到我了，我本人其实很喜欢MINI那种圆了咕噜的休闲风格，喜欢轻松自在自由随意的驾驶感觉，这车一眼看去就让人感觉很悠闲但又具有自己的独特风格，外型高水平过关了，另外加一句，实车绝对比网上照片还要好看，不知道摄像师们都什么水平啊 &nbsp;&nbsp;&nbsp;&nbsp;再看内饰，撞色现在好像挺流行，不过我还是喜欢纯色的，到时候再说吧。话说法国人造车确实感觉脑子是实芯的呆呆的，面子功夫一点不会做，内饰进去根本感不到能和豪华挂钩，主驾驶车窗那个控制面板按键用手去按竟然还能左右咣当，松松垮垮，不知道是不是就展车这样，还是都这样，中控台硬塑，真是可惜了电子档杆和仪表盘这么高科技感的配件了。座椅看起来挺单薄，坐上去感觉倒是还可以，前后排空间和顶部高度绝对OK，够用，内饰勉强过关吧，毕竟本身就想选一辆很休闲的车，只要不是丑的过分，内饰豪华不豪华的不会产生决定',
      list: [],
      total: null,
      listLoading: true,
      massList: [],
      listQuery: {
        page: 1,
        limit: 20,
        currentState: 2,
        humanReview: 1,
        contentType: 0,
        indentifyType: 0,
        recognitionType: 0,
        colourdataType: 0,
        timeHourpick: '0024',
        timeDayPick: getNowDay(),
        locations: [],
        seachCondition: null,  //  查询种类 默认全部
        seachContent: null //  查询详情 默认全部
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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getContentList(this.listQuery).then(response => {
        console.log(response.data);
        this.list = response.data.items.map(v => {
          const content = v.content.replace(new RegExp(v.keyword, 'ig'), '<span style="color: red;font-weight: bold;background-color: yellow;">' + v.keyword + '</span>')
          this.$set(v, 'content', content);
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
        console.log(this.list);
        this.total = response.data.total
        this.listLoading = false
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
        const mass = { rowkey: null, optinfo: null };
        mass.rowkey = v.rowkey;
        mass.optinfo = v.optinfo;
        this.massList.push(mass);
        return v
      })
      this.submitor = 'test1';
      console.log(this.massList);
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
      // console.log(row.rowkey, index, opt);
      this.submitor = 'test1'; // 获取操作者名字
      this.list.splice(index, 1);
      submitOneOperation(row.rowkey, opt, this.submitor).then(response => {
        console.log(response);
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    changeState(state) {
      if (state === 0) {
        this.listQuery.currentState = 0;
        this.listQuery.humanReview = 1;
        this.listQuery.contentType = 0;
        this.listQuery.indentifyType = 0;
        this.listQuery.recognitionType = 0;
        this.listQuery.colourdataType = 0;
      }
      if (state === 1) {
        this.listQuery.currentState = 4;
        this.listQuery.humanReview = 1;
        this.listQuery.contentType = 0;
        this.listQuery.indentifyType = 0;
        this.listQuery.recognitionType = 0;
        this.listQuery.colourdataType = 0;
      }
      if (state === 2) {
        this.listQuery.currentState = 3;
        this.listQuery.humanReview = 1;
        this.listQuery.contentType = 0;
        this.listQuery.indentifyType = 0;
        this.listQuery.recognitionType = 0;
        this.listQuery.colourdataType = 0;
      }
      if (state === 3) {
        this.listQuery.currentState = 1;
        this.listQuery.humanReview = 1;
        this.listQuery.contentType = 0;
        this.listQuery.indentifyType = 0;
        this.listQuery.recognitionType = 0;
        this.listQuery.colourdataType = 0;
      }
      if (state === 4) {
        this.listQuery.currentState = 1;
        this.listQuery.humanReview = 2;
        this.listQuery.contentType = 0;
        this.listQuery.indentifyType = 0;
        this.listQuery.recognitionType = 0;
        this.listQuery.colourdataType = 3;
      }
      if (state === 5) {
        this.listQuery.currentState = 3;
        this.listQuery.humanReview = 2;
        this.listQuery.contentType = 0;
        this.listQuery.indentifyType = 0;
        this.listQuery.recognitionType = 0;
        this.listQuery.colourdataType = 1;
      }
    }
  },
  watch: {
    listQuery: {
      handler(newValue) {
        this.listLoading = true
        getContentList(newValue).then(response => {
          this.list = response.data.items.map(v => {
            const content = v.content.replace(new RegExp(v.keyword, 'ig'), '<span style="color: red;font-weight: bold;background-color: yellow;">' + v.keyword + '</span>')
            this.$set(v, 'content', content);
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
