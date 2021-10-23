<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar  title="Category" /> 
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
                        <van-tabs v-model="active">
                            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

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
                                <div class="list-item" v-for="item in list" :key="item">
                                    {{item}}
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
    export default {
        data() {
            return {
                category:[],
                activeCategoryIndex:0, 
                active:0,
                categorySub:[],
                list:[], // the items of a subcat
                loading:false,   //vant loading status
                finished:false,  //vant loading done or not
                isRefresh:false
            }       
        },
        created(){
            this.getCategory();
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById("leftNav").style.height= winHeight-46 +'px'
            document.getElementById('list-div').style.height=winHeight-90 +'px'

        }, 
        methods:{
            getCategory() {  
                axios({
                    url:serviceApi.getCategoryList,
                    method:'get',
                })
                .then(res=>{
                    //console.log(res)
                    if(res.data.code == 200 && res.data.message ){
                        this.category=res.data.message
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
                this.getSubCategoryByCategoryId(categoryId)

            },
            getSubCategoryByCategoryId(categoryId){
                axios({
                    url:serviceApi.getSubCategoryList,
                    method:'post',
                    data:{categoryId:categoryId}
                })
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200 && res.data.message ){
                        this.categorySub=res.data.message
                        this.active = 0 // active first subcat when switch big category´+`ñlpoikhygt
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
                    for(let i=0;i<10;i++){
                        this.list.push(this.list.length+1)
                    }
                    this.loading=false;
                    if (this.list.length >= 40) {
                    this.finished = true;
                    }
                },500)
            },
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    this.finished = false;
                    this.list=[];
                    this.onLoad()
                }, 500);
            }
        }
    }
</script>

<style scoped>
    #leftNav ul li {
        line-height: 2rem;
        border-bottom:1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    }
    .categoryActive{
        background-color: #fff;
    }
    .list-item{
        text-align: center;
        line-height: 80px;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
    }
    #list-div{
        overflow: scroll;
    }
</style>