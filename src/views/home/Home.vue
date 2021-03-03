<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1"
      :class="{fixed:isTabFixed}" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!-- <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"
        :class="{fixed:isTabFixed}"></tab-control> -->
      <!-- <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl" :class="{fixed:isTabFixed}">
      </tab-control> -->
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  //导入文件分类
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'

  import {
    debounce
  } from 'common/utils'

  import {
    itemImageListenerMixin,
    backTopMixin
  } from 'common/mixin'

  import BScroll from 'better-scroll'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [itemImageListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          },
        },
        currentType: 'pop',
        isLoad: true,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },

    created() {
      // 请求多个数据
      this.getHomeMultidata()

      //请求商品数据   
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mounted() {
      //监听item中图片加载完成
      // this.$bus.$on('itemImageLoad', () => {
      //   this.$refs.scroll.refresh();
      // })

      //存进mixin
      // const refresh = debounce(this.$refs.scroll.refresh, 50)
      // this.itemImageListener = () => {
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImageListener)
    },
    deactivated() {
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },

    // destroyed() {
    //   console.log('home destroyed');
    // },
    // activated() {
    //   this.$refs.scroll.scrollTo(0, this.saveY, 0)
    //   this.$refs.scroll.refresh()
    // },
    // deactivated() {
    //   this.saveY = this.$refs.scroll.getScrollY()
    // },
    methods: {
      // 监听事件相关方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControl1.currentIndex = index

      },

      contentScroll(position) {
        //回到顶部
        this.isShowBackTop = (-position.y) > 1000
        //control定位判断
        this.isTabFixed = (-position.y) > this.tabOffsetTop


      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      // 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page += 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          //调用完成加载更多,使下次可调用
          this.$refs.scroll.finishPullUp()
        })
      },

      swiperImageLoad() {
        if (this.isLoad) {
          this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
          this.isLoad = false
        }
      }
    },
  }

</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    font-size: 15px;
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /* .tab-control {
    //属性较新，很多浏览器不适用，移动端均可 
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    /* height: 400px; */
    overflow: hidden;
    /*overflow-hidden会导致position：sticky失效*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }


  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

</style>
