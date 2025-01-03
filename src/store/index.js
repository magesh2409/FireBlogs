import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app';
import "firebase/auth"
import db from '../firebase/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editPost:false,

    profileId : null,
    profileFirstName : null,
    profileLastName : null,
    profileEmail : null,
    profileUserName : null,
    profileInitials : null,
    user:null,

    blogHTML : "Write your blog title here......",
    blogTitle: null,
    blogPhotoName:null,
    blogPhotoPreview:false,
    blogPhotoFileURL:null,

    blogPosts : [],
    postLoaded : null,

  },

  getters : {
    blogPostsFeeds(state){
      return state.blogPosts.slice(0,2);
    },

    blogPostsCards(state){
      return state.blogPosts.slice(2,6);
    },
  },
  mutations: {
    setBlogState(state,payload){
      state.blogHTML = payload.blogHTML;      
      state.blogTitle = payload.blogTitle;      
      state.blogPhotoFileURL = payload.blogCoverPhoto;      
      state.blogPhotoName = payload.blogCoverPhotoName;      

    },
    openPhotoPreview(state){
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    updateFileURL(state,payload){
      state.blogPhotoFileURL = payload;
    },
    updateFileName(state,payload){
      state.blogPhotoName = payload;
    },
    updateBlogTitle(state,payload){
      state.blogTitle=payload;
    },
    updateBlogHTML(state,payload){
      state.blogHTML = payload;
    },
    toggleEditPost(state,payload){
      state.editPost = payload;
    },
    filterBlogPosts(state,payload){
      state.blogPosts = state.blogPosts.filter(post => {
        post.blogID !== payload
      })
    },

    updateUser(state,payload){
      state.user = payload
    },

    setProfileInfo(state,doc){
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName,
      state.profileLastName = doc.data().lastName,
      state.profileUserName = doc.data().userName
    },

    setProfileInitials(state){
      state.profileInitials = state.profileFirstName[0] + state.profileLastName[0];
    },

    changeFirstName(state,payload){
      state.profileFirstName = payload;
    },

    changeLastName(state,payload){
      state.profileLastName = payload;
    },

    changeUserName(state,payload){
      state.profileUserName = payload;
    }
  },
  actions: {
    async getCurrentUser({commit}){
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
      const dbResults = await dataBase.get()
      commit("setProfileInfo",dbResults)
      commit('setProfileInitials')
    },

    async updateBlog({commit,dispatch},payload){
      commit('filterBlogPosts',payload);
      await dispatch('getPosts');


    },


    async updateSettings({commit,state}){
      const dataBase = await db.collection('users').doc(state.profileId)
      await dataBase.update({ 
        firstName : state.profileFirstName, 
        lastName : state.profileLastName, 
        userName : state.profileUserName, 
      });
      const dbResults = await dataBase.get()
      commit("setProfileInfo",dbResults)
      commit('setProfileInitials')

    },

    async getPosts( { state }){
      const dataBase =await db.collection('blogPosts').orderBy("Date","desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        const data = {
          blogID : doc.data().blogID,
          blogHTML : doc.data().blogHTML,
          blogCoverPhoto : doc.data().blogCoverPhoto,
          blogCoverPhotoName : doc.data().blogCoverPhotoName,
          blogTitle : doc.data().blogTitle,
          blogDate : doc.data().Date,
        }
        state.blogPosts.push(data)
      }),
      state.postLoaded = true;
      console.log("HI")
    },

    async deletePost({commit},payload){
      const getPost =  await db.collection('blogPosts').doc(payload);
      await getPost.delete();
      commit('filterBlogPosts',payload)
    },
  },
  modules: {
  }
})
