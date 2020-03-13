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

router.get("/:id", validateProjectId, (req, res) => {
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

router.get("/:id/actions", validateProjectId, (req, res) => {
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

router.post("/", validtateProject, (req, res) => {
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

router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
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

router.delete("/:id", validateProjectId, (req, res) => {
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

router.put("/:id", validtateProject, (req, res) => {
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

// ------ Middleware ------ //

function validtateProject(req, res, next) {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "Missing project data" });
  } else if (!body.name || !body.description) {
    res.status(400).json({ message: "Missing required fields" });
  } else {
    next();
  }
}

function validateProjectId(req, res, next) {
  const id = req.params.id;
  Project.get(id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "Cannot find project with this id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error validating project information" });
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
