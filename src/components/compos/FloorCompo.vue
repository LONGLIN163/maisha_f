<template>
    <div>
        <div class="floor">
            <div class="floor-title">{{floorTitle}}</div>
            <div class="floor-anomaly">
                <van-row>
                    <van-col span="12" class="floor-one">
                        <img :src="floorData0.image" alt="">
                    </van-col>
                    <van-col span="12" class="floor-two">
                        <div>
                            <div><img :src="floorData1.image"/></div>
                            <div><img :src="floorData2.image"/></div>
                        </div>
                    </van-col>
                </van-row>
            </div>

            <div class="floor-rule">
                <div v-for="(item ,index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" height="100%" width="100%"/>
                </div>
            </div>
 
        </div>

    </div>
</template>

<script>
    export default {
        props:['floorData','floorTitle'],
        data() {
            return {
                floorData0:{},
                floorData1:{},
                floorData2:{},
            }
        },
        created(){
        },
        mounted(){
        },
        watch:{ 
            //monitor asyn data
            floorData:function() { 
                this.floorData0=this.floorData[0]
                this.floorData1=this.floorData[1]
                this.floorData2=this.floorData[2]
            }
        }
        
    }
</script>

<style lang="scss" scoped>

  .floor-title{
    text-align: center;
    font-size: 14px;
    line-height: 1.8rem;
    height: 1.8rem;
    padding-top: 10px;
  }

  .floor-anomaly{
    height: 10rem;
    .floor-one {
        border-right:1px solid #ddd;
        height: 10rem;
        img {
             width: 100%;
             height:100%;
        }
    }
    .floor-two{
        height: 10rem;
        div{
            height: 5rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
  }

  .floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    background-color: #fff;
    height: 8rem;
    div{
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width:50%;
        border-bottom:1px solid #ddd;
      }
    div:nth-child(odd){
        border-right: 1px solid #ddd;
    }
  }

</style>