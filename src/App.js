import { ToastContainer } from "react-toastify";
import Register from "./components/Register";
import 'react-toastify/dist/ReactToastify.min.css';
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";


function App() {
  return (
     <BrowserRouter>
    <ToastContainer />
     <Routes>
      <Route path='/dashboard' element ={<Dashboard />}></Route>
      <Route path='/' element={<Register/>}></Route>
      <Route path='/admin-login' element={<AdminLogin />}></Route>

     </Routes>
     </BrowserRouter>
  );
}

export default App;
