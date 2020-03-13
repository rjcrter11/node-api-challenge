import React from "react";
import { Route, NavLink } from "react-router-dom";
import axios from "axios";

import Projects from "./components/Projects";
import Project from "./components/Project";

import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="nav">
        <div className="header-container">
          <h1>Projects</h1>
        </div>
        <div className="links-container">
          <NavLink to="/projects">Projects</NavLink>
        </div>
      </nav>
      <Route exact path="/projects">
        <Projects />
      </Route>
      <Route exact path="/projects/:id">
        <Project />
      </Route>
    </div>
  );
}

export default App;
