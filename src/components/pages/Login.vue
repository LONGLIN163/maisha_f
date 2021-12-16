<template>
    <div>
       <van-nav-bar
        title="Login"
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
            :error-message="usernameErrorMsg"
            required
            @click-icon="username = ''"
        />

        <van-field
            v-model="password"
            type="password"
            label="Password"
            placeholder="Please input password"
            :error-message="passwordErrorMsg"
            required
        />
        <div class="register-button">
            <van-button 
            type="primary" 
            @click="loginAction" 
            size="large" 
            :loading="openLoading" 
            loading-text="loading"
            >Login</van-button>
        </div>
       </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import serviceApi from '@/serviceApi.config.js'
    import {Toast} from 'vant'

    export default {
        data() {
            return {
                username: '',
                password: '',
                openLoading:false, // controller register loading status
                loadingText:'',
                usernameErrorMsg:'', // name validation
                passwordErrorMsg:'',  // password validation
            }
        },
        created(){
            if(localStorage.userInfo){
                    Toast.success('You r logged in!')
                    this.$router.push('/')
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)   
            },
            checkForm(){
                let isOk= true
                if(this.username.length<5){
                    this.usernameErrorMsg="username can not be less than 5 digit"
                    isOk= false
                }else{
                    this.usernameErrorMsg=''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg="username can not be less than 6 digit"
                    isOk= false
                }else{
                    this.passwordErrorMsg=''
                }
                return isOk
            },
            loginAction(){
               this.checkForm() && this.login() // only register when no problem
            },
            login(){
                this.openLoading=true // start loading, prevent resubmit 2
                axios({
                    url:serviceApi.userLogin,
                    method:'POST',
                    data:{
                       userName:this.username,
                       password:this.password,
                    }
                })
                .then(res => {
                    if(res.data.code==200 && res.data.message){
                        // we need a promise to wait the login info get stored, then do the other thing
                        new Promise((resolve)=>{
                        // use localStorage to store loged in info
                        localStorage.userInfo={userName:this.username}
                        setTimeout(()=>{resolve()},500) 
                        }).then(()=>{ // if saved success,then do the other things
                            Toast.success('Login success!')
                            this.$router.push('/') // prevent resubmit 1
                        }).catch(err=>{
                            Toast.fail('Login status saved failed')
                            console.log(err)
                        })
                    }else{
                        console.log(res.data.message)
                        this.openLoading=false // stop loading
                        Toast.fail('Login failed!')
                    }
                })
                .catch((error) => {
                    console.log(error)
                    Toast.fail('Login failed,error!')
                    this.openLoading=false  // stop loading 
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
        .register-button{
            padding-top:10px;
        }
    }
</style>