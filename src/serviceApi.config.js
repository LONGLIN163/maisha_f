//const BASEURL = "https://mocki.io/v1/56645569-6ae1-4faa-a9cc-25a88f18dd82"
const BASEURL = "https://mocki.io/v1/650df28c-0834-484b-9c6c-f1c5c5126002"
//const LOCALURL = "http://localhost:3000/"
const LOCALURL = "https://maishab.herokuapp.com/"
const serviceApi = {
    getShoppingMallInfo:BASEURL+'',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    userRegister:LOCALURL+'user/register',
    userLogin:LOCALURL+'user/login',
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',
    getCategoryList:LOCALURL+'goods/getCategoryList',
    getSubCategoryList:LOCALURL+'goods/getSubCategoryList',
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID'
}

module.exports = serviceApi