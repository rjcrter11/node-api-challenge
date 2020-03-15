import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <nav className="nav">
        <div className="header-container">
          <h1>Projects</h1>
        </div>
        <div className="links-container">
          <NavLink to="/projects">Projects</NavLink>
        </div>
      </nav>
    </div>
  );
}
