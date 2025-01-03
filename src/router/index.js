import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import forgotPassword from "../views/forgotPassword.vue";
import Profile from "../views/Profile.vue";
import Admin from "../views/Admin.vue";
import createPost from "../views/createPost.vue";
import postPreview from "../views/postPreview.vue";
import postView from "../views/postView.vue";
import editPost from "../views/editPost.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta : {
      title:"Home",
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta : {
      title:"Blogs"
    }
  },
  {
    path: "/login",
    name: "Login",
    component:Login,
    meta : {
      title:"Login"
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta : {
      title:"Register"
    }
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: forgotPassword,
    meta : {
      title:"forgotPassword"
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta : {
      title:"Profile"
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta : {
      title:"Admin"
    }
  },
  {
    path: "/create-post",
    name: "createPost",
    component: createPost,
    meta : {
      title:"createPost"
    }
  },
  {
    path: "/post-preview",
    name: "postPreview",
    component: postPreview,
    meta : {
      title:"postPreview"
    }
  },
  {
    path: "/post-view/:blogid",
    name: "postView",
    component: postView,
    meta : {
      title:"postView"
    }
  },
  {
    path: "/edit-post/:blogid",
    name: "editPost",
    component: editPost,
    meta : {
      title:"editPost"
    }
  },

  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to , from , next) => {
  document.title = `${to.meta.title} | FireBlogs`;
  // if (to.path !== from.path){
  //   window.location.reload();
  // }
  next();
})




export default router;
