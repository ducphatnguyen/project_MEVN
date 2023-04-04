const express =  require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const jwtSecret = 'mysecretkey';

// Middleware to check if the user is authenticated
const requireLogin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Unauthorized: missing or invalid token'));
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return next(new ApiError(401, 'Unauthorized: invalid token'));
        }
        // console.log(decoded); // Giải mã để lấy user_id và role
        // console.log(decoded.role); // in ra đối tượng decoded để kiểm tra
        if (decoded.role !== 0) {
            return next(new ApiError(403, 'Forbidden: insufficient permission'));
        }
        req.user = decoded;
        next();
    });
};

//1
const usersRouter = require("./app/routes/user.route");
const contactsRouter = require("./app/routes/contact.route");
const categoriesRouter = require("./app/routes/category.route");
const productsRouter = require("./app/routes/product.route");


const ApiError = require("./app/api-error");

const app = express();
app.use(cors());
app.use(express.json());

//2
app.use('/api/users', usersRouter);
app.use('/api/contacts', requireLogin, contactsRouter);
app.use('/api/categories', requireLogin, categoriesRouter);
app.use('/api/products', requireLogin, productsRouter);

// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application."});
})


module.exports = app;
