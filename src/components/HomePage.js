import React, { useState } from 'react';
import HomeDetails from './HomeDetails';
import ReadCategory from './ReadCategoey';
import ReadProducts from './ReadProducts';
import { FaRegUserCircle } from "react-icons/fa"; 
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const [loadView, setLoadView] = useState('Home');

  const [showLogoutButton, setShowLogoutButton] = useState(false)

  const GotToLogin = useNavigate();

  const handleUserIconClick = () => {
    setShowLogoutButton(!showLogoutButton); // true (! means != false)
  }

  // alertify for logout confirm box
  const handleLogoutClick = () => {
    alertify.set('notifier', 'position', 'top-center');
    alertify.confirm('Confirmation', 'Are you sure you want to log out?',
      function () {
        GotToLogin("/");
      }
      , function () {

      });
  };

  const handleClick = (e) => {
    setLoadView(e);
    console.log(e);
  }

  return (
    <>
      <div className="container-fluid custom-container-fluid">
        <div className="row b-color">
          <div className="col-md-4">
            <img src="/Images/D_image.jpg" alt="d_image" className="hw-ml-img" />
            <span className="color-digital">digital</span>
            <span className="color-flake">flake</span>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-1">
            <p className="FaRegUserCircle" onClick={handleUserIconClick}><FaRegUserCircle /></p>
          </div>
          <div className="col-md-1">
            {showLogoutButton && (
              <button className="logout-btn" onClick={handleLogoutClick}>Logout</button>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <ul>
              <li className={loadView === "Home" ? "active" : null} onClick={() => { handleClick('Home') }}>Home</li>
              <li className={loadView === "Category" ? "active" : null} onClick={() => { handleClick('Category') }}>Category</li>
              <li className={loadView === "Products" ? "active" : null} onClick={() => { handleClick('Products') }}>Products</li>
            </ul>
          </div>
          <div className="col-md-9">
            {loadView === "Home" && <HomeDetails />}
            {loadView === "Category" && <ReadCategory />}
            {loadView === "Products" && <ReadProducts />}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
