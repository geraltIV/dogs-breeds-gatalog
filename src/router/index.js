import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/:breed",
    name: "Breed",
    component: () => import("../views/Breed.vue"),
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: () => import("../views/Favourites.vue"),
  },
  {
    path: "*",
    component: () => import("../views/PageNotFound.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
