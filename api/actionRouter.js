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

router.get("/:id", validateActionId, (req, res) => {
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

router.delete("/:id", validateActionId, (req, res) => {
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

router.put("/:id", validateActionId, validateAction, (req, res) => {
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

// ----- Middleware ------ //

function validateActionId(req, res, next) {
  const id = req.params.id;
  Action.get(id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({ message: "Cannot find action with this id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error validating action information" });
    });
}
function validateAction(req, res, next) {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "Missing action data" });
  } else if (!body.description || !body.notes) {
    res.status(400).json({ message: "Missing required fields" });
  } else {
    next();
  }
}

module.exports = router;
