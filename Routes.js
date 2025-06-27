const { Router } = require("express");
const student = require("./Models/studentModel");
const router = Router();
// // phone: { type: String, required: true },
//     dob: { type: Date, required: true },
//     gender: { type: String, enum: ["male", "female", "other"], required: true },
//     phone: { type: String, required: true },
//     email: { type: String, required: true },
//   courseApplied: {
//     type: String,
//     required: true,
//   },
//   entranceExamScore: { type: Number, required: true },
//   intermediateMarks: { type: Number, required: true },
//   highSchoolMarks: { type: Number, required: true },
//   status: {
//     type: String,
//     enum: ["pending", "approved"],
//     default: "pending",
//   },
//   timestamps: true,

router.post("/create-application", async (req, res) => {
  try {
    var {
      name,
      phone,
      dob,
      gender,
      email,
      courseApplied,
      entranceExamScore,
      intermediateMarks,
      highSchoolMarks,
    } = req.body;
    const newApplication = new student({
      name,
      phone,
      dob,
      gender,
      email,
      courseApplied,
      entranceExamScore,
      intermediateMarks,
      highSchoolMarks,
    });
    await newApplication
      .save()
      .then(() => {
        console.log("New Application created");
        res.status(201).json(newApplication);
      })
      .catch((error) => {
        console.log(error);
      });
    res.status(201).json(Item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while creating application" });
  }
});

router.get("/admin-login", async (req, res) => {
  try {
    var { email, password } = req.body;
    var eMail = "admin@gmail.com";
    var pWord = "Admin.1234";
    if (email === eMail && pWord === password) {
      res.status(201).json({ loggedIn: true });
      console.log("Logged in !!!");
    } else {
      res.status(500).json({ loggedIn: false });
      console.log("Not Logged In !!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while checking admin credentials" });
  }
});

router.get("/check-status", async (req, res) => {
  try {
    var { mobNum } = req.body;
    var application = await student.findOne({ phone: `${mobNum}` });
    // console.log(application);
    res.status(200).json({ status: application.status });
    console.log(application.status);
    //   .catch((err) => {
    //     res.status(500).json("Not fo       und", err);
    //     console.log("Status not found !!!");
    //   });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error while checking statu of student application" });
  }
});

module.exports = router;
