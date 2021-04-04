import { createRouter, createWebHistory } from "vue-router";
import List from "@/views/List.vue";
import Create from "@/views/Create.vue";

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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
