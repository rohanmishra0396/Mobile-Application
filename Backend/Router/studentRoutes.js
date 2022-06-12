const express = require("express");
const router = express.Router();

const studentController = require("../Services/studentController");

router.get("/fetch/all", async (req, res) => {
  console.log("[START] Fetch Students List");
  let response = await studentController.fetchClassStudents();
  console.log("[END] Fetch Students List");

  res.send({ status: 200, list: response });
});

router.get("/fetch/division", async (req, res) => {
  console.log("[START] Fetch Class Students List");
  const { students } = req.query;
  let response = await studentController.fetchDivisionStudents({
    students,
  });
  console.log("[END] Fetch Class Students List");

  res.send({ status: 200, list: response });
});

router.patch("/record", async (req, res) => {
  console.log("[START] Update Students Data");
  const { body: payload } = req;
  let response = await studentController.updateStudentData({
    payload,
  });
  console.log("[END] Update Students Data");

  res.send({ status: 200, list: response });
});

router.get("/:id", async (req, res) => {
  console.log("[START] Get Student Record");
  const { id: studentId } = req.params;
  let response = await studentController.getStudentData({
    studentId,
  });
  console.log("[END] Get Student Record");

  res.send({ status: 200, list: response });
});

module.exports = router;
