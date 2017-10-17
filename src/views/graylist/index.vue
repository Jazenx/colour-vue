<template>
  <div class="app-container calendar-list-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="关键词" name="first">
        <keywords></keywords>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import waves from '@/directive/waves.js'// 水波纹指令
import keywords from './keywords'

export default {
  name: 'gray-table',
  components: { keywords },
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