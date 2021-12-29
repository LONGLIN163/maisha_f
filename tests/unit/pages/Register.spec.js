
import { mount, createLocalVue} from '@vue/test-utils'
import Register from '@/components/pages/Register.vue'

import VueRouter from 'vue-router';
const Vant=require("vant")

const localVue = createLocalVue();
localVue.use(VueRouter); 
localVue.use(Vant); 

const router = new VueRouter();

describe('Register',  () => {

  let wrapper;
  // const goBack = jest.spyOn(Register.methods, 'goBack')
  //   .mockImplementation(() => {
  //     console.log("1. mock goBack implementation")
  //   })

  // mock loginAction()
  const registerAction = jest.spyOn(Register.methods, 'registerAction')
    .mockImplementation(() => {
      //console.log("1. mock registerAction implementation")
      checkForm() && register() // call checkForm(set true), then call login
  })

  // mock checkForm()
  const checkForm = jest.spyOn(Register.methods, 'checkForm')
    .mockImplementation(() => {
      //console.log("2. mock checkForm implementation")
      return true
    })

  // mock register()
  const register = jest.spyOn(Register.methods, 'register')
    .mockImplementation(() => {
      //console.log("3. mock register implementation")
  })

  beforeEach(() => {
    wrapper = mount(Register,{
      localVue,
      router
    })
  })

  it('renders Register',async () => {
    expect(wrapper).toMatchSnapshot()
  })  

  // ***this would not work, jest would not trigger "click-left" event by "click", this has to be done by e2e
  // it('goBack() should have been called correctly ',async () => {
  //   console.log(wrapper.find('[data-test="goBack"]').text())
  //   await wrapper.find('[data-test="goBack"]').trigger('click');
  //   expect(goBack).toHaveBeenCalled()
  // })

  it('test register input field ',async () => {
    await wrapper.find('[data-test="username"]').setValue("usr");
    expect(wrapper.find('[data-test="username"]').element.value).toBe('usr')

    await wrapper.find('[data-test="password"]').setValue("pwd");
    expect(wrapper.find('[data-test="password"]').element.value).toBe('pwd')
  })

  it('registerAction() should have been called correctly ',async () => {
    await wrapper.find('[data-test="registerAction"]').trigger('click');
    expect(registerAction).toHaveBeenCalled()
  })

})