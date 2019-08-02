<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" >
        <ul>
          <!--current-->
          <li class="menu-item " v-for="(good,index) in goods" :key="index"
              :class="{current:index===currentIndex}" @click="clickMenuItem(index)">
              <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon"  v-if="good.icon">
              {{good.name}}
              </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" >
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <Food :food="food" ref="food"></Food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import  {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import Food from '../../../components/Food/Food.vue'
  import  ShopCart from '../../../components/ShopCart/ShopCart.vue'
  export default {
    name: 'ShopGoods',
    data(){
      return{
        scrollY:0 ,//右侧滑动的Y轴坐标（滑动过程时，实时变化）
        tops:[],//所有右侧分类的li的？Top 组成的数组（计算一次）
        food:{},//需要显示的food
      }
  },
    mounted () {
      this.$store.dispatch('getShopGoods')
    },
    computed: {
      ...mapState(['goods']),
      //计算得到当前分类的下标
      currentIndex () {//初始执行，和想换数据变化时执行
        //得到条件数据
        const {scrollY,tops}=this
        //更具条件产生结果
        const index=tops.findIndex((top,index)=>{
          return scrollY>=top && scrollY<tops[index+1]
        })
        //返回结果
        return index
      }
      },
      watch: {
        goods (value) { //监听categorys变化就有值，在异步更新界面之前执行
          //界面更新就立即创建swiper对象
          this.$nextTick(() => { //一旦完成界面更新立即调用（语句写在界面更新之后）
            this._initScroll()
            this._initTops()
          })
        },

      },
      methods: {
        //初始化滚动条
        //_标注不予事件相关
        _initScroll () {
          //给menu建立滚动
          new BScroll('.menu-wrapper', {
            scrollY: true,
            click: true
          })
            //给foods建立滚动
          this.foodsScroll = new BScroll('.foods-wrapper', {
            probeType: 3,
            click:true
          })
          this.foodsScroll.on('scroll', ({x, y}) => {
            console.log(x, y)
            this.scrollY = Math.abs(y)
          })
          //记录手指离开的位置
          //   foodsScroll.on('scrollEnd', ({x, y}) => {
          //     console.log('scrollEnd',x, y)
          //     this.scrollY = Math.abs(y)
          //   })
        },
        //初始化tops
        _initTops () {
          //1初始化tops
          const tops=[]
          let top=0
          tops.push(top)
          //2更新状态/找到所有分类的li/ref标识，children所有子标签
          const lis=this.$refs.foodsUl.getElementsByClassName('food-list-hook')
            Array.prototype.slice.call(lis).forEach(li=>{
              top+=li.clientHeight
              tops.push(top)
          })
          //3更新数据
          this.tops=tops
          console.log(tops)
        },
        clickMenuItem(index){
          //console.log(index)
          //使用右侧列表滑动到对应的位置
          //获得当前y坐标
          const y=-this.tops[index]
          //立即更新scrollY
          this.scrollY=y
          //平滑滚动右侧列表
          this.foodsScroll.scrollTo(0,y)
        },
        //显示点击的food
        showFood(food){
            //设置food
          this.food=food
          //显示food组件
          this.$refs.food.toggelShow()
        }
      },
    components:{
      CartControl,
      Food,
      ShopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/sylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            float:left
            bottom: 12px
</style>
