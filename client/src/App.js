import {React, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ForgotPassword from './pages/password/ForgotPassword';
import ResetPassword from './pages/password/ResetPassword';





function App() {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function isAuth() {
    try {

      const response = await axios.post("/auth/verify", {}, {headers: {token: localStorage.token}});
      response.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    isAuth();
  },[])

  return (
    <Router> 
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to='/dashboard' /> : <Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/register" element={isAuthenticated ? <Navigate to='/' /> : <Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated}/> : <Navigate to='/'/>}/>
        <Route path="/password" element={<ForgotPassword/>}/>
        <Route path="/password/reset/:user_id/:token" element={<ResetPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;
