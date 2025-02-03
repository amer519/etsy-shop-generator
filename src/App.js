// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SitePreview from "./pages/SitePreview";
import { ThemeProvider } from "styled-components";

const themes = {
  default: { background: "#fff", color: "#000" },
  modern: { background: "#f0f0f0", color: "#333" },
  minimal: { background: "#fff", color: "#555" },
};

function App() {
  const [theme, setTheme] = React.useState("default");
  return (
    <Router>
      {/* Uncomment this if you're using authentication */}
      <ThemeProvider theme={themes[theme]}>
      <AuthProvider>
        <Header />
        <main style={{ minHeight: "80vh", padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/site/:siteId" component={<SitePreview />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;