// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ padding: "1rem", background: "#f5f5f5" }}>
      <h1>Etsy Shop Website Generator</h1>
      <nav>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}

export default Header;