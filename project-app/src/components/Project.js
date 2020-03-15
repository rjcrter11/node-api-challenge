import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import Actions from "../components/Actions";

const initialAction = {
  description: "",
  notes: "",
  completed: false
};
const initialProject = {
  name: "",
  description: "",
  completed: false
};

function Project() {
  const [project, setProject] = useState([]);
  const [actions, setActions] = useState([]);
  const [addAction, setAddAction] = useState(initialAction);
  const [projectToEdit, setProjectToEdit] = useState(initialProject);

  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const pushHandler = (e) => {
    e.preventDefault();
    history.push("/projects");
  };

  const { id } = useParams();
  const history = useHistory();

  console.log("log for actions in Project.js", actions);

  const fetchProject = () => {
    axios
      .get(`http://localhost:5000/api/projects/${id}/`)
      .then((res) => {
        console.log(res);
        setProject(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchActions = () => {
    axios
      .get(`http://localhost:5000/api/projects/${id}/actions`)
      .then((res) => {
        console.log(res);
        setActions(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProject();
    fetchActions();
  }, []);

  const deleteProject = (project) => {
    axios
      .delete(`http://localhost:5000/api/projects/${project.id}`)
      .then((res) => {
        console.log(res);
        history.push("/projects");
      })
      .catch((err) => console.log(err));
  };

  const handleAddAction = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/projects/${id}/actions`, addAction)
      .then((res) => {
        console.log(res);
        fetchProject();
        fetchActions();
        setAddOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/projects/${id}`, projectToEdit)
      .then((res) => {
        console.log(res);
        fetchProject();
        fetchActions();
        setEditOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="pandr-container">
      <div className="project">
        <div className="project-group">
          <h3>Project: {project.name}</h3>
          <p>Description: {project.description} </p>
        </div>
        <div className="delete-container">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickOpen}
          >
            Delete Project
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this project?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={(handleClose, () => deleteProject(project))}
                color="primary"
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="edit-container">
          <Button variant="outlined" color="primary" onClick={handleEditOpen}>
            Edit
          </Button>
          <Dialog
            open={editOpen}
            onClose={handleEditClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText>Edit your project here</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="projectDescription"
                label="Project Name"
                type="text"
                value={projectToEdit.name}
                onChange={(e) =>
                  setProjectToEdit({
                    ...projectToEdit,
                    name: e.target.value
                  })
                }
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="projectNotes"
                label="Notes for Action"
                type="text"
                value={projectToEdit.description}
                onChange={(e) =>
                  setProjectToEdit({
                    ...projectToEdit,
                    description: e.target.value
                  })
                }
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setProjectToEdit({
                        ...projectToEdit,
                        completed: e.target.checked
                      })
                    }
                    value={projectToEdit.completed}
                    color="primary"
                  />
                }
                label="Completed?"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} color="primary">
                Cancel
              </Button>
              <Button onClick={(handleEditClose, handleEdit)} color="primary">
                Save Edit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <Actions actions={actions} fetchProject={fetchProject} />
      <div className="add-container">
        <Button variant="outlined" color="primary" onClick={handleAddOpen}>
          Add an Action
        </Button>
        <Dialog
          open={addOpen}
          onClose={handleAddClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText>
              Add a description for you action and notes
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="actionDescription"
              label="Action Description"
              type="text"
              value={addAction.description}
              onChange={(e) =>
                setAddAction({
                  ...addAction,
                  description: e.target.value
                })
              }
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="actionNotes"
              label="Notes for Action"
              type="text"
              value={addAction.notes}
              onChange={(e) =>
                setAddAction({
                  ...addAction,
                  notes: e.target.value
                })
              }
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddClose} color="primary">
              Cancel
            </Button>
            <Button onClick={(handleClose, handleAddAction)} color="primary">
              Add Action
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Button onClick={(e) => pushHandler(e)}>Return to Project List</Button>
      </div>
    </div>
  );
}
export default Project;
