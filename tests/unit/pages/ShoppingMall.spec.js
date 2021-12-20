import { shallowMount,mount, createLocalVue} from '@vue/test-utils'
import ShoppingMall from '@/components/pages/ShoppingMall.vue'

import Vue from 'vue'

import swiper from 'swiper/css/swiper.css'

const Vant=require("vant")

const {Lazyload}=Vant

Vue.use(Lazyload)

const localVue = createLocalVue();
localVue.use(Vant); 



describe('ShoppingMall', () => {
  const wrapper = mount(ShoppingMall,{
    localVue,
    Lazyload,
    swiper
  })

  it('renders a div', () => {
    expect(wrapper).toMatchSnapshot()
  })
})