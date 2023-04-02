import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import NotFound from "@/views/NotFound.vue";
import ContactEdit from "@/views/ContactEdit.vue";
import ContactAdd from "@/views/ContactAdd.vue";

import Signin from "@/views/Signin.vue";
import Signup from "@/views/Signup.vue";

const routes = [
  {
    path: "/signin",
    name: "signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: ContactEdit,
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/contacts/",
    name: "contact.add",
    component: ContactAdd,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//Global guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (to.name !== "signin" && to.name !== "signup" && !isAuthenticated) {
    next({ name: "signin" });
  } else {
    next();
  }
});

export default router;
