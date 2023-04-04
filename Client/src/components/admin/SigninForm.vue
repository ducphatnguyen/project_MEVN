<template>
    <Form @submit="submitSignIn" :validation-schema="signInFormSchema">
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="signInLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="signInLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input name="rememberMe" type="checkbox" class="form-check-input" v-model="signInLocal.rememberMe" />
            <label for="rememberMe" class="form-check-label">
                <strong>Ghi nhớ đăng nhập</strong>
            </label>
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Đăng nhập</button>
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
    emits: ["submit:signin"],
    data() {
        const signInFormSchema = yup.object().shape({
            email: yup
                .string()
                .email("E-mail không đúng định dạng.")
                .required("E-mail không được để trống."),
            password: yup.string().required("Mật khẩu không được để trống."),
        });
        return {
            signInLocal: {
                email: "",
                password: "",
                rememberMe: false,
            },
            signInFormSchema,
        };
    },
    methods: {
        submitSignIn() {
            this.$emit("submit:signin", this.signInLocal);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>