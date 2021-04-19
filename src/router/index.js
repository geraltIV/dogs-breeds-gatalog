import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Breed from "../views/Breed.vue";
import Favourites from "../views/Favourites.vue";
import PageNotFound from "../views/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/favourites",
    name: "Favourites",
    component: Favourites,
  },
  {
    path: "/:breed",
    name: "Breed",
    component: Breed,
  },
  {
    path: "/error",
    name: "PageNotFound",
    component: PageNotFound,
  },
  {
    path: "*",
    redirect: "/error",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
