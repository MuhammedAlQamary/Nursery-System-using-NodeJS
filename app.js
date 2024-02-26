// -- get the express module -- //
const express = require("express");
const server = express();
const upload = require("./Middlewares/multerMW");

const authRoute = require("./Routes/AuthRoute");
const childRoute = require("./Routes/childRoute");
const teachRoute = require("./Routes/teacherRoute");
const classRoute = require("./Routes/classRoute");

const dotenv = require("dotenv");

// -- get the mongoose module -- //
const mongoose = require("mongoose");

// -- get the PORT -- //
const PORT = process.env.PORT || 8080;

// -- connect to the database -- //
mongoose
  .connect("mongodb://localhost:27017/nursery")
  .then(() => {
    // -- listen to the server -- //
    console.log("connected to the database");
    server.listen(PORT, () => {
      console.log(`server is listening to port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

 dotenv.config();

// -- get the jwt module -- //
 jwt = require("jsonwebtoken");

// -- Build The Server --//

// -- Settings -- //
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(upload.single("image"));

// -- Routes -- //
// -- Authuntication -- // Login, Change Password -- //
server.use(authRoute);

// -- Children -- //
server.use(childRoute);
// -- Teachers -- //
server.use(teachRoute);
// -- Class -- //
server.use(classRoute);


// server.post("/teachers", (req, res, next) => {
//   res.status(201).json({ data: {}, message: "create teacher" });
// });
// -- Admin -- //
// const adminRoute = require("./Routes/admingRoute");
// server.use(adminRoute);

// -- Upload -- //
// server.post("/upload", (req, res, next) => {
//   res.status(201).json({ data: {}, message: "upload" });
// });

// -- Swagger -- //
// server.get("/api-docs", (req, res, next) => {
//   res.status(200).json({ data: {}, message: "swagger" });
// });

// -- Not Found MW -- //
server.use((req, res, next) => {
  res.status(404).json({ error: { message: "Not Found _from app.js_" } });
});

// -- Error MW -- //
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong _from app.js_",
  });
});
