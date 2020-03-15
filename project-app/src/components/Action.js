import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialAction = {
  description: "",
  notes: "",
  completed: false
};

function Action() {
  const [action, setAction] = useState([]);
  const [actionToEdit, setActionToEdit] = useState(initialAction);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchAction = () => {
    axios
      .get(`http://localhost:5000/api/actions/${id}`)
      .then((res) => {
        console.log(res);
        setAction(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAction();
  }, []);

  const saveEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/actions/${id}`, actionToEdit)
      .then((res) => {
        console.log(res);
        setOpen(false);
        history.push(`/projects/${action.project_id}/actions`);
        fetchAction();
      })
      .catch((err) => console.log(err));
  };

  const deleteAction = (action) => {
    axios
      .delete(`http://localhost:5000/api/actions/${action.id}`)
      .then((res) => {
        console.log(res);
        history.push(`/projects/${action.project_id}/actions`);
      })
      .catch((err) => console.log(err));
  };

  const handlePush = (e, action) => {
    e.preventDefault();
    history.push(`/projects/${action.project_id}/actions`);
  };

  return (
    <div className="main-action-container">
      <div className="action-box">
        <h4> Description: {action.description}</h4>
        <p> Notes: {action.notes} </p>
        <p> Status: {action.completed ? "Complete" : "In progress"} </p>

        <div className="btn-row">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDeleteOpen}
          >
            Delete
          </Button>
          <Dialog
            open={openDelete}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this action?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={(handleDeleteClose, () => deleteAction(action))}
                color="primary"
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Edit
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <DialogContentText>
                Edit your project's action here
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                value={actionToEdit.description}
                onChange={(e) =>
                  setActionToEdit({
                    ...actionToEdit,
                    description: e.target.value
                  })
                }
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="notes"
                label="Notes"
                type="text"
                value={actionToEdit.notes}
                onChange={(e) =>
                  setActionToEdit({
                    ...actionToEdit,
                    notes: e.target.value
                  })
                }
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setActionToEdit({
                        ...actionToEdit,
                        completed: e.target.checked
                      })
                    }
                    value={actionToEdit.completed}
                    color="primary"
                  />
                }
                label="Completed?"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={(handleClose, saveEdit)} color="primary">
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <Button className="push-btn" onClick={(e) => handlePush(e, action)}>
        Return to Action list{" "}
      </Button>
    </div>
  );
}
export default Action;
