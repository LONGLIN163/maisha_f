import { shallowMount,mount, createLocalVue} from '@vue/test-utils'
import ShoppingMall from '@/components/pages/ShoppingMall.vue'

import Vue from 'vue'

const Vant=require("vant")

const {Lazyload}=Vant

Vue.use(Lazyload)

const localVue = createLocalVue();
localVue.use(Vant); 

describe('ShoppingMall', () => {
  const wrapper = mount(ShoppingMall,{
    localVue,
    Lazyload
  })

  it('renders ShoppingMall', () => {
    expect(wrapper).toMatchSnapshot()
  })
})