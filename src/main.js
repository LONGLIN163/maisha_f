// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/assets/scss/global.scss'

//  import Vant from 'vant' 
//  import 'vant/lib/index.css'
//  Vue.use(Vant)

import {Cell, CellGroup, Tabbar,TabbarItem,Stepper,PullRefresh,Button,Row,Col,Swipe,SwipeItem,Lazyload,List,Field,NavBar,Tab,Tabs,Toast} from 'vant'
Vue.use(Field).use(NavBar).use(Button).use(Row).use(Col).use(Swipe)
.use(SwipeItem).use(Lazyload).use(List).use(Tab).use(Tabs).use(PullRefresh)
.use(Stepper).use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup).use(Toast)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//test LF - CRLF