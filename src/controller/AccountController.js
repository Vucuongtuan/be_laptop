const { AccountDataUser, User, Cart } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDataAccountUser = async (req, res, next) => {
  try {
    await User.find({})
      .populate("AccountId")
      .then((user) => {
        if (user.length <= 0) {
          return res.json({ message: "Không có người dùng nào" });
        } else {
          return res.json({
            total: user.length,
            data: user,
          });
        }
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        return res.json({ message: "Lỗi vui lòng thử lại sau" });
      });
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
    return res.status(500).json({
      message: "Error connecting to the database !!!",
      err: err,
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

    console.log("====================================");
    console.log(query);
    console.log("====================================");

    const user = await User.findOne(query)
      .populate("cartID")
      .populate("AccountId")
      .exec();

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    return res.json({
      data: user,
    });
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
    return res.status(500).json({
      message: "Error connecting to the database !!! 123",
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
      items,
    } = req.body;
    const cart = await Cart.create({
      name: fullName,
      email: email,
      phone: phone,
      address: address,
      items: items,
    });
    const account = await AccountDataUser.create({
      username,
      password,
    });
    await User.create({
      fullName,
      age,
      address,
      email,
      phone,
      gender,
      total,
      cartID: cart._id,
      AccountId: account._id,
    });

    return res.status(200).json({
      message: "thêm người dùng thành công",
    });
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
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

const loginAccountApp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập tên đăng nhập và mật khẩu.",
      });
    }
    const emailCheck = await User.findOne({ email });

    if (!emailCheck) {
      return res.status(401).json({
        message: "Tài khoản không tồn tại.",
      });
    }
    const isPasswordValid = await User.findOne({ password });
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Mật khẩu không đúng.",
      });
    }
    const token = jwt.sign(
      { email: emailCheck.email, userId: emailCheck._id },
      process.env.PASS_JWT,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      username: emailCheck.username,
      email: emailCheck.email,
      userId: emailCheck._id,
      expiresIn: 3600,
    });
  } catch {
    return res.status(500).json({
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
  loginAccountApp,
};
