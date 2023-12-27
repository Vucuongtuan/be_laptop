const { ProductLaptop, Mouse } = require("../models/");

const PAGE_SIZE = 10;
const getAllProduct = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const getDataLaptop = await ProductLaptop.find({})
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);
    const getDataMouse = await Mouse.find({})
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);
    const newData = [...getDataLaptop, ...getDataMouse];
    if (getDataLaptop.length === 0) {
      return res.json({
        message: "Không có dữ liệu",
      });
    }
    const responseData = {
      total: newData.length,
      totalPages: Math.ceil(newData.length / PAGE_SIZE),
      data: newData,
    };
    return res.json(responseData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Lỗi kết nối với Server",
      error: err,
    });
  }
};

module.exports = getAllProduct;
