<template>
  <div class="app-container">

    <div class="main-container">
      <div style="margin: 20px">
        <div>
          <el-button type="info" size="small">全部</el-button>
          <el-button type="info" size="small">待审</el-button>
          <el-button type="info" size="small">删除</el-button>
          <el-button type="info" size="small">通过</el-button>
          <el-button type="info" size="small">误删</el-button>
          <el-button type="info" size="small">漏删</el-button>
          <el-button type="info" size="small">复议</el-button>
          <el-select v-model="timeHourpick" placeholder="请选择时间段" style="float:right; width:100px">
            <el-option v-for="item in timeSel" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker v-model="timeDayPick" type="date" placeholder="选择日期" style="float:right;margin-right:30px">
          </el-date-picker>
        </div>
        <div style="margin: 15px 0;"></div>
        <el-form>
          <el-form-item label="版块名称:">
            <el-select v-model="locations" multiple placeholder="请选择板块名">
              <el-option-group v-for="group in locationSel" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="当前状态:">
            <el-radio-group v-model="currentState" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">通过</el-radio-button>
              <el-radio-button label="2">待审</el-radio-button>
              <el-radio-button label="3">删除</el-radio-button>
              <el-radio-button label="4">通过+待审</el-radio-button>
              <el-radio-button label="5">通过+删除</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="人工审核:">
            <el-radio-group v-model="humanReview" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">未确认</el-radio-button>
              <el-radio-button label="2">已确认</el-radio-button>
              <el-radio-button label="3">已忽略</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="内容类型:">
            <el-radio-group v-model="contentType" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">主题</el-radio-button>
              <el-radio-button label="2">回复</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="识别类型:">
            <el-radio-group v-model="indentifyType" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">违法</el-radio-button>
              <el-radio-button label="2">违约</el-radio-button>
              <el-radio-button label="3">低俗</el-radio-button>
              <el-radio-button label="4">色情</el-radio-button>
              <el-radio-button label="5">敏感</el-radio-button>
              <el-radio-button label="6">灌水</el-radio-button>
              <el-radio-button label="7">个性</el-radio-button>
              <el-radio-button label="8">跨站</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="识别类型:">
            <el-radio-group v-model="recognitionType" size="small">
              <el-radio-button label="0">不限</el-radio-button>
              <el-radio-button label="1">未确认</el-radio-button>
              <el-radio-button label="2">已确认</el-radio-button>
              <el-radio-button label="3">已忽略</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <sticky className="sub-navbar">
        <el-select v-model="seachCondition" placeholder="请选择筛选条件" align="left">
          <el-option v-for="item in seachSel" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </sticky>
      <div class="components-container">
        <code>Sticky header 当页面滚动到预设的位置会吸附在顶部</code>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
        <div>我是占位</div>
      </div>
    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件

export default {
  name: 'contentTemplate',
  components: { Sticky },
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
      timeDayPick: getNowDay(),
      seachCondition: '',
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
      timeHourpick: '全天',
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
      locations: [],
      currentState: '0',
      humanReview: '1',
      contentType: '0',
      indentifyType: '0',
      recognitionType: '0'
    };
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

.sub-navbar {
  margin-top: 1000px;
}
</style>
