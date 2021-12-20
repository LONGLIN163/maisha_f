import Vue from 'vue'
import { shallowMount,mount, createLocalVue} from '@vue/test-utils'

import Goods from '@/components/pages/Goods.vue'

import VueRouter from 'vue-router';
const Vant=require("vant")

const localVue = createLocalVue();
localVue.use(VueRouter)
localVue.use(Vant); 

const router = new VueRouter();


describe('Goods', () => {
  const wrapper = mount(Goods,{
    localVue,
    router
  })

  it('renders Goods', () => {
    expect(wrapper).toMatchSnapshot()
  })
})