import { createRouter, createWebHistory } from "vue-router";
import PortafolioView from "@/components/views/PortafolioView.vue";
import About from "@/components/portafolio/About.vue";
import Works from "@/components/portafolio/Works.vue";
import Contact from "@/components/portafolio/Contact.vue";

const routes = [
  { path: "/", component: PortafolioView },
  { path: "/about", component: About },
  { path: "/works", component: Works },
  { path: "/contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
