import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Project() {
  const [project, setProject] = useState([]);
  const { id } = useParams();

  const fetchProject = () => {
    axios
      .get(`http://localhost:5000/api/projects/${id}`)
      .then((res) => {
        console.log(res);
        setProject(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProject();
  }, []);
  return (
    <div>
      <div>
        <h3>Name: {project.name}</h3>
        <p>Description: {project.description} </p>
        {/* <div>
          <h4>Actions:</h4>
          <p>Description: {project.action.description} </p>
          <p>Notes: {project.action.notes} </p>
        </div> */}
      </div>
    </div>
  );
}
export default Project;
