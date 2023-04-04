<template>
    <div class="page">
        <h4>Thêm Sản phẩm</h4>
        <ProductForm :product="{}" :categories="categories" @submit:product="addProduct" />
        <p>{{ message }}</p>
    </div>
</template>
  
<script>
import ProductForm from "@/components/admin/ProductForm.vue";

import ProductService from "@/services/product.service";
import CategoryService from "@/services/category.service";

export default {
    components: {
        ProductForm,

    },
    data() {
        return {
            message: "",
            product: {},
            categories: [], // Danh sách các danh mục sản phẩm
        };
    },
    async created() {
        this.categories = await CategoryService.getAll();
    },
    methods: {
        onFileChange(event) {
            const formData = new FormData();
            formData.append("image", event.target.files[0]);
            this.product.image = formData;
        },
        async addProduct(data) {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("quantity", data.quantity);
            formData.append("category", data.category);
            // formData.append("image", data.image);
            formData.append("image", data.image, data.image.name); // thêm tên file ảnh vào trong formData
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
            try {
                await ProductService.create(formData);
                this.message = "Sản phẩm được thêm thành công.";


            } catch (error) {
                console.log(error.response.data); // Thông tin lỗi từ server
                console.log(error.response.status); // Mã trạng thái HTTP
                console.log(error.response.headers); // Header trả về từ server
                console.log(error.config); // Cấu hình request khi gửi lên server
            }
        },
    },

};

</script>
  