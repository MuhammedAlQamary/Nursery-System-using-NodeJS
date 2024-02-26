const mongoose = require("mongoose");

const autoIncrement = require("mongoose-sequence")(mongoose);

const bcrypt = require("bcrypt");

const addressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const childSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    level: {
      type: String,
      required: true,
      enum: ["Prekg", "Kg1", "Kg2"],
    },
    address: addressSchema,

    role: {
      type: String,
      default: "child",
      immutable: true,
    },
  },
  { _id: false }
);

childSchema.plugin(autoIncrement, { inc_field: "_id" });

module.exports = mongoose.model("Child", childSchema);

// create child body raw

// {
//   "fullname": "child1",
//   "age": 5,
//   "level": "Prekg",
//   "address": {
//     "city": "Amman",
//     "street": "street1",
//     "building": "building1"
//   }
// }
