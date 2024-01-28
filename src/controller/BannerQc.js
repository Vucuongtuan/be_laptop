const { BannerQc } = require("../models/");

const getBannerQc = async (req, res, next) => {
  try {
    let getData = await BannerQc.find({});

    if (getData.length === 0) {
      return res.json({
        message: "Không có dữ liệu nào ",
      });
    }
    return res.json(getData);
  } catch (err) {
    return res.status(500).json({
      message: "Lỗi kết nối đến server !!!",
      err: err,
    });
  }
};
const getBannerQcLimit = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    let getData = await BannerQc.find({}).limit(limit);

    if (getData.length === 0) {
      return res.json({
        message: "Không có dữ liệu nào ",
      });
    }
    return res.json({
      total: getData.length,
      data: getData,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Lỗi kết nối đến server !!!",
      err: err,
    });
  }
};

const postBannerQc = async (req, res, next) => {
  try {
    const { thumbnails, description } = req.body;
    let createData = await BannerQc.create({
      thumbnails,
      description,
    });

    return res.json({
      message: "Thêm mới banner thành công .",
      data: createData,
    });
  } catch (err) {
    res.status(500).json({
      message: "Lỗi kết nối đến server !!!",
      err: err,
    });
  }
};
const updateBannerQc = async (req, res, next) => {
  try {
    const _id = req.query.id;
    const { thumbnail, description } = req.body;
    let getData = await BannerQc.findByIdAndUpdate(_id, {
      thumbnail,
      description,
    });

    if (getData.length === 0) {
      res.json({
        message: "Không có dữ liệu nào ",
      });
    }
    res.json(getData);
  } catch (err) {
    res.status(500).json({
      message: "Lỗi kết nối đến server !!!",
      err: err,
    });
  }
};
const deleteBannerQc = async (req, res, next) => {
  try {
    let getData = await BannerQc.find({});

    if (getData.length === 0) {
      res.json({
        message: "Không có dữ liệu nào ",
      });
    }
    res.json(getData);
  } catch (err) {
    res.status(500).json({
      message: "Lỗi kết nối đến server !!!",
      err: err,
    });
  }
};

module.exports = {
  getBannerQc,
  postBannerQc,
  updateBannerQc,
  deleteBannerQc,
  getBannerQcLimit,
};
