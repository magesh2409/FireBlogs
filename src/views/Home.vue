<template>
  <div class="home">
    <blogPost v-if="!user" :post="welcomeScreen"></blogPost>
    <blogPost :post="post" v-for="(post,index) in blogPostsFeeds" :key="index"></blogPost>

    <div class="blog-card-wrap">
      <div class="container">
        <h3> View More Recent Blog</h3>
        <div class="blog-photos">
          <blogCards :post="post" class="blog-cards" v-for="(post,index) in blogPostsCards" :key="index"></blogCards>
        </div>
      </div>
    </div>

    <div class="updates" v-if="!user">
      <div class="container">
        <h3>
          Never miss a Post. Register your account now.
        </h3>
        <router-link class="router-button" :to="{ name : 'Login'}">
          Register your account now
          <Arrow class="arrow"></Arrow>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import blogPost from '../components/blogPost.vue';
import blogCards from '../components/blogCards.vue';
import Arrow from '../assets/Icons/arrow-right-light.svg'

export default {
  data(){
    return {
      welcomeScreen: {
        title: "Welcome!!!",
        blogPost:"Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post.",
        welcomeScreen: true,
        photo: "coding",
      },
      }
      },
  name: "Home",
  components: {blogPost,blogCards,Arrow},
  computed:{
    blogPostsFeeds(){
      return this.$store.getters.blogPostsFeeds;
    },
    blogPostsCards(){
      return this.$store.getters.blogPostsCards;
    },
    user() {
      return this.$store.state.user;

    },
  }

    };
</script>

<style lang="scss" scoped>

h3 {
  font-weight: 300;
  font-size: 28px;
  margin-bottom: 32px;
}

.blog-photos{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px; 
  @media (min-width:700px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.updates {
  .container {
    padding:100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width:800px){
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button {
      cursor: pointer;
      display: flex;
      font-size: 14px;
      text-decoration: none;
      background-color: #303030;
      color:#fff;
      width: 300px;

      @media (min-width:800px){
        margin-left: auto;
      }
      &:active {
        opacity: 0.4;
      }

    }

    h3{
      font-size: 32px;
      font-weight: 300;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media (min-width:800px){
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}


</style>
