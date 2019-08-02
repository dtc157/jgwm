
<template>
    <section class="msite">
      真真的帅哦
      <HeaderTop :title="address.name">
        <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span class="header_login" slot="right">
          <span class="header_login_text">登录|注册</span>
        </span>
      </HeaderTop>
        <!--首页导航-->
      <nav class="msite_nav">
          <div class="swiper-container" v-if="categorysArr.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src=" baseImageUrl+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="back"  v-else>
        </nav>
        <!--首页附近商家-->
      <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-option"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
        <ShopList></ShopList>
        </div>
    </section>
</template>

<script>
  import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'

export default{
    data(){
      return {
        baseImageUrl:'https://fuss10.elemecdn.com'
      }
    },
  mounted(){

    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  computed:{
    ...mapState(['address','categorys']),
    //根据categorys这个一维数组生成一个二维数组，小数组中的元素最大个数是8
    categorysArr(){
      const {categorys} =this
      //大数组
      const arr = []
      //最大长度为8
      let minArr = []
      //遍历
       categorys.forEach(c=>{
         //如果小数组满了，创建新的
         if(minArr.length===8){
           minArr = []
         }
         //如果为空放到大数组
         if(minArr.length===0){
           arr.push(minArr)
         }
         //将当前分类保存到小数组中
         minArr.push(c)
       })
       return arr
    }
  },

  watch: {
    categorys (value){ //监听categorys变化就有值，在异步更新界面之前执行
      //界面更新就立即创建swiper对象
      this.$nextTick(()=>{ //一旦完成界面更新立即调用（语句写在界面更新之后）
          new  Swiper('.swiper-container',{
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
      })
    }
  },
  components: {
    HeaderTop,
    ShopList
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/sylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
