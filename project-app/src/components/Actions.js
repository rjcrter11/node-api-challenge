import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";

function Actions(props) {
  const history = useHistory();

  const routeToAction = (e, action) => {
    e.preventDefault();
    history.push(`/actions/${action.id}`);
  };

  return (
    <div className="action-container">
      <h4>Actions:</h4>
      <table className="action-table">
        <col width="30%" />
        <col width="30%" />
        <col width="30%" />
        <col width="10%" />

        <th>Description</th>
        <th>Notes</th>
        <th>Status</th>
        <th>Actions</th>

        {props.actions.length > 0 ? (
          props.actions &&
          props.actions.map((act) => (
            <tr key={act.id}>
              <td> {act.description} </td>
              <td> {act.notes} </td>
              <td> {act.completed ? "Complete" : "In Progress"} </td>
              <td>
                {/* <div className="icon-div"> */}
                {/* <IconButton aria-label="delete" onClick={props.deleteAction}>
                    <DeleteIcon />
                  </IconButton> */}
                <IconButton
                  aria-label="edit"
                  onClick={(e) => routeToAction(e, act)}
                >
                  <EditIcon />
                </IconButton>
                {/* </div> */}
              </td>
            </tr>
          ))
        ) : (
          <td>
            <h4>No actions for this project!</h4>
          </td>
        )}
      </table>
    </div>
  );
}
export default Actions;
