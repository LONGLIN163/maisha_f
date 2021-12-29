import { config, mount, createLocalVue} from '@vue/test-utils'
import CategoryList from '@/components/pages/CategoryList.vue'
import {mockCategory,mockCategorySub,mockGoodList} from '../../mockData'

// use old syntax for mount method
config.showDeprecationWarnings = false

const Vant=require("vant")


const localVue = createLocalVue();
localVue.use(Vant); 


describe('CategoryList',  () => {

  let wrapper;
  // mock getCategory()
  const getCategory = jest.spyOn(CategoryList.methods, 'getCategory')
  .mockImplementation(() => {
    //***so far we can not set data be for wrapper created */
    //wrapper.setData({ category: mockCategory })
    //wrapper.vm.category = mockCategory;
    //console.log("***",wrapper.vm.category)
    //console.log("**can not set data to vm before wrapper created**")
  })

  // mock getGoodList()
  const getGoodList = jest.spyOn(CategoryList.methods, 'getGoodList')
  .mockImplementation(() => {
    //console.log("mock getGoodList implementation")
  })
  // mock goGoods()
  const goGoods = jest.spyOn(CategoryList.methods, 'goGoods')
  .mockImplementation(() => {
    //console.log("mock goGoods implementation")
  })
  // mock onLoad()
  const onLoad = jest.spyOn(CategoryList.methods, 'onLoad')
  .mockImplementation(async() => {
    await getGoodList()
    //console.log("mock onLoad implementation")
  })

  // mock clickCategory()
  const clickCategory = jest.spyOn(CategoryList.methods, 'clickCategory')
  .mockImplementation(() => {
    getSubCategoryByCategoryId() // we dont need have to pass some params
    //console.log("mock clickCategory implementation")
  })

  // mock onClickCategorySub()
  const onClickCategorySub = jest.spyOn(CategoryList.methods, 'onClickCategorySub')
  .mockImplementation(() => {
    onLoad() 
    //console.log("mock clickCategory implementation")
  })

  // mock getSubCategoryByCategoryId()
  const getSubCategoryByCategoryId = jest.spyOn(CategoryList.methods, 'getSubCategoryByCategoryId')
  .mockImplementation(() => {
    onLoad()
    //console.log("mock getSubCategoryByCategoryId implementation")
  })

  beforeEach(() => {
    wrapper = mount(CategoryList,{
      localVue,
      //***set value for data obj---method1: write it inside mounting options */
      // data() {
      //   return {
      //     category:mockCategory
      //   }
      // }
    })
    //***set value for data obj---method2: use setData() */
    wrapper.setData({ category: mockCategory })
  })

  it('renders CategoryList', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('getCategory in created() should be called', () => {
    expect(getCategory).toHaveBeenCalled()
  })
  
  it('clickCategory(...), getSubCategoryByCategoryId(...), onload() and getGoodList() should be called', async () => {
    await wrapper.findAll('[data-test="category_item"]').at(1).trigger('click');
    expect(clickCategory).toHaveBeenCalled()
    expect(getSubCategoryByCategoryId).toHaveBeenCalled()
  })

  it('onClickCategorySub(...), onload() and getGoodList() should be called', async () => {
    await wrapper.setData({ categorySub: mockCategorySub })
    await wrapper.findAll('[data-test="categorysub_items"]>div>div>div').at(1).trigger('click');
    expect(onClickCategorySub).toHaveBeenCalled()
  })

  it('goGoods should be called', async () => {
    await wrapper.setData({ goodList: mockGoodList })
    await wrapper.findAll('[data-test="goods_item"]').at(1).trigger('click');
    expect(goGoods).toHaveBeenCalled()
  })

  //******trigger refresh should be done in the future******

})