import React from "react";
import { Route } from "react-router-dom";

import Projects from "./components/Projects";
import Project from "./components/Project";

import "./App.css";
import Home from "./components/Home";
import Action from "./components/Action";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/projects">
        <Projects />
      </Route>
      <Route exact path="/projects/:id/actions">
        <Project />
      </Route>
      <Route exact path="/actions/:id">
        <Action />
      </Route>
    </div>
  );
}

export default App;
