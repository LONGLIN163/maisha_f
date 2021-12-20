
import { mount, createLocalVue} from '@vue/test-utils'
import Register from '@/components/pages/Register.vue'


import VueRouter from 'vue-router';
const Vant=require("vant")

const localVue = createLocalVue();
localVue.use(VueRouter); 
localVue.use(Vant); 

const router = new VueRouter();

describe('Register',  () => {

  it('renders Register',async () => {

    const wrapper = mount(Register, {
      localVue,
      router
    })

    expect(wrapper).toMatchSnapshot()

  })
})