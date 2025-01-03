<template>
    <div class="create-post">
        <blogPhotoPreview  v-show="this.$store.state.blogPhotoPreview"></blogPhotoPreview>
        <Loading v-show="isLoading"></Loading>
        <div class="container">
            <div class="err-message" :class="{'invisble' : !error}" v-show="error">
                <p>
                    <span> Error:</span>
                    {{ this.errorMsg }}
                </p>
            </div>
            <div class="blog-info">
                <div class="blog-header">
                    <input class="blog-title" type="text" placeholder="Enter Blog Title" v-model="blogTitle">
                    <div class="upload-file">
                        <label for="blog-photo">Upload Cover Photo</label>
                        <input type="file" accept=".png , .jpg , .jpeg" id="blog-photo" ref="blogPhoto" @change="fileChange">
                        <button class="preview" :class="{'button-inactive' : !this.$store.state.blogPhotoFileURL}" @click="openPreview">Preview</button>
                        <span> File Chosen: {{ this.$store.state.blogPhotoName }} </span>
                    </div>
                </div>
                <div class="editor">
                    <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imagehandler"></vue-editor>
                </div>
                <div class="blog-actions">
                    <button @click="uploadBlog"> Publish Blog</button>
                    <router-link class="router-button" :to="{name:'postPreview'}">Post Preview</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Quill from 'quill';
window.Quill = Quill;
const imageResize  = require('quill-image-resize-module').default;
Quill.register("modules/imageResize",imageResize);
import blogPhotoPreview from '../components/blogPhotoPreview.vue';
import Loading from '../components/Loading.vue';
import firebase from 'firebase/app';
import "firebase/storage";
import db from '../firebase/firebaseInit';

