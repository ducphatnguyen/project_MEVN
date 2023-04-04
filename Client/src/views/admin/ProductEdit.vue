<template>
    <div v-if="category" class="page">
        <h4>Hiệu chỉnh Danh mục</h4>
        <CategoryForm :category="category" @submit:category="updateCategory" @delete:category="deleteCategory" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            category: null,
            message: "",
        };
    },
    methods: {
        async getCategory(id) {
            try {
                this.category = await CategoryService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateCategory(data) {
            try {
                await CategoryService.update(this.category._id, data);
                this.message = "Danh mục được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCategory() {
            if (confirm("Bạn muốn xóa Danh mục này?")) {
                try {
                    await CategoryService.delete(this.category._id);
                    this.$router.push({ name: "categorybook" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getCategory(this.id);
        this.message = "";
    },
};
</script>
