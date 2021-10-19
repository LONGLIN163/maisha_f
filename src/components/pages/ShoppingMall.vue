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
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        data() {
            return {
                msg: 'haha',
                locationIcon:require("../../assets/images/location.png"),
                bannerPicArray:[],
                category:[],
                adBanner:{}

            }
        },
        created(){
            axios({
                url:"https://mocki.io/v1/56645569-6ae1-4faa-a9cc-25a88f18dd82",
                method:"GET",

            }).then(res=>{
                console.log(res)
                if(res.status==200){
                    this.category = res.data.data.category;
                    this.adBanner = res.data.data.advertesPicture
                    this.bannerPicArray = res.data.data.slides
                }
            }).catch(err=>{
                console.log(err)
            })
        }

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
   .type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
  }
</style>