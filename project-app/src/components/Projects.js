import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const history = useHistory();

  const fetchProjects = () => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => {
        console.log(res);
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const routeToProject = (e, project) => {
    e.preventDefault();
    history.push(`/projects/${project.id}`);
  };

  return (
    <div className="projects-container">
      {projects.map((project) => (
        <p onClick={(e) => routeToProject(e, project)} key={project.id}>
          {" "}
          {project.name}{" "}
        </p>
      ))}
    </div>
  );
}
export default Projects;
