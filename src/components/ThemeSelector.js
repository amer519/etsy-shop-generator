// src/components/ThemeSelector.js
import React from "react";

function ThemeSelector({ theme, setTheme }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="theme-select">Select Theme: </label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="modern">Modern</option>
        <option value="minimal">Minimal</option>
      </select>
    </div>
  );
}

export default ThemeSelector;