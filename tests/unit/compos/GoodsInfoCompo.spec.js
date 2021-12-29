import {mount, createLocalVue} from '@vue/test-utils'
import GoodsInfoCompo from '@/components/compos/GoodsInfoCompo.vue'
import {fakeGoodsdata} from '../../mockData'

import Vue from 'vue'
const Vant=require("vant")
const {Lazyload}=Vant
Vue.use(Lazyload)

const localVue = createLocalVue();
localVue.use(Vant); 

describe('GoodsInfoCompo', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(GoodsInfoCompo,{
      localVue,
      propsData: fakeGoodsdata
    })
  })

  it('should renders GoodsInfoCompo', () => {
    expect(wrapper).toMatchSnapshot()
  })
})