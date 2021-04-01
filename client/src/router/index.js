import Vue from "vue";
import VueRouter from "vue-router";
import List from "@/views/List.vue";
import Create from "@/views/Create.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "List",
    component: List
  },
  {
    path: "/create",
    name: "Create",
    component: Create
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
