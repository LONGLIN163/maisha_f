import {mount, createLocalVue} from '@vue/test-utils'
import Member from '@/components/pages/Member.vue'

import Vue from 'vue'

const Vant=require("vant")

const {Field}=Vant

Vue.use(Field)

const localVue = createLocalVue();
localVue.use(Vant); 



describe('Member', () => {
  const wrapper = mount(Member,{
    localVue,
  })

  it('renders a div', () => {
    expect(wrapper).toMatchSnapshot()
  })
})