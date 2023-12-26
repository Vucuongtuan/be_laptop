const { ProductLaptop } = require("../models/");

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
const postProduct = async (req, res, next) => {
  try {
    const {
      name_product,
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
      id_category,
      id_product_brand,
    } = req.body;
    const postProduct = await ProductLaptop.create({
      name_product,
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
      id_category,
      id_product_brand,
    });
    // if(postProduct.length === 0 ) {
    //   res.json({
    //     message:"Thêm sản phẩm thất bại"
    //   })
    // }

    return res.json({
      product: postProduct,
      message: "Thêm mới sản phẩm thành công ",
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
      name_product,
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
    } = req.body;
    const updateProduct = await ProductLaptop.findOneAndUpdate(id, {
      name_product,
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
