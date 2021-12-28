import {mount, createLocalVue} from '@vue/test-utils'
import GoodsInfoCompo from '@/components/compos/GoodsInfoCompo.vue'

import Vue from 'vue'
const Vant=require("vant")
const {Lazyload}=Vant
Vue.use(Lazyload)

const localVue = createLocalVue();
localVue.use(Vant); 

describe('GoodsInfoCompo', () => {
  let wrapper;
  const fakedata = {
    goodsImage:"https://m.media-amazon.com/images/I/81uKjZIuWsL._AC_SL1500_.jpg",
    goodsName: "Granini sin azúcar añadido zumo 100 % frutas",
    goodsPrice: 3.9,
    goodsId: "fb0f913950944b66a97ae262ad14609a"
  }
  beforeEach(() => {
    wrapper = mount(GoodsInfoCompo,{
      localVue,
      propsData: fakedata
    })
  })

  it('should renders GoodsInfoCompo', () => {
    expect(wrapper).toMatchSnapshot()
  })
})