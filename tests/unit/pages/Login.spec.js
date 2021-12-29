
import { mount, createLocalVue} from '@vue/test-utils'
import Login from '@/components/pages/Login.vue'


import VueRouter from 'vue-router';
const Vant=require("vant")

const localVue = createLocalVue();
localVue.use(VueRouter); 
localVue.use(Vant); 

const router = new VueRouter();

describe('Login',  () => {

  let wrapper;

  // mock loginAction()
  const loginAction = jest.spyOn(Login.methods, 'loginAction')
    .mockImplementation(() => {
      //console.log("1. mock loginAction implementation")
      checkForm() && login() // call checkForm(set true), then call login
  })
  // mock checkForm()
  const checkForm = jest.spyOn(Login.methods, 'checkForm')
    .mockImplementation(() => {
      //console.log("2. mock checkForm implementation")
      return true
  })
  // mock login()
  const login = jest.spyOn(Login.methods, 'login')
    .mockImplementation(() => {
      //console.log("3. mock login implementation")
  })

  beforeEach(() => {
    wrapper = mount(Login,{
      localVue,
      router
    })
  })


  it('renders Login',async () => {
    expect(wrapper).toMatchSnapshot()
  })

  // ***test goback in e2e test***

  it('test login input field ',async () => {
    await wrapper.find('[data-test="username"]').setValue("usr");
    expect(wrapper.find('[data-test="username"]').element.value).toBe('usr')

    await wrapper.find('[data-test="password"]').setValue("pwd");
    expect(wrapper.find('[data-test="password"]').element.value).toBe('pwd')
  })

  it('loginAction() should have been called correctly ',async () => {
    await wrapper.find('[data-test="loginsubmit"]').trigger('click');
    expect(loginAction).toHaveBeenCalled()
  })

})