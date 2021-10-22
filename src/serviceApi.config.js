const BASEURL = "https://mocki.io/v1/56645569-6ae1-4faa-a9cc-25a88f18dd82"
const LOCALURL = "http://localhost:3000/"
const serviceApi = {
    getShoppingMallInfo:BASEURL+'',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    userRegister:LOCALURL+'user/register',
    userLogin:LOCALURL+'user/login',
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',
}

module.exports = serviceApi