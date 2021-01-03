import Vue from "vue";
import VueRouter from "vue-router";
import Trucos from "@/views/Trucos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Trucos",
    component: Trucos
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next({ name: "Trucos" });
  }

  next();
});

export default router;
