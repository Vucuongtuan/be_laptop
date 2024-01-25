const { AccountDataUser, User, Cart } = require("../models");

const getDataAccountUser = async (req, res, next) => {
  try {
    await User.find({})
      .populate("accountUser")
      .exec((err, user) => {
        if (err) {
          console.log("====================================");
          console.log(err);
          console.log("====================================");
          res.status(500).json({ message: "Không thể lấy dữ liệu người dùng" });
        } else if (user.length <= 0) {
          res.json({ message: "Không có người dùng nào" });
        }
        return res.json({
          total: user.length,
          data: user,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: "Error connecting to the database !!!",
    });
  }
};
const getDataByIDAccountUser = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { name } = req.body;
    let query;
    if (id) {
      query = { _id: id };
    } else if (name) {
      query = { full_name: name };
    } else {
      return res.status(400).json({
        message: "Thiếu thông tin tìm kiếm vui lòng nhập lại !!",
      });
    }
    await User.findOne(query)
      .populate("accountUser")
      .populate("cart")
      .exec((err, user) => {
        if (err) {
          console.log("====================================");
          console.log(err);
          console.log("====================================");
          res.status(500).json({ message: "Không thể lấy dữ liệu người dùng" });
        } else if (!user) {
          res.status(404).json({ message: "Không tìm thấy người dùng." });
        } else {
          return res.json({
            data: user,
          });
        }
      });
  } catch (err) {
    return res.status(500).json({
      message: "Error connecting to the database !!!",
    });
  }
};
const postDataAccountUser = async (req, res, next) => {
  try {
    const {
      fullName,
      age,
      address,
      email,
      phone,
      gender,
      total,
      username,
      password,
    } = req.body;
    const cart = await Cart.create({
      name: fullName,
      email: email,
      phone: phone,
      address: address,
      item: null,
    });
    const user = await User.create({
      fullName,
      age,
      address,
      email,
      phone,
      gender,
      total,
      cartID: cart._id,
    });

    await AccountUser.create({ userID: user._id, username, password });

    return res.status(200).json({
      message: "thêm người dùng thành công",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error connecting to the database !!!",
    });
  }
};
const putDataAccountUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    const password = req.body.password;
    await AccountDataUser.findByIdAndUpdate(id, {
      password: password,
    })
      .then((data) => {
        if (data.length === 0) {
          return res.status(404).json({
            message: "Không tìm thấy người dùng có ID là :" + id,
          });
        }
        return res.json({
          id: data._id,
          username: data.username,
          message: "Sửa tài khoản thành công ",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Sửa tài khoản thất bại thử lại sau",
        });
      });
  } catch {
    return res.status(500).json({
      message: "Lỗi kết nối với database",
    });
  }
};
const deleteAccountUser = async (req, res, next) => {
  try {
    const userId = req.query.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        message: "Người dùng không tồn tại",
      });
    }
    await AccountUser.deleteMany({ userID: userId });
    await Cart.deleteMany({ userID: userId });
    res.json({
      id: user._id,
      username: user.username,
      message: "Đã xóa user thành công!",
    });
  } catch {
    res.status(500).json({
      message: "Lỗi kết nối với Database !!!",
    });
  }
};
module.exports = {
  getDataAccountUser,
  getDataByIDAccountUser,
  postDataAccountUser,
  putDataAccountUser,
  deleteAccountUser,
};
