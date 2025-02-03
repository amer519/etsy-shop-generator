// src/components/Footer.js
import React from "react";

function Footer() {
  return (
    <footer style={{ padding: "1rem", background: "#f5f5f5", marginTop: "2rem" }}>
      <p>&copy; {new Date().getFullYear()} Etsy Shop Website Generator</p>
    </footer>
  );
}

export default Footer;