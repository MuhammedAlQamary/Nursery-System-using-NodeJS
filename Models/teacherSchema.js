const mongoose = require("mongoose");
const autoInc = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

const teacherSchema = new mongoose.Schema({
  //  _id: mongoose.Schema.Types.ObjectId,
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: (value) => {
      return bcrypt.hashSync(value, 10);
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    default: "teacher",
    immutable: true,
  },
});

// teacherSchema.pre("save", function (next) {
//   if (this.isNew) {
//     bcrypt.hash(this.password, 10).then((hash) => {
//       this.password = hash;
//       next();
//     });
//   } else {
//     next();
//   }
// });

// teacherSchema.plugin(autoInc, { inc_field: "teacher_id" });

module.exports = mongoose.model("Teacher", teacherSchema);

/*


// in userSchema.js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

in teacherSchema= new mongoose.Schema({
  userSchema,
  role: {
    type: String,
    default: "teacher",
    immutable: true,
  },
});


// for adding teacher

// {
//     "name": "teacher",
//     "password": "teacher",
//     "email": "teacher@teacher",
//     "image": "teacher.jpg"
// }

// {
//     user: {
XX     "_id": 1,
//     "name": "teacher",
//     "password": "teacher",
//     "email": "teacher@teacher",
//     "image": "teacher.jpg"
//     },
//     role: "teacher"
// }

*/

// {
// fullname: muahmmed samy
// password: 123456
// email: muhammedsamy@gmail
// image: muhammedsamy.jpg
// }

// {
//     "fullname": "muahmmed samy",
//     "password" : "123456",
//     "email": "muhammedsamy@gmail",
//     "image": "muhammedsamy.jpg"
// }
