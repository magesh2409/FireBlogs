<template>
    <div class="blog-cards-wrap">
        <div class="blog-cards conatiner">
            <div class="toggle-edit">
                <button @click="editPost = !editPost">Toggle Edit</button>
            </div>
        </div>
        <div class="blog-photos">
          <blogCards :post="post" v-for="(post,index) in blogPosts" :key="index"></blogCards>
        </div>
    </div>
</template>

<script>
import blogCards from '../components/blogCards.vue';
export default {
    name : 'blogs',
    components:{blogCards},
    props:['post'],
    computed:{
    blogPosts(){
      return this.$store.state.blogPosts;
    },

    editPost:{
      get(){
        return this.$store.state.editPost;
      },
      set(payload){
        this.$store.commit('toggleEditPost',payload)
      }
    }
  },

  beforeDestroy(){
    this.$store.state.editPost = false;
  }

}
</script>

<style lang="scss" scoped>

.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    top: -30px;
    right: 50px;
    align-items: center;
    position: absolute;
    z-index: 120;
  }

  span {
    margin-right: 16px;
  }

  // input[type="checkbox"] {
  //   position: relative;
  //   border: none;
  //   background:transparent;
  //   outline: none;
  //   width: 80px;
  //   height: 30px;
  //   border-radius: 20px;
  //   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  // }

  // input[type="checkbox"]::before {
  //   content: "";
  //   position: absolute;
  //   width: 30px;
  //   height: 30px;
  //   border-radius: 20px;

  //   top: 0;
  //   left: 0;
  //   background: #303030;
  //   transform: scale(1.1);
  //   transition: 750ms ease all;
  //   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  // }

  // input[type="checkbox"]:checked::before {
  //   background: #fff;
  //   left: 52px;

  // }

  // input[type="checkbox"]:checked::after {
  //   background: #fff;
  //   left: 52px;

  // }
}

.blog-photos {
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
  padding: 50px 100px;
  
  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}


// .toggle-edit {
//     position:absolute;
//     display: flex;
//     align-items: center;
//     top:100px;
//     right:100px;
//     z-index: 120;

// }



</style>