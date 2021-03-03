<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles" :key="index.id" class="title-item" :class="{active:index === currentIndex}"
        @click="itemClcik(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar,
    },
    methods: {
      itemClcik(index) {
        this.currentIndex = index
        this.$emit('itemClick', index)
      },
      backClick() {
        this.$router.back()
      }
    },
  }

</script>
<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-tint);
  }

  .back img {
    margin-top: 12px;
  }

</style>
