import { mount, createLocalVue} from '@vue/test-utils'
const Vant=require("vant")
import Cart from '@/components/pages/Cart.vue'

const localVue = createLocalVue();
localVue.use(Vant); 

describe('Cart', () => {
  const wrapper = mount(Cart,{
    localVue
  })

  it('renders Cart', () => {
    expect(wrapper).toMatchSnapshot()
  })
})