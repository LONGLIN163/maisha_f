<template>
    <div>
       <van-nav-bar
        title="Sign Up"
        left-text="back"
        left-arrow
        @click-left="goBack"
        />

        <div class="register-panel">
        <van-field
            v-model="username"
            label="User Name"
            icon="clear"
            placeholder="Please input user name"
            required
            @click-icon="username = ''"
        />

        <van-field
            v-model="password"
            type="password"
            label="Password"
            placeholder="Please input password"
            required
        />
        <div class="register-button">
            <van-button type="primary" @click="register" size="large">Register Now</van-button>
        </div>
       </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import serviceApi from '@/serviceApi.config.js'

    export default {
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)   
            },
            register(){
                alert('register')
                axios({
                    url:serviceApi.userRegister,
                    method:'POST',
                    data:{
                       username:this.username,
                       password:this.password
                    }
                })
                .then(response => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>