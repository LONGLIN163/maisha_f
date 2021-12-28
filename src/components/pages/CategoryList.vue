<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar data-test="CategoryTitle"  title="Category" /> 
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li 
                                v-for="(item,index) in category" 
                                :key="index" 
                                @click="clickCategory(index,item.ID)" 
                                :class="{categoryActive:activeCategoryIndex==index}"
                            >
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab 
                               v-for="(item, index) in categorySub" 
                               :key="index" 
                               :title="item.MALL_SUB_NAME" 
                               @click="clickSubCategory(index,item.ID)"
                               :class="{subCategoryActive:activeSubCategoryIndex==index}"
                            >

                            </van-tab>
                        </van-tabs>
                    </div>
                    <!-- product show -->
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">

                            <van-list
                                v-model="loading"
                                :finished="finished"
                                @load="onLoad"
                            >
                                <div class="list-item" @click="goGoods(item.ID)" v-for="(item,index) in goodList" :key="index">
                                    <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg"/></div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div class="">{{item.ORI_PRICE | moneyFilter}}</div>
                                    </div>
                                </div>
                            </van-list>

                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from "axios" 
    import serviceApi from '@/serviceApi.config.js'
    import {toMoney} from '@/filters/moneyFilter.js'
    import {Toast} from 'vant'

    export default {
        data() {
            return {
                category:[],
                activeCategoryIndex:0, 
                activeSubCategoryIndex:0,
                active:0,
                categorySub:[],
                loading:false,   //vant loading status
                finished:false,  //vant loading done or not
                isRefresh:false,
                page:1, // init page number 1 
                goodList:[],   
                categorySubId:'', 
                errorImg:'this.src="' + require('@/assets/images/errorImg.png') + '"',  
                categoryId:1

            }       
        },
        created(){
            this.getCategory();
        },
        methods:{
            getGoodList(){
                    axios({
                    url:serviceApi.getGoodsListByCategorySubID,
                    method:'post',
                    data:{
                            categorySubId:this.categorySubId,
                            page:this.page
                        }
                })
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200 && res.data.message.length ){
                        this.page++
                        this.goodList=this.goodList.concat(res.data.message)
                    }else{
                            this.finished = true;  
                    }
                    this.loading=false;
                    console.log(this.finished)
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            onClickCategorySub(index){
                this.categorySubId= this.categorySub[index].ID
                this.goodList=[]
                this.activeSubCategoryIndex=index
                this.finished = false
                this.page=1
                this.onLoad()
            },
            getCategory() {  
                axios({
                    url:serviceApi.getCategoryList,
                    method:'get',
                })
                .then(res=>{
                    console.log("res---init---",res)
                    if(res.data.code == 200 && res.data.message ){
                        this.category=res.data.message.sort(function(a, b) { 
                            return - ( b.ID - a.ID );
                        });
                        console.log(" this.category---------",this.category)

                        this.getSubCategoryByCategoryId(this.category[0].ID) // get the first sub cat when we get big category
                    }else{
                        Toast('Server error, fetch data failed!')
                    }
                })
                .catch(error=>{
                    console.log(error)
                }) 
            },
            clickCategory(index,categoryId){
                console.log(index)
                this.activeCategoryIndex=index

                // init paging info
                this.page=1
                this.finished = false
                this.goodList=[]

                this.getSubCategoryByCategoryId(categoryId)

            },
            getSubCategoryByCategoryId(categoryId){
                axios({
                    url:serviceApi.getSubCategoryList,
                    method:'post',
                    data:{categoryId:categoryId}
                })
                .then(res=>{
                    console.log("res---sub---",res)
                    if(res.data.code == 200 && res.data.message ){
                        this.categorySub=res.data.message
                        this.active = 0 // active first subcat when switch big category

                        console.log("res---categorySub---",this.categorySub)

                        this.categorySubId=this.categorySub[0].ID
                        this.onLoad()
                    }else{
                        Toast('Server error, fetching data failed!')
                    }  
                })
                .catch(error=>{
                    console.log(error)
                }) 
            },
            onLoad(){
                setTimeout(()=>{
                    this.categorySubId=this.categorySubId ? this.categorySubId : this.categorySub[0].ID
                    this.getGoodList()
                },1000)
            },
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    this.finished = false;
                    this.goodList=[];
                    this.page=1;
                    this.onLoad();
                }, 500);
            },
            goGoods(id){
                this.$router.push({name:'Goods',params:{goodsId:id}})
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
    #leftNav ul li {
        line-height: 2rem;
        border-bottom:$color-divider2;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
        .categoryActive{
            background-color: $color-background-sub;
        }
    }

    // ***this is vant bug***
    .van-tab--active{
        color:rgb(45, 57, 235) !important;
    }

        
    #list-div{
        .list-item{
            display: flex;
            flex-direction: row;
            font-size:0.8rem;
            border-bottom: 1px solid $color-background;
            background-color: $color-background-sub;
            padding:5px;
            .list-item-img{
                flex:8;
            }
            .list-item-text{
                flex:16;
                margin-top:10px;
                margin-left:10px;
            }
        }
        overflow: scroll;
    }


</style>