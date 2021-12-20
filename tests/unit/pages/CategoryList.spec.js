/**
 * @jest-environment jsdom
 */

import { config, shallowMount, mount, createLocalVue} from '@vue/test-utils'
import CategoryList from '@/components/pages/CategoryList.vue'
import axios from 'axios';

// use old syntax for mount method
config.showDeprecationWarnings = false

const Vant=require("vant")

const localVue = createLocalVue();
localVue.use(Vant); 

//jest.mock('axios');

describe('CategoryList',  () => {

  beforeEach(() => {
    const el = document.createElement("div");
    el.setAttribute("data-app", true);
    document.body.appendChild(el);
  });

  it('renders a div',async () => {

    // const mockData = {
    //   data:{
    //     code: 200,
    //     message:[
    //       {
    //         COMMENTS: null,
    //         ID: "1",
    //         IMAGE: "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png",
    //         MALL_CATEGORY_NAME: "Fruit",
    //         SORT: 1,
    //         TYPE: 2,
    //         _id: "6177b1b239ecdaaaa86b1f30"
    //       }
    //     ]
    //   }
    // }

    // const fetchData=axios.get.mockResolvedValue(mockData);

    // const getCategory = jest.fn().mockImplementation(() => {
    //   fetchData().then( (data) => {
    //     console.log("data---",data)
    //   })
    // })
    
    // const wrapper = mount(CategoryList,{
    //   localVue,
    //   methods:{getCategory},
    // })
    // expect(getCategory).toHaveBeenCalled();

    
    /**
     * When the reference data come from vue lifecircle hooks, we don't need to have to test dom.
     * Because current jest don't support lifecircle hooks for vue or react.
     * Because the mocked lifecircle hooks will be called before wrapper created.
     * It's hard to bind "this" to the wrapper.
     * Testing shouldn't go too far.
     * Shouldn't make any snapshort here.
     */

    const wrapper = mount(CategoryList, {
      localVue
    })

    expect(wrapper).toMatchSnapshot()

  })
})