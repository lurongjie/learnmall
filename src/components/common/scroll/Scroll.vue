<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Scroll',
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      // 创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true, //控制div元素是否可以点击
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      })

      // 监听滚动的位置
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })

    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        console.log('抖动');
        this.scroll.refresh();
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
  }

</script>
