<template>
    <div class="blog-wrapper" :class="{'no-user' : !user}">
      <div class="blog-content">
        <div>
          <h1 v-if="post.welcomeScreen">{{ post.title }}</h1>
          <h1 v-else>{{ post.blogTitle }}</h1>
  
          <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
          <p v-else class="preview-content" v-html="post.blogHTML"></p>
  
          <router-link to="#" class="link link-light" v-if="post.welcomeScreen">
            Login/Register
            <Arrow class="arrow"></Arrow>
          </router-link>
          <router-link v-else :to="{name:'postView' , params : { blogid :  this.post.blogID}}" class="link" >
            View the Post
            <Arrow class="arrow"></Arrow>
          </router-link>
        </div>
        </div>

        <div class="blog-photo">
            <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt="" />
            <img v-else :src="post.blogCoverPhoto" alt="" />
        </div>
    </div>
  </template>
  
  <script>
  import Arrow from '../assets/Icons/arrow-right-light.svg'
  
  export default {
    name: "blogPost",
    props: ["post"],
    components: { Arrow },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
  };
  </script>


<style lang="scss" scoped>
    .blog-wrapper {
        display: flex;
        flex-direction: column;
        box-shadow: 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        @media (min-width : 700px) {
            flex-direction: row;
        }
    }

    .blog-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex:4;
        order:2;
        @media (min-width:700px){
            order : 1
        }
        @media (min-width:800px){
            flex:3;
        }

        div {
            max-width: 375px;
            padding : 72px 24px;
            @media (min-width:700px) {
                padding: 0 24px;
            }
        }

        h1 {
            font-size: 32px;
            font-weight: 300px;
            text-transform: uppercase;
            margin-bottom: 24px;
            @media (min-width:700px){
                font-size: 40px;
            }
        }

        p {
            font-size: 15px;
            font-weight: 300px;
            line-height: 1.7;
        }

        .preview-content {
            font-size: 17px;
            max-height: 54px;
            width:100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
        }

        .link {
            display: inline-flex;
            align-items: center;
            margin-top: 32px;
            padding-bottom: 4px;
            border-bottom: 1px solid transparent;
            transition: .5s ease-in all;

            &:hover {
                border-bottom-color: #303030 ;
            }
        }

        .link-light {
            &:hover {
                border-bottom-color: #303030;
            }
        }
    }

    .blog-photo {
        order: 1;
        flex: 3;
        box-shadow: 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        @media (min-width: 700px) {
        order: 3;
        }

        @media (min-width: 800px) {
        flex: 4;
        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            }
        }
    }

    .blog-wrapper:nth-child(even){
        .blog-content{
            order:2;
        }
        .blog-photo{
            order: 1;
        }
    }
    .arrow {
        margin-left: 8px;
        width: 12px;

    }

    .no-user:first-child {
        .blog-content {
            background-color: #303030;
            color: #fff;
        }
    }


</style>
  