const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./Routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const db_URI = process.env.DBURL;
mongoose
  .connect(db_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected succesfully....");
  })
  .catch((error) => {
    console.log(`Error connecting DB : ${error}`);
  });

app.use(routes);

// Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/student', require('./routes/studentRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));

app.get("/", (req, res) => {
  res.send("University Admission Management API is running...");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
