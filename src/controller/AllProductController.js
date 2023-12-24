const { ProductLaptop, Mouse } = require("../models");

const getAllProduct = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const getDataLaptop = await ProductLaptop.find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    const getDataMouse = await Mouse.find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    const newData = [...getDataLaptop, ...getDataMouse];
    if (newData.length === 0) {
      return res.json({
        message: "Không có dữ liệu",
      });
    }
    return res.json({
      total: newData.length,
      totalPages: Math.ceil(total / limit),
      data: newData,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Lỗi kết nối với Server",
      error: err,
    });
  }
};

module.exports = getAllProduct;
