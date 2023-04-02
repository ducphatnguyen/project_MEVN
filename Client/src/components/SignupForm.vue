<template>
    <!-- Form sử dụng thư viện VeeValidate để hiển thị validation error message và emit event khi submit -->
    <Form @submit="submitSignUp" :validation-schema="signUpFormSchema">
        <!-- Tạo ra input field cho tên -->
        <div class="form-group">
            <label for="name">Họ và tên</label>
            <Field name="name" type="text" class="form-control" v-model="signUpLocal.name" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="signUpLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="signUpLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="passwordConfirmation">Xác nhận mật khẩu</label>
            <Field name="passwordConfirmation" type="password" class="form-control"
                v-model="signUpLocal.passwordConfirmation" />
            <ErrorMessage name="passwordConfirmation" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Đăng ký</button>
        </div>
    </Form>
</template>
  
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:signup"],
    data() {
        // Định nghĩa validation schema sử dụng thư viện yup
        const signUpFormSchema = yup.object().shape({
            name: yup.string().required("Họ và tên không được để trống."),
            email: yup
                .string()
                .email("E-mail không đúng định dạng.")
                .required("E-mail không được để trống."),
            password: yup.string().required("Mật khẩu không được để trống."),
            passwordConfirmation: yup
                .string()
                .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp.")
                .required("Mật khẩu xác nhận không được để trống."),
        });
        return {
            // Khởi tạo data cho các field trong form
            signUpLocal: {
                name: "",
                email: "",
                password: "",
                passwordConfirmation: "",
            },
            signUpFormSchema,
        };
    },
    methods: {
        submitSignUp() {
            this.$emit("submit:signup", this.signUpLocal);
        },
    },
};
</script>
  
<style scoped>
@import "@/assets/form.css";
</style>
  