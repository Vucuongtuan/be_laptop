const { Mouse } = require("../models/");
const upload = require("../middleware/uploadImage/");

const getDataMouse = async (req, res, next) => {
  try {
    const getData = await Mouse.find({});
    if (getData.length === 0) {
      return res.status(404).json({
        message: "Không có dữ liệu !!",
      });
    }
    return res.json(getData);
  } catch (err) {
    return res.status(500).json({
      message: "Lỗi kết nối vui lòng thử lại sau",
    });
  }
};
const postDataMouse = async (req, res, next) => {
  try {
    upload.array("images")(req, res, async function (err) {
      if (err) {
        console.error("Error uploading images:", err.message);
        return res.status(500).send("Internal Server Error");
      }
      const { name, total, guarantee, details } = req.body;
      const imagePaths = req.files
        ? req.files.map((file) => ({
            url: file.path.replace("assets", ""),
            isThumbnail: false,
          }))
        : [];

      const thumbnailIndex = req.body.thumbnailIndex;
      if (thumbnailIndex !== undefined && thumbnailIndex < imagePaths.length) {
        imagePaths[thumbnailIndex].isThumbnail = true;
      }

      const postData = await Mouse.create({
        name,
        total,
        guarantee,
        details,
        image: imagePaths,
      });

      return res.json(postData);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Lỗi kết nối vui lòng thử lại sau",
    });
  }
};
const updateDataMouse = async (req, res, next) => {
  try {
    const id = req.query.id;
    const { name, total, guarantee, details } = req.body;
    const updateData = await Mouse.findByIdAndUpdate(id, {
      name,
      total,
      guarantee,
      details,
    });

    return res.json({
      message: "Đã sửa thành công !!!",
      data: updateData,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Lỗi kết nối vui lòng thử lại sau",
    });
  }
};
const deleteDataMouse = async (req, res, next) => {
  try {
    const id = req.query.id;
    const deleteData = await Mouse.findByIdAndDelete(id);
    if (deleteData.length === 0) {
      return res.status(404).json({
        message: "Không có dữ liệu !!",
      });
    }
    return res.json(deleteData);
  } catch (err) {
    return res.status(500).json({
      message: "Lỗi kết nối vui lòng thử lại sau",
    });
  }
};
const searchDataMouse = async (req, res, next) => {
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
    const products = await Mouse.find(query);
    return res.json(products);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  getDataMouse,
  postDataMouse,
  updateDataMouse,
  deleteDataMouse,
  searchDataMouse,
};
