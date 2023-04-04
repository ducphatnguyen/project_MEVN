<template>
    <Form @submit="submitProduct" :validation-schema="productFormSchema" enctype="multipart/form-data">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="productLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Mô tả</label>
            <Field name="description" type="text" class="form-control" v-model="productLocal.description" />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Giá</label>
            <Field name="price" type="number" class="form-control" v-model="productLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="quantity">Số lượng</label>
            <Field name="quantity" type="number" class="form-control" v-model="productLocal.quantity" />
            <ErrorMessage name="quantity" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Hình ảnh</label>
            <input type="file" name="image" class="form-control" @change="onFileChange" />
            <ErrorMessage name="image" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="category">Danh mục</label>
            <select name="category" class="form-control" v-model="productLocal.category">
                <option :value="null">--Chọn danh mục--</option>
                <option v-for="category in categories" :value="category._id">{{ category.name }}</option>
            </select>
            <ErrorMessage name="category" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="productLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteProduct">
                Xóa
            </button>
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
    emits: ["submit:product", "delete:product"],

    props: {
        product: { type: Object, required: true },
        categories: { type: Array, required: true },
    },

    data() {
        const productFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên sản phẩm phải có giá trị.")
                .min(2, "Tên sản phẩm phải ít nhất 2 ký tự.")
                .max(50, "Tên sản phẩm có nhiều nhất 50 ký tự."),
            description: yup
                .string()
                .required("Mô tả sản phẩm phải có giá trị.")
                .min(2, "Mô tả sản phẩm phải ít nhất 2 ký tự.")
                .max(500, "Mô tả sản phẩm có nhiều nhất 500 ký tự."),
            price: yup
                .number()
                .required("Giá sản phẩm phải có giá trị.")
                .min(0, "Giá sản phẩm phải lớn hơn hoặc bé hơn 0."),
            quantity: yup
                .number()
                .required("Số lượng sản phẩm phải có giá trị.")
                .min(0, "Số lượng sản phẩm phải lớn hơn hoặc bằng 0."),
            image: yup.string().url("Hình ảnh sản phẩm phải là một đường dẫn URL hợp lệ."),

        });
        return {

            productLocal: { ...this.product },
            productFormSchema,
        };
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            this.productLocal.image = file;
            

        },
        submitProduct() {
            this.productLocal.category_id = this.productLocal.category; // gán category_id
            this.$emit("submit:product", { ...this.productLocal });
        },
        deleteProduct() {
            this.$emit("delete:product", this.productLocal._id);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>