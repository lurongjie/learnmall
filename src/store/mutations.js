import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
export default {

  //mutations唯一的目的就是修该state中的状态
  //mutations中的每一个方法京可能完成的事情比较单一
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.check = true
    state.cartList.push(payload)
  }
}
