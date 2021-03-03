<template>
  <div id="detail">
    <detail-nav-bar @itemClick="itemClick" ref="nav" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" @swiperImgLoad="swiperImgLoad" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <!--scroll-height存在问题,无法refresh到高度,给子组件添加relative解决?????-->
      <detail-goods-info :detail-info="detailInfo" @goodsImageLoad="goodsImageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar'
  import DetailSwiper from 'views/detail/childComps/DetailSwiper'
  import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
  import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
  import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo'
  import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'
  import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo'
  import DetailBottomBar from 'views/detail/childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'


  import {
    getDetail,
    Goods,
    Shop,
    GoodsParam,
    getRecommend
  } from 'network/detail'

  import {
    debounce
  } from 'common/utils'

  import {
    itemImageListenerMixin,
    backTopMixin
  } from 'common/mixin'

  import {
    BACKTOP_DISTANCE
  } from 'common/const'

  import {
    mapActions
  } from 'vuex'
  export default {
    name: "Detail",
    mixins: [itemImageListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        isLoad: true,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopYs: null,
        currentIndex: 0,

      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop

    },
    created() {
      this.iid = this.$route.params.iid
      this.getDetail(this.iid)
      this.getRecommend()

      //详情页的control的导航栏点击跳转
      this.getThemeTopYs = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTopYs.push(Number.MAX_VALUE)
      })
    },
    mounted() {},
    //detail没有keep alive缓存，使用需要使用destroyed，而不能使用deactivated
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },

    methods: {
      ...mapActions(['addCart']),

      getDetail(iid) {
        getDetail(iid).then(res => {
          // 1.获取结果
          const data = res.result

          //2.获取顶部信息
          this.topImages = data.itemInfo.topImages;

          // 2.4.获取店铺信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          // 3.创建店铺信息的对象
          this.shop = new Shop(data.shopInfo)

          // 2.5.获取商品信息
          this.detailInfo = data.detailInfo;

          // 2.6.保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          // 2.7.保存评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })
      },

      //请i求商品数据
      getRecommend() {
        getRecommend().then(res => {
          this.recommends = res.data.list
        })
      },

      //监听轮播图图片加载refresh
      swiperImgLoad() {
        if (this.isLoad) {
          this.$refs.scroll.refresh();
          this.isLoad = false
        }
      },
      goodsImageLoad() {
        // this.$refs.scroll.refresh();
        this.refresh()

        this.getThemeTopYs()
      },

      itemClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position) {
        const positionY = -position.y
        let length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {
          /*方法一：
          if (this.currentIndex != i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this
              .themeTopYs[i +
                1]) || (
              i === length -
              1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
          */
          if (this.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
      },
      addToCart() {

        //获取要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.newPrice.substring(1)
        product.iid = this.iid

        //将商品添加到购物车中(1.Promise  2.mapActions)
        // this.$store.commit('addCart', product)

        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })

        this.addCart(product).then(res => {
          // console.log(res);
          this.$toast.show('已加入购物车',1000)
        })
      }
    },
  }

</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }

</style>
