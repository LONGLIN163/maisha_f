import {mount, createLocalVue} from '@vue/test-utils'
import ShoppingMall from '@/components/pages/ShoppingMall.vue'

import Vue from 'vue'
const Vant=require("vant")
const {Lazyload}=Vant

Vue.use(Lazyload)
const localVue = createLocalVue();
localVue.use(Vant); 

let wrapper;
//mock initData() and hook it to the component
const initData = jest.spyOn(ShoppingMall.methods, 'initData')
beforeEach(() => {
  wrapper = mount(ShoppingMall,{
    localVue,
    Lazyload
  })
})

describe('ShoppingMall', () => {
  
  /**
   * Get the snapshot
   */
  it('should renders ShoppingMall', () => {
    expect(wrapper).toMatchSnapshot()
  })

  /**
   * InitData has been called when running create()
   */
  it('initData in created() should be called', () => {
    expect(initData).toHaveBeenCalled()
  })

  /**
   * Check if the other component rendered and some sample ui elements working fine.
   */

  it('should have FloorCompo elements with classname "floor-title"', () => {
    const floorTitle=wrapper.find('.floor-title')
    expect(floorTitle.exists()).toBe(true)
  })

  it('should have Goods Compo elements with classname "goods-info"', () => {
    const goodsInfo=wrapper.find('.goods-info')
    expect(goodsInfo.exists()).toBe(true)
  })
  
})
