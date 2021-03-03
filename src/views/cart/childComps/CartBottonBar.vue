<template>
  <div class="botton-bar">
    <div class="select-all">
      <check-button class="check-content" :is-checked="isSelectAll" @click.native="checkAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      {{totalPrice}}
    </div>
    <div class="calculate" @click="goCalculate">
      去结算({{checkLength}})
    </div>
  </div>
</template>
<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: "CartBottonBar",
    components: {
      CheckButton,
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.check
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => {
          return item.check
        }).reduce((preValue, item) => {
          return preValue + item.count
        }, 0)
      },
      isSelectAll() {
        //filter方法
        // return this.cartList.length ? !(this.cartList.filter(item => !item.check).length) : false
        //find方法
        return this.cartList.length ? !(this.cartList.find(item => !item.check)) : false
        //普通遍历
        // if (this.cartList.length === 0) return false
        // for (let item of this.cartList) {
        //   if (!item.check) {
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods: {
      checkAll() {
        //是不可行的,isSelectAll一直在变化
        // this.cartList.forEach(item => item.check = !isSelectAll)

        if (this.isSelectAll) {
          this.cartList.forEach(item => item.check = false)
        } else {
          this.cartList.forEach(item => item.check = true)
        }
      },
      goCalculate() {
        if (this.cartList.filter(item => item.check).length === 0) {
          this.$toast.show('请至少选择一个商品', 1000)
        }
      }
    },
  }

</script>
<style scoped>
  .botton-bar {
    height: 44px;
    line-height: 44px;
    position: relative;
    bottom: 0;
    background-color: #eee;
    display: flex;
  }

  .select-all {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 80px;
    background-color: red;
    color: #fff;
  }

</style>
