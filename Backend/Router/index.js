const express = require("express");
const router = express.Router();

const studentRoutes = require("./studentRoutes");
const classRoutes = require("./classRoutes");
const teacherRoutes = require("./teacherRoutes");

router.get("/listTeacherData", async (req, res) => {
  console.log("Fetching lists");

  const collection = db.collection("TeacherManagement");
  //console.log("collection "+JSON.stringify(collection));
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  res.send({ status: 200, list: findResult });
});

router.use("/student", studentRoutes);
router.use("/class", classRoutes);
router.use("/teacher", teacherRoutes);

module.exports = router;
