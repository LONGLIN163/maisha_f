import { shallowMount,mount, createLocalVue} from '@vue/test-utils'
const Vant=require("vant")
import Cart from '@/components/pages/Cart.vue'

import Vue from 'vue'


const {Lazyload}=Vant

Vue.use(Lazyload)

const localVue = createLocalVue();
localVue.use(Vant); 



describe('Cart', () => {
  const wrapper = mount(Cart,{
    localVue,
    Lazyload
  })

  console.log("cart wrapper---",wrapper)

  it('renders a div', () => {
    expect(wrapper).toMatchSnapshot()
  })
})