<template>
    <div class="blog-card">
        <div v-show="editPost" class="icons">
            <div @click="editBlogs" class="icon">
                <Edit class="edit"></Edit>
            </div>
            <div @click="deletePost" class="icon">
                <Delete class="delete"></Delete>
            </div>
        </div>
        <img  :src="post.blogCoverPhoto" alt="" />
        <div class="info">
            <h3>{{ post.blogTitle }}</h3>
            <h6>Posted date: {{ new Date(post.blogDate).toLocaleString('en-us', { dateStyle: 'long' })  }}</h6>
            <router-link class="link" :to="{name:'postView' , params : { blogid :  this.post.blogID }}">
                View the Post
                <Arrow class="arrow"></Arrow>
            </router-link>
        </div>
    </div>
</template>

<script>
import Arrow from '../assets/Icons/arrow-right-light.svg'
import Edit from '../assets/Icons/edit-regular.svg'
import Delete from '../assets/Icons/trash-regular.svg'
    export default {
        name : "blogCard",

        props : ['post'],
        components:{Arrow,Edit,Delete},

        computed:{
            editPost(){
                return this.$store.state.editPost;
            }
        },

        methods:{
            deletePost(){
                 return this.$store.dispatch('deletePost',this.post.blogID)
            },

            editBlogs(){
                this.$router.push({name:'editPost',  params: { blogid : this.post.blogID} });
            }
        }
        
    }
</script>

<style lang="scss" scoped>


.blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    transition:.5s ease all;
    min-height: 420px;

    &:hover{
        transform: rotateZ(-1deg) scale(1.01);
        box-shadow: 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
}

.icons{
    display: flex;
    position: absolute;
    top:10px;
    right:10px;
    z-index: 99;
    .icon{
        display: flex;
        height: 35px;
        width: 35px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: .5s ease all;
        background-color: #fff;
        &:hover {
            background-color: #303030;
            .edit,
            .delete {
                path {
                    fill : #fff;
                }
            }
        }
    &:nth-child(1){
        margin-right: 8px;
    }
    .edit,
    .delete {
        height: 15px;
        width:auto;
        pointer-events: none;
        }
    }
}

img {
    display: block;
    border-radius: 8px 8px 0 0;
    min-height:200px;
    width:100%;
    object-fit: cover;
    z-index: 2;
    height: 200px;
}

.info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;

    h4{
        font-size: 20px;
        font-weight: 300px;
        padding-bottom: 8px;
    }
    h4{
        font-size: 12px;
        font-weight: 400px;
        padding-bottom: 16px;
    }

    .link{
        display: inline-flex;
        font-size: 12px;
        font-weight: 500px;
        align-items: center;
        margin-top: auto;
        padding-top: 20px;
        padding-bottom: 4px;
        transition: .5s ease all;

        &:hover {
            color : rgba(48,48,48,0.8)
        }

        .arrow {
            width:10px;
        }
    }
}

</style>