export default {
    name:'createPost',
    data() {
        return {
            isLoading:false,
            isPreview:false,
            file: null,
            error: false,
            errorMsg: null,
            editorSettings: {
                modules:{
                    imageResize:{}
                }
            }
        }
    },

    components:{
        blogPhotoPreview,
        Loading
    },

    methods:{
        fileChange(){
            this.file = this.$refs.blogPhoto.files[0];
            const fileName = this.file.name;
            this.$store.commit("updateFileName",fileName);
            this.$store.commit("updateFileURL",URL.createObjectURL(this.file));
        },

        openPreview(){
            this.$store.commit("openPhotoPreview");
        },

        imagehandler(file,Editor,cursorLocation,resetUploader){
            const storageRef = firebase.storage().ref();
            const docRef = storageRef.child(`documents/blogsPostPreviews/${file.name}`);
            docRef.put(file).on('state_changed' , 
            (snapshot) => {
                console.log(snapshot);
            }, 
            (err) => {
                console.log(err);
            },
            async () => {
                const downloadURL =  await docRef.getDownloadURL();
                Editor.insertEmbed(cursorLocation,"image",downloadURL);  
                resetUploader();
            }
        )
        },

    uploadBlog() {
    if (this.blogHTML.length !== 0 && this.blogTitle !== 0) {
        if (this.file) {
            this.isLoading = true;
            const storageRef = firebase.storage().ref();
            const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`);

            // Upload file
            docRef.put(this.file).on(
                'state_changed',
                (snapshot) => {
                    console.log(snapshot); // Track upload progress
                },
                (err) => {
                    this.isLoading=false;
                    console.log(err); // Handle upload errors
                    this.error = true;
                    this.errorMsg = "Error uploading the file. Please try again!";
                    setTimeout(() => {
                        this.error = false;
                    }, 5000);
                },
                async () => {
                    // Get the download URL after the upload is complete
                    try {
                        const downloadURL = await docRef.getDownloadURL();
                        const timeStamp = Date.now();
                        // let date = timeStamp.getDate();
                        // let month = timeStamp.getMonth();
                        // let year = timeStamp.getFullYear();

                        // let formattedDate = `${date}/${month}/${year}`;
                        
                        // Firestore reference for new blog post
                        const dataBase = await db.collection('blogPosts').doc();

                        await dataBase.set({
                            blogID: dataBase.id,
                            blogHTML: this.blogHTML,
                            blogTitle: this.blogTitle,
                            blogCoverPhoto: downloadURL,
                            blogCoverPhotoName: this.blogPhotoName,
                            profileId: this.profileId,
                            Date: timeStamp,
                        });

                        await this.$store.dispatch('getPosts');

                        // Redirect to the post view after success
                        this.isLoading=false;
                        this.blogHTML="Write your blog title here......";
                        this.blogTitle=null;
                        this.blogPhotoName=null;
                        this.$router.push({ name: 'postView' , params:{blogid : dataBase.id}});
                    } catch (error) {
                        this.isLoading=false;
                        console.log(error); // Handle Firestore errors
                        this.error = true;
                        this.errorMsg = error;
                        setTimeout(() => {
                            this.error = false;
                        }, 5000);
                    }
                },
            );
            return;
        }

        // Handle case when no file is uploaded
        this.error = true;
        this.errorMsg = "Please ensure that Blog Cover Photo is uploaded!";
        setTimeout(() => {
            this.error = false;
        }, 5000);
        return;
    }

    // Handle case when blog title or content is missing
    this.error = true;
    this.errorMsg = "Please ensure that Blog Title and Blog Content are filled!";
    setTimeout(() => {
        this.error = false;
    }, 5000);
}

    },

    computed: {
        profileId() {
            return this.$store.state.profileId;
        },
        blogPhotoName() {
            return this.$store.state.blogPhotoName;
        },
        blogHTML: {
            get(){
                return this.$store.state.blogHTML
            },
            set(payload){
                return this.$store.commit("updateBlogHTML",payload)
            }
        },
        blogTitle: {
            get(){
                return this.$store.state.blogTitle
            },
            set(payload){
                return this.$store.commit("updateBlogTitle",payload)
            }
            }
        },

    }

</script>

<style lang="scss">


.create-post{
    position: relative;
    height: 100%;

    button {
        margin-top: 0px;
    }

    .router-button {
        text-decoration: none;
    }

    button,
    .router-button,
    label {
        background-color: #303030;
        text-decoration: none;
        color: #fff;
        align-self:center;
        font-size: 14px;
        transition: 500ms ease-in-outa all;
        cursor: pointer;
        border-radius: 20px;
        padding: 12px 24px;

        &:hover {
            background-color: rgba(48,48,48,0.7);
        }
    }

    .container {
        position: relative;
        height: 100%;
        padding:10px 25px 65px;

        .invisble {
            opacity: 0;
            background-color: transparent;
        }

        .err-message {
            width: 100%;
            padding: 8px;
            color: #fff;
            background-color: #303030;
            margin-bottom: 10px;
            border-radius: 8px;
            opacity: 1;
            transition: 0.5s ease all;

            p {
                font-size: 14px;
            }

            span {
                font-weight: 600;
            }
        }

        .blog-info {
            display: flex;
            flex-direction: column;
            margin-bottom: 32px;

            .blog-header {
                margin-bottom: 32px;
                display: flex;

            }

            .blog-title{
                min-width: 350px;
            }

            input {
                transition: 0.5s ease-in-out all;
                padding: 10px 4px;
                border:none;
                border-bottom: 1px solid;

                &:focus {
                    outline: none;
                    box-shadow: 0 1px 0 0 #303030;
                }
            }

            .upload-file {
                flex:1;
                margin-left: 16px;
                display: flex;
                position: relative;
                gap:16px;

                input {
                    display: none;
                }

                .preview {
                    margin-right: 16px;
                    text-transform: initial;
                }

                span {
                    margin-left: 16px;
                    font-size: 12px;
                    align-self: center;
                }
            }
        }

        .editor {
            height:60vh;
            display: flex;
            flex-direction: column;

            .quillWrapper {
                position: relative;
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            .ql-container {
                display: flex;
                flex-direction: column;
                overflow: scroll;
                height: 100%;
            }

            .ql-editor {
                padding: 20px 16px 30px;
            }
        }

        .blog-actions {
            margin-top: 32px;

            button {
                margin-right: 16px;
            }
        }
    }
}
</style>