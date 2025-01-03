<template>
    <div class="form-wrap">
        <form class="reset"> 
            <p class="login-register">
                Don't have an account?
                <router-link class="router-link" :to="{ name: 'Register' }"> Register</router-link>
            </p>
            <h2> Login to FireBlogs</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" class="email" v-model="email" placeholder="Email">
                    <email class="icon"></email>
                </div>
                <div class="input">
                    <input type="text" class="password" v-model="password" placeholder="Password">
                    <password class="icon"></password>
                </div>
                <div v-show="error" class="error">
                    {{ this.errorMsg }}
                </div>
            </div>
            <router-link class="forgot-password" :to="{ name: 'forgotPassword' }"> Forgot your password?</router-link>
            
            <button @click.prevent="login">SignIN</button>

            <div class="angle"></div>
        </form>
        <div class="background"></div>

    </div>
</template>

<script>
import email from '../assets/Icons/envelope-regular.svg'
import password from '../assets/Icons/lock-alt-solid.svg'
import firebase from 'firebase/app';
import "firebase/auth"

export default {
    name : 'login',
    components : { email , password},
    data(){
        return {
            email:"",
            password:"",
            error:false,
            errorMsg:"",
        }
    },

    methods: {
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email,this.password)
                .then(() => {
                    this.error = false;
                    this.errorMsg="";
                    this.$router.push({name:'Home'})
                })
                .catch((err) =>{
                    this.error = true;
                    this.errorMsg = err;
                }
            )
        }
    }
}
</script>

<style lang="scss" scoped>

.form-wrap{
    overflow: hidden;
    display: flex;
    height: 100vh;
    width: 90%;
    justify-content: center;
    align-self: center;
    margin: 0 auto;

    @media (min-width:800px){
        width: 100%;
    }



    .login-register {
        margin-bottom: 32px;

        .router-link {
            color: #000;
        } 
    }

    form {
        padding:0 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex:1;

        @media (min-width:800px) {
            padding: 0 50px;
        }

        h2 {
            text-align: center;
            margin-bottom: 40px;
            font-size: 32px;
            color: #303030;

            @media (min-width:800px) {
                font-size: 40px;
            }
        }

        .inputs {
            width: 100%;
            max-width: 350px;

            .input {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 8px;

                input {
                    padding: 4px 4px 4px 30px;
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    height: 50px;

                    &:focus {
                        outline: none;
                    }
                }

                .icon {
                    position:absolute;
                    width:12px;
                    left :5px;
                }
            }
        }

        .forgot-password {
            font-size: 14px;
            text-decoration: none;
            padding: 16px 0 32px;
            cursor: pointer;
            transition:.5s ease all;
            border-bottom: 1px solid transparent;


        }
    }

    .angle {
        display: none;
        position: absolute;
        transform: rotateZ(3deg);
        background-color: #fff;
        right:-30px;
        height: 101%;
        margin-right: 0px;
        padding-right: 0px;
        @media (min-width:800px) {
            display: initial;
        }
    }

}

.background {
    display: none;
    flex:2;
    background-image: url('../assets/background.png');
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media (min-width:800px) {
       display: initial; 
    }
}
</style>