<template>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an Account?
                <router-link class="router-link" :to="{ name: 'Login' }"> Login</router-link>
            </p>
            <h2> SignUp to FireBlogs</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" class="firstName" v-model="firstName" placeholder="firstName">
                    <user class="icon"></user>
                </div>
                <div class="input">
                    <input type="text" class="lastName" v-model="lastName" placeholder="lastName">
                    <user class="icon"></user>
                </div>
                <div class="input">
                    <input type="text" class="userName" v-model="userName" placeholder="userName">
                    <user class="icon"></user>
                </div>
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
            <button @click.prevent="register">SignUp</button>

            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import email from '../assets/Icons/envelope-regular.svg'
import password from '../assets/Icons/lock-alt-solid.svg'
import user from '../assets/Icons/user-alt-light.svg'
import firebase from 'firebase/app'
import "firebase/auth"
import db from '../firebase/firebaseInit'

export default {
    name : 'login',
    components : { email , password , user},
    data(){
        return {
            email:"",
            password:"",
            firstName:"",
            lastName:"",
            userName:"",
            error:false,
            errorMsg:"",
        }
    },
    methods:{
        async register(){
            if ( this.email !== "" && this.password !== "" && this.firstName !== "" && this.lastName !== "" && this.userName !== ""){
                this.error=false;
                this.errorMsg='';

                const firebaseAuth =await firebase.auth();
                const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email , this.password)
                const result = await createUser;
                const dataBase = await db.collection('users').doc(result.user.uid);
                await dataBase.set({
                    email:this.email,
                    firstName:this.firstName,
                    lastName:this.lastName,
                    userName:this.userName
                });
                this.$router.push({name:'Home'});
                return;
            }

            this.error = true;
            this.errorMsg = "Please enter all fields";
            return;

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
                margin-bottom: 12px;

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

            &:hover {
                background-color: #303030;
            }

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
