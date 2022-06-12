const express = require("express");
const router = express.Router();

const classController = require("../Services/classController");

router.get("/fetch/all/:id", async (req, res) => {
  console.log("[START] Fetch Class List");
  let { id } = req.params;
  let response = await classController.fetchClasses(id);
  console.log("[END] Fetch Class List");

  res.send({ status: 200, list: response });
});

router.get("/fetch/:id", async (req, res) => {
  console.log("[START] Fetch Class Data");
  let { id } = req.params;
  let response = await classController.fetchClassInfo(id);
  console.log("[END] Fetch Class Data");

  res.send({ status: 200, list: response });
});

module.exports = router;
