import React, { useState } from 'react'
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import AddProducts from "./AddProducts";

const ReadProducts = () => {

  const [addNew, setAddNewProducts] = useState(false)

  const handleClick = () => {
    setAddNewProducts(true);
  }

  const sendDataToParent = (e) => {
    console.log(e);
    setAddNewProducts(false);
  };

  return (
    <>
      {!addNew ?
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <span className="ctgr-icon" ><BiCategoryAlt /></span>
              <span className="read-ctry">Category</span>
            </div>
            <div className="col-md-7 input-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
              <span className="search-icon" ><IoIosSearch /></span>
            </div>
            <div className="col-md-2">
              <button className="addNew-btn" onClick={() => handleClick()}>Add New</button>
            </div>
          </div>
          <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <FiEdit /> &nbsp;&nbsp;&nbsp;
              <RiDeleteBinLine />
            </td>
          </tr>
        </tbody>
      </table>
        </div> : <AddProducts sendDataToParent={sendDataToParent} />}
      

    </>
  )
}

export default ReadProducts

