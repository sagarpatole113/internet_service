import { ToastContainer } from "react-toastify";
import Register from "./components/Register";
import "react-toastify/dist/ReactToastify.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React  from "react";
import AdminLogin from "./components/AdminLogin";
import ErrorPage from "./components/ErrorPage";


function App() {

  return (
    <>
      <BrowserRouter >
      <ToastContainer />
      <Routes>
            <Route path="/" element={<Register />}></Route>
            <Route path="/admin-login" element={<AdminLogin />}></Route>
            <Route path="*" element={<ErrorPage/>}/>
       </Routes>
    </BrowserRouter>
      </>
    
  );
}

export default App;
