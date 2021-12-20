
import { mount, createLocalVue} from '@vue/test-utils'
import Main from '@/components/pages/Main.vue'


import VueRouter from 'vue-router';
const Vant=require("vant")

const localVue = createLocalVue();
localVue.use(VueRouter); 
localVue.use(Vant); 

const router = new VueRouter();

describe('Main',  () => {

  it('renders a Main',async () => {

    const wrapper = mount(Main, {
      localVue,
      router
    })

    expect(wrapper).toMatchSnapshot()

  })
})