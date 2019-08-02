<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-wuuiconsuoxiao" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-jia-tianchong" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>

  export default {
    name: 'CartControl',
    props:{
      food:Object
    },
    methods:{
      updateFoodCount(isAdd){
        this.$store.dispatch('updateFoodCount',{isAdd,food:this.food})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/sylus/mixins.styl"
  .cartcontrol
    font-size: 0
    display: inline-block
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
    .icon-wuuiconsuoxiao
      display: inline-block
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 0px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-jia-tianchong {
      display: inline-block
      line-height: 24px
      font-size: 24px
      color $green
    }
</style>
