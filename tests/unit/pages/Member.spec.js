import {mount, createLocalVue} from '@vue/test-utils'
import Member from '@/components/pages/Member.vue'
import Vue from 'vue'

const Vant=require("vant")
const {Field}=Vant
Vue.use(Field)

const localVue = createLocalVue();
localVue.use(Vant); 

describe('Member',  () => {
  let wrapper;
  const goToLogin = jest.spyOn(Member.methods, 'goToLogin')
    .mockImplementation(() => {
      console.log("1. mock goToLogin implementation")
    })
  const goToRegister = jest.spyOn(Member.methods, 'goToRegister')
    .mockImplementation(() => {
      console.log("2. mock goToRegister implementation")
    })

  beforeEach(() => {
    wrapper = mount(Member,{
      localVue,
    })
  })

  it('renders Member', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('goToLogin() should have been called correctly ',async () => {
    await wrapper.find('[data-test="loginbtn"]').trigger('click');
    expect(goToLogin).toHaveBeenCalled()
  })
  it('goToRegister() should have been called correctly ',async () => {
    await wrapper.find('[data-test="signupbtn"]').trigger('click');
    expect(goToRegister).toHaveBeenCalled()
  })
})