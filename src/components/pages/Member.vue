<template>
    <div>
        <div>
            <van-nav-bar  title="Member" />
        </div>
        <div class="top">
           <img src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png" class="top-img" />
        </div>
        <div class="login">
            <div><van-button data-test="loginbtn" type="warning" @click="goToLogin">Sign in</van-button></div>
            <div><van-button  data-test="signupbtn" type="primary" @click="goToRegister">Singn up</van-button></div>
        </div>
        <div>
            <van-cell-group>
                <van-cell title="Card" is-link />
                <van-cell title="Address" is-link  />
                <van-cell title="Orders" is-link  />
                <van-cell title="Member rights" is-link />
                <van-cell title="Contact" is-link  />
            </van-cell-group>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods:{
            goToRegister(){
                this.$router.push({name:'Register'})
            },
            goToLogin(){
                this.$router.push({name:'Login'})
            },
        }
    }
</script>

<style lang="scss" scoped>
    .top{
        height:5rem;
        text-align: center;
        padding-top:2rem;
        background-color: $color-primary;
        .top-img{
            width:70px;
            height: 70px;
            border-radius: 50px;
        }
    }
    .login{
        display: flex;
        flex-direction: row;
        background-color: $color-background-tape;
        padding:10px;
        div{
            flex:1;
            text-align: center;
        }
    }
</style>