<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" alt="" width="70%" class="location-icon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input"/>
                </van-col>
                <van-col span="5">
                    <van-button size="mini">Search</van-button>
                </van-col>
            </van-row>
        </div>

        <!-- slider -->
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- types -->
        <div class="type-bar">
            <div  v-for="(item,index) in category" :key="index" >
                    <img v-lazy="item.image" width="90%" />
                    <span>{{item.mallCategoryName}}</span> 
            </div>
        </div>

        <!--AD banner area-->
        <div class="ad-banner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
        </div>

        <!-- recommend -->
        <div class="recommend-area">
            <div class="recommend-title">
                Recommendation
            </div>
            <div class="recommend-body">

                <!--swiper-->
                <swiper :options="swiperOption">
                    <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                        <div class="recommend-item">

                                <img :src="item.image" width="80%" />
                                <div>{{item.goodsName}}</div>
                                <div>{{item.price | moneyFilter}}€ ({{item.mallPrice | moneyFilter}}€)</div>

                        </div>
                    </swiper-slide>
                </swiper>
                
            </div>
        </div>
        <!--floor one area-->
        <FloorCompo :floorData='floor1' :floorTitle='floorName.floor1'></FloorCompo>
        <FloorCompo :floorData='floor2' :floorTitle='floorName.floor2'></FloorCompo>
        <FloorCompo :floorData='floor3' :floorTitle='floorName.floor3'></FloorCompo>

        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">HOT</div>
            <div class="hot-goods">
                <van-list>
                        <van-row gutter="20">
                            <van-col class="hotgoodsitem"  span="12" v-for="( item, index) in hotGoods" :key="index">
                                <GoodsInfoCompo 
                                 :goodsImage='item.image' 
                                 :goodsName='item.name' 
                                 :goodsPrice='item.mallPrice'
                                 :goodsId='item.goodsId' 
                                ></GoodsInfoCompo>
                            </van-col>
                        </van-row>
                    </van-list>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from "axios" 

    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import FloorCompo from '@/components/compos/FloorCompo'
    import GoodsInfoCompo from '@/components/compos/GoodsInfoCompo'
    import {toMoney} from '@/filters/moneyFilter.js'
    import serviceApi from '@/serviceApi.config.js'
        
    export default {
        data() {
            return {
                swiperOption:{
                    slidesPerView: 3
                },
                msg: 'haha',
                locationIcon:require("../../assets/images/location.png"),
                bannerPicArray:[],
                category:[],
                adBanner:{},
                recommendGoods:[],
                floor1:[],
                floor2:[],
                floor3:[],
                floorName:{},
                hotGoods:[]
            }
        },
        components:{
            swiper,
            swiperSlide,
            FloorCompo,
            GoodsInfoCompo
        },
        created(){
            axios({
                url:serviceApi.getShoppingMallInfo,
                method:"GET",

            }).then(res=>{
                console.log(res)
                if(res.status==200){
                    this.category = res.data.data.category;
                    this.adBanner = res.data.data.advertesPicture
                    this.bannerPicArray = res.data.data.slides
                    this.recommendGoods = res.data.data.recommend
                    this.floor1 = res.data.data.floor1        
                    this.floor2 = res.data.data.floor2        
                    this.floor3 = res.data.data.floor3        
                    this.floorName = res.data.data.floorName  
                    this.hotGoods = res.data.data.hotGoods      
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        }

    }
</script>

<style lang="scss" scoped>

.search-bar {
  height: 2.2rem;
  background-color: $color-primary;
  line-height: 2.2rem;
  overflow: hidden;
  .search-input {
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid rgb(255, 255, 255) !important;
    background-color: $color-background-tape;
    color: $color-tab-default;
  }
  .van-button--mini {
    top: -0.3rem;
    right: -0.8rem;
  }
}




.location-icon {
  padding-top: .2rem;
  padding-left: .3rem;
}

.swiper-area {
  width: 20rem;
  max-height: 15rem;
  overflow: hidden;

  .swiper-wrapper {
    height: 10rem;
  }

  img {
    height: 16rem;
  }
}

.type-bar {
  background-color: $color-tab-default;
  margin: 0 .3rem .3rem .3rem;
  border-radius: .3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  div {
    padding: .3rem;
    font-size: 12px;
    text-align: center;
    flex: 1;
  }
}

.recommend-area {
  background-color: $color-tab-default;
  margin-top: .3rem;
  .recommend-title {
    border-bottom: $color-divider;
    font-size: 14px;
    padding: .2rem;
  }
  .recommend-body {
    border-bottom: $color-divider;
  }

  .recommend-item {
    width: 99%;
    border-right: $color-divider;
    font-size: 12px;
    text-align: center;
    height: 10rem;
  }
}




.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
  padding-top: 15px;
  .hot-goods {
    height: 150rem;
    overflow: hidden;
    background-color: $color-tab-default;
    padding-top: 15px;
  }
}


</style>