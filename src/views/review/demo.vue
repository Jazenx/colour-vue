<template>
  <div>
    <el-row style="height:44px;border:1px solid #D3D3D3;display:flex;align-items:center">
      <i @click="boxIsShow" ref="clickBtn" class="el-icon-arrow-right" style="cursor: pointer"></i>
      <p style="margin-left:10px">xxxxxxxxxxxxxxxxxxxxxx</p>
    </el-row>
    <el-row style="background: green" v-if="boxshow">
      <workstationid :id="123" :listQueryId="listQuery" :state="state"></workstationid>
    </el-row>
  </div>
</template>

<script>
import workstationid from './workstationid'
import { getUserIDWorkStation } from '@/api/content'

export default {
  components: { workstationid },
  data() {
    return {
      boxshow: false,
      listQuery: {
        page: 1,
        limit: 10,
        seachCondition: null,  //  查询种类 默认全部
        seachContent: null //  查询详情 默认全部
      },
      state: {
        currentState: 2,
        humanReview: 1,
        contentType: 0,
        indentifyType: 0,
        recognitionType: 0,
        colourdataType: 0,
        timeHourpick: '0000',
        timeDayPick: '0000'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    boxIsShow(e) {
      console.log(e);
      if (this.boxshow) {
        this.$refs.clickBtn.style.transform = 'rotate(0deg)';
      } else {
        this.$refs.clickBtn.style.transform = 'rotate(90deg)';
      }
      this.boxshow = !this.boxshow
    },
    getList() {
      getUserIDWorkStation(this.listQuery, this.state).then(response => {
        this.list = response.data.items;
        this.total = response.data.total
        console.log(this.list)
      })
    }
  }
}
</script>



