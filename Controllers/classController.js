const Class = require("../Models/classSchema");

exports.getAllClasses = async (req, res, next) => {
  try {
    await Class.find()
      .then((data) => {
        res.status(200).json({ data, message: "Get All Classes" });
      })
      .catch((error) => {
        res.status(500).json({ message: error + "" });
      });
  } catch (error) {
    res.status(500).json({ message: error + "" });
    console.log(error);
    next(error);
  }
};

exports.getClassById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Class.findOne({ class_id: id })
      .then((data) => {
        if (data) {
          res.status(200).json({ data });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error + "" });
      });
  } catch (error) {
    res.status(500).json({ message: error + "" });
    console.log(error);
    next(error);
  }
};

exports.createClass = async (req, res, next) => {
  try {
    await Class.create(req.body)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ message: error + "" });
      });
  } catch (error) {
    res.status(500).json({ message: error + "" });
    console.log(error);
    next(error);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    await Class.findOneAndUpdate({ class_id: req.body.id }, req.body)
      .then((data) => {
        if(data) {  
          res.status(200).json({ data });
        }
        else {
          res.status(404).json({ message: "Class not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error + "" });
      });
  } catch (error) {
    res.status(500).json({ message: error + "" });
    console.log(error);
    next(error);
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    const id = req.body.id;
    await Class.findOneAndDelete({ class_id: id })
      .then((data) => {
        if(data) {
          res.status(200).json({ data });
        }
        else {
          res.status(404).json({ message: "Class not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error + "" });
      });
  } catch (error) {
    res.status(500).json({ message: error + "" });
    console.log(error);
    next(error);
  }
};

// --- 

exports.getChildClass = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Class.findById(class_id)
      .then((data) => {
        if (data) {
          res.status(200).json({ data });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error + "" });
      });
  } catch (error) {
    res.status(500).json({ message: error + "" });
    console.log(error);
    next(error);
  }
};

exports.getSupervisorClass = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Class.findById(class_id)
      .then((data) => {
        data.populate({ path: "Teacher" });
        if (data) {
          res.status(200).json({ data });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error + "" });
      });
  } catch (error) {
    res.status(500).json({ message: error + "" });
    console.log(error);
    next(error);
  }
};


// crate object

// {
//   "name": "class 1",
//   "supervisor": 1,
//   "children": [1, 2, 3]
// }
