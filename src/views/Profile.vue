<template>
    <div class="profile">
        <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
        <div class="container">
            <h2>Account Settings</h2>
            <div class="profile-info">
                <div class="initials">{{ $store.state.profileInitials }}</div>
                <div class="admin-badge">
                    <adminIcon class="icon" />
                    <span>admin</span>
                </div>
                <div class="inputs">
                    <div class="input">
                        <label for="firstName">First Name: </label>
                        <input type="text" id="firstName" v-model="firstName" />
                    </div>
                    <div class="input">
                        <label for="lastName">Last Name:</label>
                        <input type="text" id="lastName" v-model="lastName" />
                    </div>
                    <div class="input">
                        <label for="username">Username:</label>
                        <input type="text" id="username" v-model="userName" />
                    </div>
                    <div class="input">
                        <label for="email">Email:</label>
                        <input disabled type="text" class="email" v-model="email" />
                    </div>

                </div>
                <button @click.prevent="updateProfile">Save Changes</button>
            </div>
        </div>
    </div>
</template>

<script>
import Modal from '../components/Modal.vue';
import adminIcon from '../assets/Icons/user-crown-light.svg'
export default {
    name:'Profile',
    data(){
        return {
            modalMessage : "Changes were Saved!",
            modalActive : false,

        }
    },
    components:{
        Modal,
        adminIcon
    },


    methods: {
        closeModal(){
            this.modalActive= !this.modalActive;
        },

        updateProfile(){
            this.modalActive = !this.modalActive;
            this.$store.dispatch('updateSettings')
        }
    },

    computed: {
        firstName: {
            get(){
                return this.$store.state.profileFirstName;
            },
            set(payload){
                return this.$store.commit("changeFirstName",payload)
            }
        },
        lastName: {
            get(){
                return this.$store.state.profileLastName;
            },
            set(payload){
                return this.$store.commit("changeLastName",payload)
            }
        },
        userName: {
            get(){
                return this.$store.state.profileUserName;
            },
            set(payload){
                return this.$store.commit("changeUserName",payload)
            }
        },
        email(){
            return this.$store.state.profileEmail;
        }
    }
}
</script>

<style lang="scss" scoped>

.profile {
    width: 100%;
    height: 100%;
    padding: 60px 25px;
    padding: 32px auto;

    h2 {
        font-size: 32px;
        font-weight: 300;
        margin-bottom: 16px;
        text-align: center;
    }

    .profile-info {
        display: flex;
        flex-direction: column;
        margin: 32px auto;
        border-radius: 8px;
        background-color: #f1f1f1;
        max-width: 800px;
        padding: 32px;
        box-shadow: 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        .initials {
            position: initial;
            width: 80px;
            height: 80px;
            font-size: 32px;
            background-color: #303030;
            color: #fff;
            display: flex;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            align-self: center;
        }

        .admin-badge {
            display: flex;
            align-self: center;
            color: #fff;
            font-size: 14px;
            padding: 8px 24px;
            border-radius: 8px;
            text-align: center;
            text-transform: uppercase;
            background-color: #303030;
            margin:16px 0;

            .icon {
                width:14px;
                height:auto;
                margin-right: 8px;
            }
        }

        .inputs {
            display: flex;
            flex-direction: column;
            align-items: start;
            width: 100%;
            .input {
                margin:16px 0;
                width: 100%;
    
                label {
                    font-size: 14px;
                    display: block;
                    padding-bottom: 6px;
                }
    
                input {
                    width: 100%;
                    border: none;
                    border-color: #f2f7f6;
                    padding: 8px;
                    height: 45px;
    
                    &:focus {
                        outline: none;
                    }
                }
            }
        }


        button {
            align-self: center;
        }

        .email {
            background-color: #fff;
        }
    }
}
</style>