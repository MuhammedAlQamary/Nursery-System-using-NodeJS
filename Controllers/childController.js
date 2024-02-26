const Child = require("../Models/childSchema");

/// -- Children -- ///
exports.getAllChildren = async (req, res, next) => {
  try {
    await Child.find()
      .then((data) => {
        res.status(200).json({ data, message: "get all children" });
      })
      .catch((err) => {
        res.status(500).json({ message: err + "" });
        console.log(err);
        next(err);
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getChildbyId = async (req, res, next) => {
  try {
    const myId = req.params.id;
    await Child.findOne({ _id: myId })
      .then((data) => {
        if (!data) {
          res.status(200).json({ data, message: "get one child" });
        } else {
          res.status(404).json({ data, message: "child not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err + "" });
        console.log(err);
        next(err);
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
  // res.status(200).json({ data: {}, message: "get one child" });
};

exports.createChild = (req, res, next) => {
  try {
    Child.create(req.body)
      .then((data) => {
        res.status(201).json({ data, message: "create child" });
      })
      .catch((err) => {
        res.status(500).json({ message: err + "" });
        console.log(err);
        next(err);
      });
  } catch (err) {
    res.status(500).json({ message: err + "" });
    console.log(err);
    next(err);
  }
};

exports.updateChild = async (req, res, next) => {
  try {
    await Child.findOneAndUpdate({ _id: req.body.id }, req.body)
      .then((data) => {
        res.status(200).json({ data, message: "update child" });
      })
      .catch((err) => {
        res.status(500).json({ message: err + "" });
        console.log(err);
        next(err);
      });
  } catch (err) {
    res.status(500).json({ message: err + "" });
    console.log(err);
    next(err);
  }
  // res.status(200).json({ data: {}, message: "update child" });
};

exports.deleteChild = async (req, res, next) => {
  await Child.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({ data, message: "delete child" });
    })
    .catch((err) => {
      res.status(500).json({ message: err + "" });
      console.log(err);
      next(err);
    });

  // res.status(200).json({ data: {}, message: "delete child" });
};
