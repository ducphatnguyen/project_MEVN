import { createWebHistory, createRouter } from "vue-router";
//Giải mã lấy role xác thực phân quyền người dùng
import jwtDecode from "jwt-decode";
// import NotFound from "@/views/admin/NotFound.vue";
import NotFoundPage from "@/views/admin/NotFoundPage.vue";
import ContactBook from "@/views/admin/ContactBook.vue";
import ContactEdit from "@/views/admin/ContactEdit.vue";
import ContactAdd from "@/views/admin/ContactAdd.vue";

import Signin from "@/views/admin/Signin.vue";
import Signup from "@/views/admin/Signup.vue";

import CategoryAdd from "@/views/admin/CategoryAdd.vue";
import CategoryEdit from "@/views/admin/CategoryEdit.vue";
import CategoryList from "@/views/admin/CategoryList.vue";

import ProductAdd from "@/views/admin/ProductAdd.vue";
import ProductEdit from "@/views/admin/ProductEdit.vue";
import ProductList from "@/views/admin/ProductList.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFoundPage,
  },

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

  {
    path: "/categories",
    name: "category",
    component: CategoryList,
  },
  {
    path: "/categories/:id",
    name: "category.edit",
    component: CategoryEdit,
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/categories/",
    name: "category.add",
    component: CategoryAdd,
  },

  {
    path: "/products",
    name: "product",
    component: ProductList,
  },
  {
    path: "/products/:id",
    name: "product.edit",
    component: ProductEdit,
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/products/",
    name: "product.add",
    component: ProductAdd,
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//Global
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");

  //Nếu cố gắng ra khỏi trang signin,signup, notfound thì quay về signin
  if (to.name !== "signin" && to.name !== "signup" && to.name !== "notfound" && !isAuthenticated) {
    next({ name: "signin" });
  } else if (isAuthenticated) {
    const decodedToken = jwtDecode(isAuthenticated);
    const userRole = decodedToken.role;

    if (to.name !== "signin" && to.name !== "signup" && to.name !== "notfound" && userRole !== 0) {
      next({ name: "signin" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
