import {mount, createLocalVue} from '@vue/test-utils'
import ShoppingMall from '@/components/pages/ShoppingMall.vue'
//import puppeteer from 'puppeteer'
import Vue from 'vue'

const Vant=require("vant")

const {Lazyload}=Vant

Vue.use(Lazyload)

const localVue = createLocalVue();
localVue.use(Vant); 


let wrapper;
//mock func and hook it to the component
const initData = jest.spyOn(ShoppingMall.methods, 'initData')
beforeEach(() => {
  wrapper = mount(ShoppingMall,{
    localVue,
    Lazyload
  })
})

describe('ShoppingMall', () => {
  
  /**
   * Get the snapshot
   */
  it('should renders ShoppingMall', () => {
    expect(wrapper).toMatchSnapshot()
  })

  
  /**
   * Integration testing - initData has been called when running create()
   */
  it('initData in created() should be called', () => {
    expect(initData).toHaveBeenCalled()
  })
  

  /**
   * Check if the other component rendered and some sample ui elements working fine.
   */
  it('should have FloorCompo elements with classname "floor-title"', () => {
    const floorTitle=wrapper.find('.floor-title')
    expect(floorTitle.exists()).toBe(true)
  })

  it('should have Goods Compo elements with classname "goods-info"', () => {
    const goodsInfo=wrapper.find('.goods-info')
    expect(goodsInfo.exists()).toBe(true)
  })

  it('The search field should can be input', () => {
    const searchInput=wrapper.find('.search-input')
    searchInput.setValue("haha")
    expect(searchInput.element.value).toBe("haha")
  })
  
})

// test("puppeteer setup--",async ()=>{
//   const browser = await puppeteer.launch({
//     headless:false,
//     slowMo:1000,
//     args:['--windows-size=375,812']
//   }) 
//   const page=await browser.newPage();
//   await page.goto("http://192.168.0.17:8080/")
//   await page.type(".search-input","haha")
// })
