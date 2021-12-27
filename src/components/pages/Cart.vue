<template>

    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="Cart"
                left-text="Back"
                left-arrow
                @click-left="onClickLeft"
            ></van-nav-bar>
            <!--***van-nav-bar has to be a close tag, otherwise will have error occurs in testing***-->
        </div>

        <div class="card-title">
            <van-button size="small" type="danger" @click="clearCart" plain>Empty Cart</van-button>
        </div>
        <div class="cart-list">
            <div class="cart-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="cart-img"><img :src="item.image" width="100%" /></div>
                <div class="cart-text">
                    <div class="cart-goods-name">{{item.Name}}</div>

                        <div class="cart-control">
                        <van-stepper v-model="item.count" />
                    </div>
                </div>
                <div class="cart-goods-price">
                    <div>
                            {{item.price |moneyFilter}} €
                    </div>
                    <div>
                        x{{item.count}}
                    </div>
                    <div class="allPrice">
                        {{item.price*item.count | moneyFilter}} €
                    </div>

                </div>
         
            </div>
        </div>
        <div class="totalMoney">

            Total: {{totalMoney | moneyFilter}} €

        </div>
    </div>
    
</template>

<script>
import {toMoney} from '@/filters/moneyFilter.js'
export default {
    data() {
        return {
            cartInfo: [],     //product item in the shopping cart
            isEmpty : false , 
        }
    },
    created(){
        this.getCartInfo()
    },
    computed:{
        totalMoney(){
            let allMoney = 0
            this.cartInfo.forEach((item) => {
               allMoney += item.price*item.count
            });

            localStorage.cartInfo=JSON.stringify(this.cartInfo)

            return allMoney
        }
    },
    methods: {
        getCartInfo() {
            if(localStorage.cartInfo){
                this.cartInfo = JSON.parse(localStorage.cartInfo) 
            }
            console.log(' this.cartInfo:'+JSON.stringify( this.cartInfo))
            this.isEmpty = this.cartInfo.length>0 ? true : false
        },
        clearCart(){
            localStorage.removeItem('cartInfo')
            this.cartInfo=[]
        },
        onClickLeft(){ // go to last page
            this.$router.go(-1)
        }
    },
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }  
    }
}
</script>

<style lang="scss" scoped>
.card-title{
    height: 2rem;
    line-height:2rem;
    background-color: $color-background-sub;
    border-bottom:$color-divider;
    padding:5px;
    text-align: right;
}
.cart-list{
    background-color: $color-background-sub;
    .cart-row{
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        padding:0.5rem;
        font-size:0.85rem;
        border-bottom:$color-divider;
        .cart-img{
            flex:6;
        }
        .cart-text{
            flex:14;
            padding-left:10px;
            .cart-control{
                padding-top: 10px;
            }
        }
        .cart-goods-price{
            flex:4;
            text-align: right;
        }
    }
}
.totalMoney{
    text-align: right;
    background-color: $color-secondary;
    border-bottom:$color-divider;
    padding: 5px;
}
</style>