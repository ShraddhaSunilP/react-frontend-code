import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from './LoginPage';
import ForgotPassPage from './ForgotPassPage';
import HomePage from './HomePage';
import AddCategory from './AddCategory';
import ReadCategoey from './ReadCategoey';
import AddProducts from './AddProducts';
import ReadProducts from './ReadProducts';
import HomeDetails from './HomeDetails';
import User from './User';

const Dashboard = () => {
  
  // const Navigate = useNavigate();

return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage/>}></Route>
        <Route exact path="/home" element={<HomePage/>}></Route>
        <Route exact path="/user" element={<User/>}></Route>
        <Route exact path="/forgotpass" element={<ForgotPassPage/>}></Route>
        <Route exact path="/addcategory" element={<AddCategory/>}></Route>
        <Route exact path="/readcategory" element={<ReadCategoey/>}></Route>
        <Route exact path="/addproducts" element={<AddProducts/>}></Route>
        <Route exact path="/readproducts" element={<ReadProducts/>}></Route>
        <Route exact path="/homedetails" element={<HomeDetails/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Dashboard