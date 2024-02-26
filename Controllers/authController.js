const JWT = require("jsonwebtoken");
const teacherModel = require("../Models/teacherSchema");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  try {
    const { fullname, email, password, image } = req.body;
    const newUser = new teacherModel({
      fullname,
      email,
      password,
      image,
    });
    const token = JWT.sign(
      { id: newUser._id, role: newUser.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    newUser
      .save()
      .then((data) => {
        res.status(201).json({ data, token });
      })
      .catch((error) => {
        res.status(500).json({ message: error + "" });
      });
  } catch (error) {
    res.status(500).json({ message: error + "" });
  }
};

// user login
// {
// "fullname": "teacher 1",
// "email": "teacher1@gmail.com",
// "password": "123456",
// "image": "image"
// }

exports.changePassword = async (req, res, next) => {
  console.log(req.body, "change password");
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await teacherModel.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(oldPassword, user.password);
      if (auth) {
        user.password = newPassword;
        user
          .save()
          .then((data) => {
            res.status(200).json({ data });
          })
          .catch((error) => {
            res.status(500).json({ message: error + "" });
          });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error + "err" });
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log(req.body, "login");
    const { email, password } = req.body;
    const user = await teacherModel.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = JWT.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.status(200).json({ user, token });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error + "" });
  }
};

// change password

// {
// "email": "teacher1@gmail.com",
// "oldPassword" : "123456",
// "newPassword" : "654321"
// }
