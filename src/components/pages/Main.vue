<template>
    <div>
        <div class="main-div">
         <!-- use "router-view" to put the sub pages to the current page -->
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>

        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">Home</van-tabbar-item>
            <van-tabbar-item icon="records" data-test="tab-list">List</van-tabbar-item>
            <van-tabbar-item icon="cart">Shopping Cart</van-tabbar-item>
            <van-tabbar-item icon="contact" info="3" data-test="tab-account">Account</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0
            }
        },
        created(){
            this.changeTabBarActive()
        },
        updated(){
            this.changeTabBarActive()
        },
        methods: {
            changeTabbar(active) {
                console.log(active)
                switch(active){
                    case 0:
                        this.$router.push({name:'ShoppingMall'})
                        break;
                    case 1:
                        this.$router.push({name:'CategoryList'})
                        break;
                    case 2:
                        this.$router.push({name:'Cart'})
                        break;
                    case 3:
                        this.$router.push({name:'Member'})
                        break;
                    case 4:
                        break;
                }
            },
            changeTabBarActive(){
                this.nowPath=this.$route.path
                if(this.nowPath=='/cart'){
                    this.active=2;
                }
            },
        },
    }
</script>

<style lang="scss" scoped>

    .van-tabbar-item--active{
        color: $color-primary !important;
    }
    .van-info{
        color: $color-primary !important;
    }


</style>