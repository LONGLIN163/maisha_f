import { config, mount, createLocalVue} from '@vue/test-utils'
import CategoryList from '@/components/pages/CategoryList.vue'

// use old syntax for mount method
config.showDeprecationWarnings = false

const Vant=require("vant")

const localVue = createLocalVue();
localVue.use(Vant); 


describe('CategoryList',  () => {

  it('renders CategoryList',async () => {

    const wrapper = mount(CategoryList, {
      localVue
    })

    expect(wrapper).toMatchSnapshot()

  })
})