    /*
    通过mutation间接更新state的多个方法对象
     */
    import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USER_INFO,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
      CLEAR_CART,
      RECEIVE_SEARCH_SHOPS
} from './mutation-types'
    import {
    reqAddress,
    reqFoodCategorys,
    reqShops,
      // reqGetcaptcha,
      reqSearchShop,
      reqLogout,
      reqShopRatings,
      reqShopGoods,
      reqShopInfo
  // reqSendCode,
  // reqLoginSms,
  // reqGetMessage,
  // reqLogout

} from '../api'

    export default {
      //异步获取地址
      async getAddress({commit,state}){
        //1、发送异步ajax请求
        const geohash =state.latitude+','+state.longitude
        const result= await reqAddress(geohash)
        //2、提交一个mutation
        if(result.code === 0){
           const address = result.data
          commit(RECEIVE_ADDRESS,{address})
        }
      },
      //异步获取食品分类数组
      async getCategorys({commit}){
        //1、发送异步ajax请求
        const result= await reqFoodCategorys()
        //2、提交一个mutation
        if(result.code === 0){
          const categorys = result.data
          commit(RECEIVE_CATEGORYS,{categorys})
        }
      },
      //异步获取商家列表
      async getShops({commit,state}){
        //1、发送异步ajax请求
        const {longitude,latitude} = state
        const result= await reqShops(longitude,latitude)
        //2、提交一个mutation
        if(result.code === 0){
          const shops = result.data
          commit(RECEIVE_SHOPS,{shops})
        }
      },
      //同步记录用户信息
      recordUser({commit},userInfo){
        commit(RECEIVE_USERINFO,{userinfo})
      },
      //异步登出
      async logout ({commit}){
        //1、发送异步ajax请求
        const result= await reqLogout()
        //2、提交一个mutation
        if(result.code === 0){
          commit(RESET_USER_INFO)
        }
      },
      // 异步获取商家信息
      async getShopInfo({commit}) {
        const result = await reqShopInfo()
        if(result.code===0) {
          const info = result.data
          info.score = 3.5
          commit(RECEIVE_INFO,{info})
        }
      },
      // 异步获取商家评价列表
        async getShopRatings({commit},callback) {
          const result = await reqShopRatings()
          if(result.code===0) {
          const ratings = result.data
          commit(RECEIVE_RATINGS,{ratings})
            //数据更新通知组件
            callback && callback()
        }
      },
      // 异步获取商家商品列表
      async getShopGoods({commit}) {
        const result = await reqShopGoods()
        if(result.code===0) {
          const goods = result.data
          commit(RECEIVE_GOODS, {goods})
        }
      },
      //同步更新食物中的数量
      updateFoodCount({commit},{isAdd,food}){
            if(isAdd){
              commit(INCREMENT_FOOD_COUNT,{food})
            }else{
              commit(DECREMENT_FOOD_COUNT,{food})
            }
      },
      clearCart({commit}){
          commit(CLEAR_CART)
      },
      // 异步获取搜索商家商品列表
      async searchShops({commit,state},keyword) {
        const geohash =state.latitude+','+state.longitude
        const result = await reqSearchShop(geohash ,keyword )
        if(result.code===0) {
          const searchShops = result.data
          commit(RECEIVE_SEARCH_SHOPS, {searchShops})
        }
      },
    }
