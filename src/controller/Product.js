const multer = require("multer");
const { ProductLaptop } = require("../models/");
const path = require("path");
const getProduct = async (req, res, next) => {
  try {
    const getProduct = await ProductLaptop.find({});

    if (getProduct.length === 0) {
      return res.status(404).json({
        message: "Không có sản phẩm nào!!!",
      });
    }
    return res.json(getProduct);
  } catch (err) {
    return res.status(500).json({
      message: "Kết nối thất bại thử lại sau !!!",
    });
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array("thumbnail", 7);
const postProduct = async (req, res, next) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi upload hình ảnh",
          error: err,
        });
      }

      const {
        name,
        total,
        description,
        totalPurchases,
        details,
        keyboard,
        audio,
        wifi_bluetooth,
        cam,
        system,
        weight,
        size,
        manufacturer,
        discount_percent,
        inventory,
        id_category,
        id_product_brand,
      } = req.body;

      const thumbnails = req.files.map((file) => ({
        type: file.mimetype,
        path: `https://vtc-be-laptop.onrender.com/assets/images/${file.filename}`,
      }));

      const postProduct = await ProductLaptop.create({
        name,
        total,
        description,
        thumbnail: thumbnails,
        totalPurchases,
        details,
        keyboard,
        audio,
        wifi_bluetooth,
        cam,
        system,
        weight,
        size,
        manufacturer,
        discount_percent,
        inventory,
        product_category: id_category,
        product_brand: id_product_brand,
      });

      return res.json({
        product: postProduct,
        message: "Thêm mới sản phẩm thành công ",
      });
    });
  } catch (err) {
    return res.json({
      message: "Kết nối thất bại thử lại sau !!!",
      error: err,
    });
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const id = req.query.id;
    const {
      name,
      total,
      description,
      thumbnail,
      totalPurchases,
      details,
      keyboard,
      audio,
      wifi_bluetooth,
      cam,
      system,
      weight,
      size,
      manufacturer,
      discount_percent,
      inventory,
      id_category,
      id_product_brand,
    } = req.body;
    const updateProduct = await ProductLaptop.findOneAndUpdate(id, {
      name,
      total,
      description,
      details,
      keyboard,
      audio,
      wifi_bluetooth,
      system,
      weight,
      size,
      manufacturer,
      discount_percent,
      inventory,
      product_category: id_category,
      product_brand: id_product_brand,
    });
    if (id === undefined) {
      return res.status(404).json({ message: "Không tìm thấy ID này" });
    }
    return res.json({
      data: updateProduct,
      message: "Sửa sản phẩm thành công ",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Kết nối thất bại thử lại sau !!!",
    });
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const id = req.query.id;
    const deleteProduct = await ProductLaptop.findByIdAndDelete(id);
    console.log("====================================");
    console.log(deleteProduct);
    console.log("====================================");
  } catch (err) {
    return res.status(500).json({
      message: "Kết nối thất bại thử lại sau !!!",
    });
  }
};
const searchProduct = async (req, res, next) => {
  try {
    const { type, brand, minPrice, maxPrice } = req.query;
    const query = {};
    if (type) query.type = type;
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice, 10);
      if (maxPrice) query.price.$lte = parseInt(maxPrice, 10);
    }
    const products = await ProductLaptop.find(query);
    return res.json(products);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
