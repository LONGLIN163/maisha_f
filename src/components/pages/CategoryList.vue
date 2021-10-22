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
                                @click="clickCategory(index)" 
                                :class="{categoryActive:activeCategoryIndex==index}"
                            >
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">right side</van-col>
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
            }
        },
        created(){
            this.getCategory();
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById("leftNav").style.height= winHeight-46 +'px'
        }, 
        methods:{
            getCategory() {
                axios({
                    url:serviceApi.getCategoryList,
                    method:'get',
                })
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200 && res.data.message ){
                         this.category=res.data.message
                    }else{
                        Toast('Server error, fetch data failed!')
                    }

                })
                .catch(error=>{
                    console.log(error)
                }) 
            },
            clickCategory(index){
                console.log(index)
                this.activeCategoryIndex=index
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
</style>