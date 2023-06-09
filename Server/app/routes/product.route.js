const express = require("express");
const products = require("../controllers/product.controller");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router
  .route("/")
  .get(products.findAll)
  .post(upload.single("image"), products.create)
  .delete(products.deleteAll);

router
  .route("/:id")
  .get(products.findOne)
  .put(upload.single("image"), products.update)
  .delete(products.delete);

module.exports = router;
