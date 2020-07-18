const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


const app = express();
dotenv.config();
//Middleware
app.use(express.json());

//routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

//routes middleware
app.use("/api/user", authRoutes);
app.use("/api/post", postRoutes);



mongoose.connect(process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("DB is connected");
  }
)
app.listen(8000, () => console.log("server is running at http://localhost:8000"));