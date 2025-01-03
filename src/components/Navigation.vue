<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name : 'Home' }">Fire Blogs </router-link>
            </div>
            <div class="nav-links">
                <ul v-show="!mobile">
                    <router-link class="link" :to="{ name : 'Home' }"> Home</router-link>
                    <router-link class="link" :to="{name:'Blogs'}"> Blogs</router-link>
                    <router-link class="link" v-if="user" :to="{name:'createPost'}"> Create Post</router-link>
                    <router-link class="link" v-if="!user" :to="{name:'Login'}"> Login / Register </router-link>
                </ul>
                <div v-show="user && !mobile" class="profile" ref="profile">
                    <span @click="toggleProfileMenu = !toggleProfileMenu"> {{ this.$store.state.profileInitials
                        }}</span>
                    <div class="profile-menu" v-show="toggleProfileMenu">
                        <div class="top">
                            <div class="info">
                                <p class="initials"> {{ this.$store.state.profileInitials }}</p>
                            </div>
                            <div class="right">
                                <p class="name"> {{ this.$store.state.profileFirstName }} {{
                                    this.$store.state.profileLastName }} </p>
                                <p> {{ this.$store.state.profileUserName }}</p>
                                <p> {{ this.$store.state.profileEmail }}</p>
                            </div>
                        </div>

                        <div class="options">
                            <div class="option">
                                <router-link class="option" to="#">
                                    <userIcon class="icon"></userIcon>
                                    <p> Profile </p>
                                </router-link>
                            </div>
                            <div class="option">
                                <router-link class="option" to="#">
                                    <adminIcon class="icon"></adminIcon>
                                    <p> Admin </p>
                                </router-link>
                            </div>
                            <div class="option" @click="signOut">
                                <signOutIcon class="icon"></signOutIcon>
                                <p> SignOut </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile"></menuIcon>
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <router-link class="link" :to="{ name : 'Home' }"> Home</router-link>
                <router-link class="link" :to="{name:'Blogs'}"> Blogs</router-link>
                <router-link v-if="user" class="link" :to="{name:'createPost'}"> Create Post</router-link>
                <router-link v-if="!user" class="link" :to="{name:'Login'}"> Login / Register </router-link>
            </ul>
            <div v-show="user && mobile" class="profile" ref="profile">
                <span @click="toggleProfileMenu = !toggleProfileMenu"> {{ this.$store.state.profileInitials
                    }}</span>
                <div class="profile-menu" v-show="toggleProfileMenu">
                    <div class="top">
                        <div class="info">
                            <p class="initials"> {{ this.$store.state.profileInitials }}</p>
                        </div>
                        <div class="right">
                            <p class="name"> {{ this.$store.state.profileFirstName }} {{
                                this.$store.state.profileLastName }} </p>
                            <p> {{ this.$store.state.profileUserName }}</p>
                            <p> {{ this.$store.state.profileEmail }}</p>
                        </div>
                    </div>

                    <div class="options">
                        <div class="option">
                            <router-link class="option" :to="{ name: 'Profile' }">
                                <userIcon class="icon"></userIcon>
                                <p> Profile </p>
                            </router-link>
                        </div>
                        <div class="option">
                            <router-link class="option" :to="{ name: 'Admin' }">
                                <adminIcon class="icon"></adminIcon>
                                <p> Admin </p>
                            </router-link>
                        </div>

                        <div class="option" @click="signOut">
                            <signOutIcon class="icon"></signOutIcon>
                            <p> SignOut </p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </header>
</template>

<script>

import menuIcon from '../assets/Icons/bars-regular.svg';
import userIcon from '../assets/Icons/user-alt-light.svg';
import adminIcon from '../assets/Icons/user-crown-light.svg';
import signOutIcon from '../assets/Icons/sign-out-alt-regular.svg';
import firebase from 'firebase/app';
import "firebase/auth"
    export default {
        name : "navigation",

        data() {
            return {
                mobile : null,
                mobileNav : null,
                windowsWidth : null,
                toggleProfileMenu : false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },

        created(){
            window.addEventListener('resize' , this.checkScreen);
            this.checkScreen;
        },

        components : {
            menuIcon,
            userIcon,
            signOutIcon,
            adminIcon
        },

        methods: {
            checkScreen() {
                this.windowsWidth = window.innerWidth
                if (this.windowsWidth <= 750) {
                    this.mobile = true;
                    return;
                }

                this.mobile = false;
                this.mobileNav = false;
                return;
            },

            toggleMobileNav() {
                this.mobileNav = !this.mobileNav;
            },

            signOut(){
                firebase.auth().signOut();
                window.location.reload();
            }

        },

     }
</script>

<style lang="scss" scoped>
    header {
        background-color: #FFFF;;
        padding : 0 25px;
        z-index: 99;
    }

    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: .3s color ease;

        &:hover {
            color : #1eb8b8;
        }
    }

    nav {
        display: flex;
        padding: 25px 0;

        .branding {
            display: flex;
            align-items: center;

            .header {
                font-weight: 600;
                font-size : 24px;
                text-decoration: none;
                color : #000;
            }
        }

        .nav-links {
            position: relative;
            display: flex;
            flex:1;
            align-items: center;
            justify-content: end;

            ul {
                margin-right: 32px;

                .link{
                    margin-right: 32px;
                }

                .link:last-child {
                    margin-right: 0;
                }
            }

            .profile {
                width:40px;
                height: 40px;
                position: relative;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                background-color: #303030;
                cursor: pointer;


                .profile-menu {
                    position: absolute;
                    z-index:2000;
                    top:60px;
                    right:0px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    width:250px;
                    background-color: #303030;
                    display: flex;
                    flex-direction: column;
                    
                    .name {
                        font-size: 16px;
                    }
                    
                    .info {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 15px;

                        .initials {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 40px;
                            height: 40px;
                            background-color: #fff;
                            color: #303030;
                            position: initial;
                            border-radius: 50%;
                        }
                    }

                    .top {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        border-bottom: 1px solid #fff;

                    }

                    .options {
                        padding-top:8px;
                        padding-bottom:8px;
                        display: flex;
                        flex-direction: column;
                        align-items: start;
                        gap:15px;

                        .option {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-decoration: none;
                            cursor: pointer;
                            color:#fff;
                            font-size: 15px;

                            .icon {
                                width:15px;
                                height: auto;
                                align-items: left;
                                margin-right: 15px;
                                margin-left: 15px;

                            }

                        }
                    }

                }
            }
        }
    }

    .menu-icon {
        cursor: pointer;
        position : absolute;
        top : 32px;
        right : 25px;
        height : 25px;
        width : auto;
    }

    .mobile-nav {
        display: flex;
        flex-direction: column;
        padding: 20px;
        position:fixed;
        width: 70%;
        max-width: 250px;
        background-color: #303030;
        height: 100%;
        top : 0;
        left : 0;
        z-index: 101;

        .link {
            padding : 15px 0;
            color : #fff
        }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
        transition: all 1s ease;
    }

    .mobile-nav-enter {
        transform: translateX(-250px);
    }
    .mobile-nav-enter-to {
        transform: translateX(0px);
    }

    .mobile-nav-leave-to {
        transform: translateX(-250px);
    }
</style>