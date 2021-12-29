import { mount, createLocalVue} from '@vue/test-utils'
import Cart from '@/components/pages/Cart.vue'
import {cartInfo} from '../../mockData'

const Vant=require("vant")
const localVue = createLocalVue();
localVue.use(Vant); 

describe('Cart', () => {
  
  let wrapper;

   // mock getCartInfo()
   const getCartInfo = jest.spyOn(Cart.methods, 'getCartInfo')
   .mockImplementation(() => {
     console.log("mock getCartInfo implementation")
   })
  
   // mock totalMoney()
   const totalMoney = jest.spyOn(Cart.computed, 'totalMoney')
   .mockImplementation(() => {
     console.log("mock totalMoney implementation")
   })
  
   // mock clearCart()
   const clearCart = jest.spyOn(Cart.methods, 'clearCart')
   .mockImplementation(() => {
     console.log("mock clearCart implementation")
   })
  
  beforeEach(() => {
    wrapper = mount(Cart,{
      localVue
    })
    wrapper.setData({ cartInfo })
  })
  
  
  it('renders Cart', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('getCartInfo() and totalMoney() should be called', () => {
    expect(getCartInfo).toHaveBeenCalled()
    expect(totalMoney).toHaveBeenCalled()
  })

  it('clearCart should be called', async () => {
    await wrapper.find('[data-test="clearCart"]').trigger('click');
    expect(clearCart).toHaveBeenCalled()
  })

   // ******van-stepper can be test in e2e******
  
})