// src/pages/Dashboard.js
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import EtsyShopGenerator from "../components/EtsyShopGenerator";

function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {currentUser && currentUser.email}</p>
      <EtsyShopGenerator />
    </div>
  );
}

export default Dashboard;