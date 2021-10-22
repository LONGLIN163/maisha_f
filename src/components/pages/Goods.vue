<template>
    <div>
        商品详情页面
    </div>
</template>

<script>
    import axios from 'axios'
    import serviceApi from '@/serviceApi.config.js'
    export default {
        data() {
            return {
                goodsId: '775e575ce28a4f89b1dfe2c99eb08ae7'
            }
        },
        created(){

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
                .then(response=>{
                    console.log(response)
                })
                .catch(error=>{
                    console.log(error)
                })
            }
        },
    }
</script>

<style scoped>

</style>