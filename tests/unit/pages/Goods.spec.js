import { mount, createLocalVue} from '@vue/test-utils'

import Goods from '@/components/pages/Goods.vue'

import VueRouter from 'vue-router';
const Vant=require("vant")

const localVue = createLocalVue();
localVue.use(VueRouter)
localVue.use(Vant); 

const router = new VueRouter();


describe('Goods', () => {
  let wrapper;
  // mock getInfo()
  const getInfo = jest.spyOn(Goods.methods, 'getInfo')

  // mock addGoodsToCart()
  const addGoodsToCart = jest.spyOn(Goods.methods, 'addGoodsToCart')
  .mockImplementation(() => {
    console.log("mock addGoodsToCart implementation")
    return true
  })

  beforeEach(() => {
    wrapper = mount(Goods,{
      localVue,
      router
    })
  })

  it('renders Goods', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('getInfo in created() should be called', () => {
    expect(getInfo).toHaveBeenCalled()
  })

  it('addGoodsToCart() should have been called correctly ',async () => {
    await wrapper.find('[data-test="addtocard"]').trigger('click');
    expect(addGoodsToCart).toHaveBeenCalled()
  })


})