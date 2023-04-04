<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <!-- Load trang -->
        <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <!-- Cũng giống thẻ a nhưng không load trang => không load lại trạng thái -->
                <router-link :to="{ name: 'contactbook' }" class="nav-link">
                    Danh bạ
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
        </div>

        <div class="navbar-nav" v-if="!isAuthenticated">
            <li class="nav-item">
                <router-link :to="{ name: 'signin' }" class="nav-link">
                    Đăng nhập
                    <i class="fas fa-sign-in"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'signup' }" class="nav-link">
                    Đăng ký
                    <i class="fas fa-user-tag"></i>
                </router-link>
            </li>
        </div>

        <div class="navbar-nav" v-else-if="isAuthenticated">
            <li class="nav-item">
                <button @click="signOut" class="nav-link btn btn-link">
                    Đăng xuất
                    <i class="fas fa-sign-out"></i>
                </button>
            </li>
        </div>
    </nav>
</template>
  
<script>
import { mapState, mapMutations } from 'vuex';
import userService from "@/services/user.service";


export default {
    computed: {
        ...mapState(['isAuthenticated'])
    },
    methods: {
        ...mapMutations(['setIsAuthenticated']),
        async signOut() {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                };
                await userService.signOut({ headers });
                localStorage.removeItem('token');
                // Sử dụng mutation để cập nhật trạng thái isAuthenticated
                this.setIsAuthenticated(false);
                this.$router.push({ name: 'signin' });
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>