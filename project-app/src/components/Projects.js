import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const initialProject = {
  name: "",
  description: "",
  completed: false
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [addProject, setAddProject] = useState(initialProject);
  const history = useHistory();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchProjects = () => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => {
        // console.log(res);
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const routeToProject = (e, project) => {
    e.preventDefault();
    history.push(`/projects/${project.id}/actions`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/projects", addProject)
      .then((res) => {
        // console.log(res);
        setAddProject(initialProject);
        setOpen(false);
        fetchProjects();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div clasName="main-container">
      <nav className="list-nav">
        <div className="projects-header">
          <h2>Your projects at a glance</h2>
        </div>
        <div className={classes.root}>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add Project
          </Button>
        </div>
      </nav>
      <div className="projects-container">
        <table>
          <tr>
            <th>Project</th>
            <th>Status</th>
          </tr>
          {projects.map((project) => (
            <tr key={project.id}>
              <td
                className="project-name"
                onClick={(e) => routeToProject(e, project)}
              >
                {" "}
                {project.name}{" "}
              </td>
              <td> {project.completed ? "Complete" : "In Progress"} </td>
            </tr>
          ))}
        </table>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Project </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the name of your project and a description
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            value={addProject.name}
            onChange={(e) =>
              setAddProject({
                ...addProject,
                name: e.target.value
              })
            }
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Description"
            type="text"
            value={addProject.description}
            onChange={(e) =>
              setAddProject({
                ...addProject,
                description: e.target.value
              })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(handleClose, handleSubmit)} color="primary">
            Add Project
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Projects;
