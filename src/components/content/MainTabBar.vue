<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/shouye.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/shouye_active.svg">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/fenlei.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/fenlei_active.svg">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/gouwuche.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/gouwuche_active.svg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/wode.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/wode_active.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'
  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }

</script>
