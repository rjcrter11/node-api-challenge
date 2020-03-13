const express = require("express");
const Action = require("../data/helpers/actionModel");

const router = express.Router();

router.use((req, res, next) => {
  console.log("Action Router");
  next();
});

router.get("/", (req, res) => {
  Action.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving actions list" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Action.get(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving action" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Action.remove(id)
    .then((action) => {
      res.status(200).json({ success: "Action deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error deleting action" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const edits = req.body;
  Action.update(id, edits)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error updating action" });
    });
});

module.exports = router;
