<template>
  <section class="search">
    <HeaderTop title="搜索"></HeaderTop>
    <form class="search_form" @submit.prevent="search">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword">
      <input type="submit" class="search_submit" name="提交">
    </form>
    <section class="list" v-if="!nosearchshops">
      <ul class="list_container">
        <router-link  :to="{path:'/shop',query:{id:searchshop.id}}" tag="li"
                      class="list_li" v-for="(searchshop,index) in searchShops" :key="index">
          <section class="item_left">
            <img :src="baseImageUrl+searchshop.image_path"
                 class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{searchshop.name}}</span>
              </p>
              <p>月售{{searchshop.recent_order_num}}单</p>
              <p>{{searchshop.float_minimum_order_amount}}元起送 / 距离{{searchshop.distance}}公里</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-else>很抱歉，无搜索结果</div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
export default {
  data(){
    return{
      keyword:'',
      baseImageUrl: 'http://cangdu.org:8001/img/',
      nosearchshops:false
    }
  },
  computed:{
    ...mapState(['searchShops'])
  },
  methods:{
    search(){
      //搜索得到关键字
      const keyword=this.keyword.trim()
      //进行搜索
      if(keyword){
        this.$store.dispatch('searchShops',keyword)
      }
    }
  },
  watch:{
    searchShops(value){
      if(!value.length){
        this.nosearchshops=true
      }else{
        this.nosearchshops=false
      }
    }
  },
  components: {
    HeaderTop
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/sylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: flex-start;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                overflow:hidden
                text-overflow:ellipsis
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>
