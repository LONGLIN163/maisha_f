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
                    <van-button size="mini">search</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- slider -->
        <div class="swiper-area">
            <van-swipe class="my-swipe" :autoplay="1000">
                <van-swipe-item v-for="(item,index) in bannerPicArray" :key="index">
                    <img v-lazy="item.imageUrl" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'haha',
                locationIcon:require("../../assets/images/location.png"),
                bannerPicArray:[
                  {imageUrl:'https://images.pexels.com/photos/6069562/pexels-photo-6069562.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
                  {imageUrl:'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
                  {imageUrl:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
                ]
            }
        },
    }
</script>

<style scoped>
  .search-bar{
      height: 2.2rem;
      background-color: #e5017d;
      line-height:2.2rem;
      overflow: hidden;

  }
  .search-input{
      width:100%;
      height: 1.3rem;
      border-top:0px;
      border-left:0px;
      border-right:0px;
      border-bottom: 1px solid rgb(255, 255, 255) !important ; 
      background-color: #e5017d;
      color:#fff;
  }
  .location-icon{
      padding-top: .2rem;
      padding-left: .3rem;
  }
  .swiper-area{
      width:20rem;
      max-height: 15rem;
      overflow: hidden;
  }
</style>