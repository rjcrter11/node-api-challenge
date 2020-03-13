const express = require("express");
const Project = require("../data/helpers/projectModel");
const Action = require("../data/helpers/actionModel");

const router = express.Router();

router.use((req, res, next) => {
  console.log("Project Router");
  next();
});

router.get("/", (req, res) => {
  Project.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving projects list" });
    });
});

router.get("/:id", (req, res) => {
  id = req.params.id;
  Project.get(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving project" });
    });
});

router.get("/:id/actions", (req, res) => {
  id = req.params.id;
  Project.getProjectActions(id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving list of actions" });
    });
});

router.post("/", (req, res) => {
  const body = req.body;
  Project.insert(body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error adding project" });
    });
});

router.post("/:id/actions", (req, res) => {
  const action = { ...req.body, project_id: req.params.id };
  Action.insert(action)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error adding action to project" });
    });
});

router.delete("/:id", (req, res) => {
  id = req.params.id;
  Project.remove(id)
    .then((project) => {
      res.status(200).json({ success: "Project deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error deleting project" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const edits = req.body;
  //const updatedProject = { ...edits, id };
  Project.update(id, edits)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error updating project" });
    });
});

module.exports = router;
