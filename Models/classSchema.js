const mongoose = require("mongoose");

const autoIncrement = require("mongoose-sequence")(mongoose);

const Teacher = require("./teacherSchema");
const Child = require("./childSchema");

let classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    supervisor: {
      type: Number,
      //type: 'ObjectId',
      // required: true,
      ref: "Teacher",
    },
    children: [
      {
        type: Number,
        // type: mongoose.ObjectId,
        ref: Child,
      },
    ],
  },
  { _id: true }
);

// const autoInc2 = autoIncrement(classSchema, { inc_field: "_id" });

classSchema.plugin(autoIncrement, { inc_field: "class_id" });

module.exports = mongoose.model("Class", classSchema);

// create a class

// {
//  "name": "class 1",
//  "supervisor": 1,
//  "children": [1, 2, 3]
// }
