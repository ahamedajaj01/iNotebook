import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import About from './component/About';
import MyNotes from './component/MyNotes';
import Alert from './component/Alert';
import NoteState from "./context/notes/NoteState";
import Dashboard from "./component/Dashboard";
import Signup from "./component/auth/Signup";
import Login from "./component/auth/Login";
import PublicRoute from "./component/PublicRoute"; // 👈 import it
import PrivateRoute from "./component/PrivateRoute"; // 👈 import it
import ResetPassword from "./component/model/ResetPassword";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <NoteState>
      <Router>
        {/* Top Navbar */}
        <Navbar showAlert={showAlert} />

        {/* ✅ Global Alert + Routes inside container */}
        <div className="container mt-3">
          {alert && <Alert type={alert.type} message={alert.message} />}
 </div>
          <Routes>
             {/* Public routes wrapped inside PublicRoute */}
  <Route path="/" element={ <PublicRoute> <Home /> </PublicRoute>} />
  <Route path="/login" element={<PublicRoute><Login showAlert={showAlert} /></PublicRoute>} />
  <Route path="/signup" element={ <PublicRoute><Signup showAlert={showAlert} /></PublicRoute>} />
  {/* 🔒 Protected Routes */}
  <Route path="/dashboard" element={ <PrivateRoute> <Dashboard showAlert={showAlert} alert={alert} /> </PrivateRoute>} />
  <Route path="/mynotes" element={<PrivateRoute> <MyNotes showAlert={showAlert} /></PrivateRoute>} />
  <Route path="/resetpassword/:token" element={<ResetPassword />} />
  
  {/* Other route */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mynotes" element={<MyNotes showAlert={showAlert} />} />
            <Route path="/dashboard" element={<Dashboard showAlert={showAlert} alert={alert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
          </Routes>
       

        {/* Footer */}
        <Footer />
      </Router>
    </NoteState>
  );
}

export default App;
