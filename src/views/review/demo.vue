<template>
  <div>
    <el-row style="background: red;height:50px;">
      <button type="primary" @click="boxIsShow">
        <i class="el-icon-arrow-right"></i>
      </button>
    </el-row>
    <el-row style="background: green" v-if="boxshow">
      <workstationid :id="list.item[0].userid" :listQueryId="listQuery" :state="state"></workstationid>
    </el-row>
  </div>
</template>

<script>

import workstationid from './workstationid'
import { getUserIDWorkStation } from '@/api/content'

export default {
  data() {
    return {
      boxshow: true,
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
    boxIsShow() {
      console.log(this.boxshow);
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


