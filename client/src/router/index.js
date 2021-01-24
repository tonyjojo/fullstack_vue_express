import Vue from "vue";
import VueRouter from "vue-router";
import List from "@/views/List.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "List",
    component: List
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next({ name: "List" });
  }

  next();
});

export default router;
