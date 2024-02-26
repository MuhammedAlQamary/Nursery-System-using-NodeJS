const Teacher = require("../Models/teacherSchema");
const Class = require("../Models/classSchema");
// const { body } = require("express-validator");

// adding the Teacher schema to the teacherController

exports.getAllTeachers = async (req, res, next) => {
  try {
    await Teacher.find()
      .then((data) => {
        res.status(200).json({ data, message: "get all teachers" });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (err) {
    req.status(500).json({ message: err + "" });
  }
};

exports.getTeacherById = async (req, res, next) => {
  try {
    await Teacher.findOne({ _id: req.params.id })
      .then((data) => {
        res.status(200).json({ data, message: "get one teacher" });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (err) {
    req.status(500).json({ message: err + "" });
  }
};

exports.createTeacher = async (req, res, next) => {
  try {
    await Teacher
      .findOne({ email: req.body.email })
      .then((data) => {
        if (!data) {
          const newTeacher = new Teacher({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            image: req.file.path,
          });
          newTeacher
            .save()
            .then((data) => {
              res.status(201).json({
                data,
                body: req.body,
                file: req.file,
                message: "create teacher",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ message: err + "" });
            });
        } else {
          res.status(400).json({ message: "email already exists" });
        }
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err + "" });
  }
};

exports.updateTeacher = async (req, res, next) => {
  try {
    await Teacher.findOneAndUpdate({ _id: req.body.id }, req.body, {
      new: true,
    })
      .then((data) => {
        if (data) {
          res.status(200).json({ data, message: "update teacher" });
        } else {
          res.status(404).json({ message: "teacher not found" });
        }
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (err) {
    req.status(500).json({ message: err + "" });
  }
};

exports.deleteTeacher = async (req, res, next) => {
  try {
    await Teacher.findOneAndDelete({ _id: req.body.id })
      .then((data) => {
        if (data) {
          res.status(200).json({ data, message: "delete teacher" });
        } else {
          res.status(404).json({ message: "teacher not found" });
        }
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (err) {
    req.status(500).json({ message: err + "" });
  }
};

exports.getSupervisors = async (req, res, next) => {
  try {
    await Class.find()
      .pupolate({ path: "teachers" }, "supervisor")
      .then((data) => {
        res.status(200).json({ data, message: "get all supervisors" });
      })
      .catch((err) => {
        res.status(500).json({ message: err + "" });
        console.log(err);
        // next(err);
      });
  } catch (err) {
    req.status(500).json({ message: err + "" });
  }
};
