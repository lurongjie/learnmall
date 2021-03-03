<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-botton-bar></cart-botton-bar>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottonBar from './childComps/CartBottonBar'

  import {
    mapGetters
  } from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottonBar,
    },
    computed: {
      ...mapGetters(['cartLength', 'cartList']),
    },

  }

</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

</style>
