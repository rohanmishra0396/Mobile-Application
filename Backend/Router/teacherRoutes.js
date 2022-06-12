const express = require("express");
const router = express.Router();

const teacherController = require("../Services/teacherController");

router.get("/fetch/:id/class", async (req, res) => {
  console.log("[START] Fetch Class of Teacher");
  const { id } = req.params;
  let response = await teacherController.fetchTeacherClass(id);
  console.log("[END] Fetch Class of Teacher");

  res.send({ status: 200, list: response });
});

module.exports = router;
