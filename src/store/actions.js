import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //方法一：
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }

      // 方法二：
      // let index = state.cartList.indexOf(payload)
      // if (index != -1) {
      //   oldProduct = state.cartList[index]
      //   oldProduct.count += 1
      // }

      //方法三:
      let oldProduct = null
      oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('商品数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('新的商品添加了')
      }
    })
  }
}
