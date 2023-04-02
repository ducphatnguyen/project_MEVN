import { createStore } from "vuex";
import createPersistedState from "vuex-plugin-persistedstate";

const store = createStore({
    state() {
        return {
            isAuthenticated: false, // Thêm thuộc tính isAuthenticated vào state
        };
    },
    mutations: {
        setIsAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
    },
    //Lưu trữ trạng thái khi load trang và khi bị out ra (PLUGIN)
    plugins: [
        createPersistedState({}),
    ],
});

export default store;
