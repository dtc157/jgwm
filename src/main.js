/*
    入口js
*/
  import Vue from 'vue'
  import App from './App.vue'
  import router from './router'
  import store from './store'
  import VueLazyload from 'vue-lazyload'
  import {Button} from 'mint-ui'
  import loading from './common/imgs/loading.gif'
  import './mock/mokeServer' //加载mockServer即可
  import './fiters/index' //加载过滤器

    Vue.component(Button.name,Button)  //注册全局标签
    Vue.use(VueLazyload, { //内部自定义了一个指令lazy
      loading
    })
    new  Vue({
        el:'#app',
        render: h=>h(App),
        router,//使用vue-router
        store,//使用vuex
    })
