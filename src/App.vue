<template>
  <div class="app-wrapper">
    <div class="app" v-if="this.$store.state.postLoaded">
      <Navigation v-if="!navigationDisabled"></Navigation>
      <router-view />
      <Footer v-if="!navigationDisabled"></Footer>
    </div>
  </div>
</template>

<script>

import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
import firebase from 'firebase/app';
import "firebase/auth"
export default {
  name: "app",
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      navigationDisabled : false,
    };
  },
  created() {
    console.log("HELLO")
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('updateUser',user);
      if (user){
        this.$store.dispatch('getCurrentUser')
        console.log(this.$store.state.profileEmail)
      }
    })
    this.checkRoute();
    this.$store.dispatch('getPosts');
  },
  methods: {
    checkRoute(){
      let path = this.$route.name;
      if (path === "Login" || path === "Register" || path === "forgotPassword"){
        this.navigationDisabled = true;
        return;
      }
      this.navigationDisabled = false;
      return;
    },

  },
  watch: {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left : 8px;
  width: 12px;
}

.arrow-light {
  path {
    fill : #fff;
  }
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color:#f1f1f1;
  @media (min-width:500){
    padding: 100px 16px;
  }

  .blog-cards{
    display: grid;
    gap:32px;
    grid-template-columns: 1fr;
    @media (min-width:500px){
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width:900px){
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width:1200px){
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
  outline: none;
  }
  &:hover {
  background-color: rgba(48, 48, 48, 0.7);
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }
  i {
    margin-left: 8px;
  }
  }
  .button-light {
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
  }
  .button-inactive {
    pointer-events: none !important;
    cursor: none !important;
    background-color: rgba(128, 128, 128, 0.5) !important;
}

.error {
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>
