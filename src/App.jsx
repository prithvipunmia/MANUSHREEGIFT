// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import TimelinesPage from "./components/TimelinesPage";
import FailedIdeas from "./components/FailedIdeas";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timelines" element={<TimelinesPage />} />
        <Route path="/failed" element={<FailedIdeas />} />
      </Routes>
    </BrowserRouter>
  );
}
