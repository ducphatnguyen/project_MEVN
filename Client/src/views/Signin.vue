<template>
  <div class="page">
    <h4>Đăng nhập</h4>
    <SignInForm @submit:signin="submitSignIn" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import SignInForm from "@/components/SigninForm.vue";
import { mapState, mapMutations } from "vuex";

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
        localStorage.setItem("token", token); // Call the Vuex mutation to set the token
        this.setIsAuthenticated(true);
        this.$router.push({ name: 'contactbook' });
      } catch (error) {
        console.log(error);
        this.message = "Sai email hoặc mật khẩu. Vui lòng thử lại.";
      }
    },
  },
};
</script>