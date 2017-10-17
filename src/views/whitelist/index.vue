<template>
  <div class="app-container calendar-list-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="IP" name="first">
        <userip></userip>
      </el-tab-pane>
      <el-tab-pane label="用户ID" name="second">
        <userid></userid>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import waves from '@/directive/waves.js'// 水波纹指令
import userip from './ip'
import userid from './id'
export default {
  name: 'white-table',
  components: { userip, userid },
  directives: {
    waves
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>