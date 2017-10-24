<template>
  <div class="app-container calendar-list-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="关键词" name="first">
        <keywords></keywords>
      </el-tab-pane>
      <el-tab-pane label="广告信息" name="second">
        <adviertisement></adviertisement>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import waves from '@/directive/waves.js'// 水波纹指令
import keywords from './keywords'
import adviertisement from './adviertisement'

export default {
  name: 'gray-table',
  components: { keywords, adviertisement },
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