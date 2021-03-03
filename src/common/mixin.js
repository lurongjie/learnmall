import {
  debounce
} from 'common/utils'

export const itemImageListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImageListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
    // console.log('我是混入的内容');
  },
}

export const backTopMixin = {
  data: function () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}
