const { AccountDataUser } = require("../models");

const getDataAccountUser = async (req, res, next) => {
  try {
    await AccountDataUser.find({})
      .maxTimeMS(30000)
      .then((data) => {
        if (data !== undefined) {
          return res.json(data);
        } else {
          return res.json({
            message: "There are no accounts !!!",
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
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    await AccountDataUser.create({
      username,
      email,
      password,
    })
      .then((data) => {
        res.json("Tao tk thanh cong !!! : " + data.username);
      })
      .catch((err) => {
        res.status(500).json("Tao tk that bai !!! : " + err.message);
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
    const id = req.query.id;
    await AccountDataUser.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res.status(404).json({
            message: "Người dùng không tồn tại",
          });
        }
        res.json({
          id: data._id,
          username: data.username,
          message: "Đã xóa account thành công !",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Xóa người dùng thất bại",
        });
      });
  } catch {
    res.status(500).json({
      message: "Lỗi kết nối với Database !!!",
    });
  }
};
module.exports = {
  getDataAccountUser,
  postDataAccountUser,
  putDataAccountUser,
  deleteAccountUser,
};
