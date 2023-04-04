<template>
  <div class="page">
    <h4>Đăng nhập</h4>
    <SignInForm @submit:signin="submitSignIn" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import SignInForm from "@/components/admin/SigninForm.vue";
import { mapState, mapMutations } from "vuex";

//Giải mã lấy role xác thực phân quyền người dùng
import jwtDecode from "jwt-decode";

export default {
  components: {
    SignInForm,
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState(['isAuthenticated'])
  },
  methods: {
    ...mapMutations(['setIsAuthenticated']),
    async submitSignIn(data) {
      try {
        const response = await userService.signIn(data);
        const token = response.token;
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
        if (userRole == 0) {
          localStorage.setItem("token", token);
          this.setIsAuthenticated(true);
          this.$router.push({ name: 'contactbook' });
        } else {
          this.message = "Bạn không có quyền vào trang này.";
        }
      } catch (error) {
        console.log(error);
        this.message = "Sai email hoặc mật khẩu. Vui lòng thử lại.";
      }

    },
  },
};
</script>