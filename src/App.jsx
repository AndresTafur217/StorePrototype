import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import { Home } from "./Home";
import { Types } from "./Types";

export function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
    </>
  )
}