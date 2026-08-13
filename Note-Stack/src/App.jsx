import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./index.css";
import LayoutWrapper from "./LayoutWrapper";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Notes from "./pages/Notes";
import Tasks from "./pages/Tasks";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/Tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}

export default App;
