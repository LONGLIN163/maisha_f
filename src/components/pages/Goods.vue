<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="Product Details"
                left-text="Back"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%"/>
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">Price:{{goodsInfo.PRESENT_PRICE | moneyFilter}}$</div>
        <div>
            <van-tabs swipeable sticky>
                <van-tab title="Details">
                <div class="detail" v-html="goodsInfo.DETAIL">

                </div>
                </van-tab>
                <van-tab title="Comment">
                    no any comments...
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div>
                <van-button size="large" type="primary">ADD TO CART</van-button>
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
            this.goodsId=this.$route.query.goodsId
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
                        Toast('Server error, fetching data failed!!!')
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
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }  
        },
    }
</script>

<style scoped>
   .detail{
     font-size:0px;
    }
    .goods-name{
        background-color: #fff;
    }
    .goods-price{
        background-color: #fff;
    }
    .goods-bottom{
        position: fixed;
        bottom:0px;
        left:0px;
        background-color: #FFF;
        width:100%;

        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
    }
    .goods-bottom > div{
        flex:1;
        padding:2px;
    }
</style>