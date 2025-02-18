import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import TakeAttendance from "./components/TakeAttendance";
import AttendanceReport from "./components/AttendanceReport";
import AddStudent from "./components/AddStudent";
import Batch from "./components/BatchPromotion";
import Header from "./components/Header";
import AuthNavBar from "./components/AuthNavbar";
import GuestNavbar from "./components/GuestNavbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  return (
   
      <Router>
        <Header />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/take-attendance" element={<TakeAttendance />} />
          <Route path="/add-student" element={<AddStudent />} />
        <Route path="/view-attendance" element={<AttendanceReport />} />
          <Route path="/batch" element={<Batch />} />
        </Routes>
      </Router>
   
  );
}

export default App;
