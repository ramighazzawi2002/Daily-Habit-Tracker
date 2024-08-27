const express = require("express");

const {
  getHabbits,
  deleteHabbit,
  addHabbit,
  updateHabbit,
  handleFinished,
  makeAllHabbitsUnfinished,
} = require("../controllers/habbitController");

const router = express.Router();

router.get("/get", getHabbits);

router.delete("/delete/:id", deleteHabbit);

router.post("/add", addHabbit);

router.put("/update/:id", updateHabbit);

router.put("/finished/:id", handleFinished);

router.put("/makeAllUnfinished", makeAllHabbitsUnfinished);

module.exports = router;
