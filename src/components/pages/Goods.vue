<template>
    <div class="goodsbox">
        <div class="navbar-div">
            <van-nav-bar
                title="Product Details"
                left-text="Back"
                left-arrow
                @click-left="onClickLeft"
            ></van-nav-bar>
            <!--***van-nav-bar has to be a close tag, otherwise will have error occurs in testing***-->
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%"/>
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">Price:{{goodsInfo.PRESENT_PRICE | moneyFilter}}€</div>
        <div>
            <van-tabs swipeable sticky>
                <van-tab  title="Details">
                    <div class="detail" v-html="goodsInfo.DETAIL">

                    </div>
                </van-tab>
                <van-tab title="Comment">no any comments...</van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div>
                <van-button data-test="addtocard" size="large" type="primary" @click="addGoodsToCart">ADD TO CART</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">Buy</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import serviceApi from '@/serviceApi.config.js'
    import {Toast} from 'vant'
    import {toMoney} from '@/filters/moneyFilter.js'

    export default {
        data() {
            return {
                goodsId: '',
                goodsInfo:{}, 
            }
        },
        created(){
            this.goodsId= this.$route.query.goodsId ? this.$route.query.goodsId:this.$route.params.goodsId
            this.getInfo()
        },
        methods: {
            getInfo() {
                axios({
                    url:serviceApi.getDetailGoodsInfo,
                    method:'post',
                    data:{
                        goodsId:this.goodsId
                    }
                })
                .then(res=>{
                    // before we assign goodsInfo, we need to make some judgments 
                    if(res.data.code == 200 && res.data.message ){
                            this.goodsInfo = res.data.message 
                    }else{
                        //Toast('Server error, fetching data failed!!!')
                    }
                    console.log( this.goodsInfo)
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            onClickLeft(){ // go to last page
                this.$router.go(-1)
            },
            async addGoodsToCart(){
                //extract caretInfo for local first
                let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) :[]
                //check if target product is already exist
                let isHaveGoods=await cartInfo.find(item=>item.goodsId==this.goodsId)
                if(!isHaveGoods){ // add this product to the cart
                    let newGoodsInfo={
                        goodsId:this.goodsInfo.ID,
                        Name:this.goodsInfo.NAME,
                        price:this.goodsInfo.PRESENT_PRICE,
                        image:this.goodsInfo.IMAGE1,
                        count:1
                    }
                    cartInfo.push(newGoodsInfo) 
                    localStorage.cartInfo=JSON.stringify(cartInfo) //save to local
                    Toast.success('add to cart success!')

                }else{
                    Toast.success('this product is already exist!')
                }
                this.$router.push({name:'Cart'}) 
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }  
        },
    }
</script>

<style lang="scss" scoped>
   .detail{
     font-size:0px;
    }
    .goods-name{
        background-color: $color-background-sub;
    }
    .goods-price{
        background-color: $color-background-sub;
    }
    .goods-bottom{
        position: fixed;
        bottom:0px;
        left:0px;
        background-color: $color-background-sub;
        width:100%;

        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
        div{
            flex:1;
            padding:2px;
        }
    }
</style>