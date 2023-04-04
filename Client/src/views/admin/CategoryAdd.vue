<template>
    <div class="page">
        <h4>Thêm Danh mục</h4>
        <CategoryForm :category="{}" @submit:category="addCategory" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import CategoryForm from "@/components/admin/CategoryForm.vue";
import CategoryService from "@/services/category.service";

export default {
    components: {
        CategoryForm,
    },
    data() {
        return {
            message: "",
        };
    },
    methods: {
        async addCategory(data) {
            try {
                await CategoryService.create(data);
                this.message = "Danh mục được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>