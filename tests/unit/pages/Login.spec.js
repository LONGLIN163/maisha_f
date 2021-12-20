
import { mount, createLocalVue} from '@vue/test-utils'
import Login from '@/components/pages/Login.vue'


import VueRouter from 'vue-router';
const Vant=require("vant")

const localVue = createLocalVue();
localVue.use(VueRouter); 
localVue.use(Vant); 

const router = new VueRouter();

describe('Login',  () => {

  it('renders Login',async () => {

    const wrapper = mount(Login, {
      localVue,
      router
    })

    expect(wrapper).toMatchSnapshot()

  })
})