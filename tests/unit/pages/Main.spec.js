
import { mount, createLocalVue} from '@vue/test-utils'
import Main from '@/components/pages/Main.vue'

import VueRouter from 'vue-router';
const Vant=require("vant")

const localVue = createLocalVue();
localVue.use(VueRouter); 
localVue.use(Vant); 

const router = new VueRouter();

describe('Main',  () => {
  
  let wrapper;
  //mock changeTabBarActive() and hook it to the component
  const changeTabBarActive = jest.spyOn(Main.methods, 'changeTabBarActive')
    .mockImplementation(() => {
      console.log("1. mock changeTabBarActive implementation")
    })
  const changeTabbar = jest.spyOn(Main.methods, 'changeTabbar')
    .mockImplementation(() => {
      console.log("2. mock changeTabbar implementation")
    })

  beforeEach(() => {
    wrapper = mount(Main,{
        localVue,
        router
      })
    })

    it('renders Main snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('changeTabBarActive() should has been called when running create()', () => {
       // changeTabBarActive will be called immediately after vm created.
      expect(changeTabBarActive).toHaveBeenCalled()
    })

    it('changeTabbar() should have been called correctly ',async () => {
      // click list tab
      await wrapper.find('[data-test="tab-list"]').trigger('click');
      expect(changeTabbar).toHaveBeenCalled()
      // changeTabBarActive will be called in the updated() hooks method after click and dom updated.
      expect(changeTabBarActive).toHaveBeenCalled()
      // click home tab
      await wrapper.find('[data-test="tab-shop"]').trigger('click');
      expect(changeTabbar).toHaveBeenCalled()
      expect(changeTabBarActive).toHaveBeenCalled()

    })

})