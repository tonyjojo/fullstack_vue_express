import Vue from "vue";
import VueRouter from "vue-router";
import Trucos from "@/views/Trucos.vue";
import Posts from "@/views/Posts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Trucos",
    component: Trucos
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
