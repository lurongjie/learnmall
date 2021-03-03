<template>
  <swiper>
    <swiper-item v-for="item in topImages" :key="item.id" class="swiper-item">
      <img :src="item" alt="" @load="imgLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import {
    Swiper,
    SwiperItem
  } from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      imgLoad() {
        this.$emit('swiperImgLoad')
      }
    },

  }

</script>
<style scoped>
  .swiper-item {
    height: 300px;
    overflow: hidden;
  }

</style>
