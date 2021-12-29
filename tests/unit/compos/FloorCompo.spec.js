import {mount, createLocalVue} from '@vue/test-utils'
import FloorCompo from '@/components/compos/FloorCompo.vue'
import {fakeFloordata} from '../../mockData'

const Vant=require("vant")
const localVue = createLocalVue();
localVue.use(Vant); 

describe('FloorCompo', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(FloorCompo,{
      localVue,
      propsData: {
        floorData:fakeFloordata,
        floorTitle:"Snack"
      }
    })
  })

  it('should renders FloorCompo', () => {
    expect(wrapper).toMatchSnapshot()
  })
})