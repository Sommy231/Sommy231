import React, { useState } from "react";

import "./App.css";

import ReportForm from "./components/ReportForm";

import AdminDashboard from "./components/AdminDashboard";

import AdminLogin from "./components/AdminLogin";

function App() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(
      !!localStorage.getItem("token")
    );

  return (
    <div>
      <ReportForm />

      {isLoggedIn ? (
        <AdminDashboard />
      ) : (
        <AdminLogin
          setIsLoggedIn={
            setIsLoggedIn
          }
        />
      )}
    </div>
  );
}

export default App;