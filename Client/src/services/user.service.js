import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server 
class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }
    //Gọi đến endpoint trong routes
    async signUp(data) {
        return (await this.api.post("/signup", data)).data;
    }
    async signIn(data) {
        return (await this.api.post("/signin", data)).data;
    }
    async signOut() {
        return (await this.api.post("/signout")).data;
    }
}

export default new UserService();
