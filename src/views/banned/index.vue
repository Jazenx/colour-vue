<template>
  <div class="main-container">
    <section class="">
      <el-time-picker is-range v-model="value3" placeholder="选择时间范围">
      </el-time-picker>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value3: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
    };
  }
}
</script>

