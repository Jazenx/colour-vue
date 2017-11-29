<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide>
      <el-card :body-style="{ padding: '0px' }" >
        <img src="http://b.hiphotos.baidu.com/image/pic/item/86d6277f9e2f070879bfa2e6e324b899a801f29a.jpg" class="image">
        <div style="padding: 14px;">
          <span>好吃的苹果1</span>
        </div>
      </el-card>
    </swiper-slide>
    <swiper-slide>
      <el-card :body-style="{ padding: '0px' }">
        <img src="http://b.hiphotos.baidu.com/image/pic/item/86d6277f9e2f070879bfa2e6e324b899a801f29a.jpg" class="image">
        <div style="padding: 14px;">
          <span>好吃的苹果2</span>
        </div>
      </el-card>
    </swiper-slide>
    <swiper-slide>
      <el-card :body-style="{ padding: '0px' }">
        <img src="http://b.hiphotos.baidu.com/image/pic/item/86d6277f9e2f070879bfa2e6e324b899a801f29a.jpg" class="image">
        <div style="padding: 14px;">
          <span>好吃的苹果3</span>
        </div>
      </el-card>
    </swiper-slide>
    <swiper-slide>
      <el-card :body-style="{ padding: '0px' }">
        <img src="http://b.hiphotos.baidu.com/image/pic/item/86d6277f9e2f070879bfa2e6e324b899a801f29a.jpg" class="image">
        <div style="padding: 14px;">
          <span>好吃的苹果4</span>
        </div>
      </el-card>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'carrousel',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        // 以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: 3000,
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        prevButton: '.swiper-button-prev', // 上一张
        nextButton: '.swiper-button-next', // 下一张
        scrollbar: '.swiper-scrollbar', // 滚动条
        mousewheelControl: true,
        observeParents: true,
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 10,
        slidesOffsetBefore: 100,
        // slidesPerGroup: 4,
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true
      }
    }
  }

}
</script>

<style>
.image {
  widows: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>