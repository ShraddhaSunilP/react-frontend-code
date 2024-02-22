import React, { useState, useEffect, } from 'react'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import AddCategory from "./AddCategory";
import { CategoryApiUrls } from '../api/CategoryApiUrls';
 

const ReadCategoey = () => {
 
  const [categoryData, setCategoryData] = useState([]); // save the (result) in categoryData 
  const [addNew, setAddNewCategory] = useState(false)
  const [editCategory, setEditCategory] = useState(null);
  const [searchInputCategory, setSearchInputCategory] = useState(""); 

  
  const fetchData = async (data) => {  // Getall api
    const response = await CategoryApiUrls.getall(data);
    console.log(data);
    if (response.result) {  //update the state with the fetched data 
      setCategoryData(response.result.data);
    } else {
      console.log("Error fetching data: ", response.result);
    }
  };

  const handleClick = () => {
    setAddNewCategory(true);
    setEditCategory(null);
  }


  const sendDataToParent = (e) => {  // for condition base toggle component 
    setAddNewCategory(false);
    fetchData();
  };

  
  const handleEditCategory = (category) => { // for edit data
    setAddNewCategory(true);
    setEditCategory(category);  // state variable to hold the product being edited
  }
 
  useEffect(() => {
    fetchData();   // Call the api when the component mount
  }, []);

  
  const handleDelete = async (category) => {  // Delete api
    alertify.confirm(
      'Confirmation',
      'Are you sure you want to delete?',
      async function () {
        const response = await CategoryApiUrls.delete(category.id);
        if (response.result) {
          console.log('Deleted Successfully');
          fetchData();
        } else {
          console.log('Error deleting category: ', response.result);
        }
      },
      function () {}
    );
  };

  // filter categoryData based on searchInput
  const filteredcategoryData = categoryData.filter(category =>
    category.name.toLowerCase().includes(searchInputCategory.toLowerCase())
  );

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
                value={searchInputCategory}
                onChange={(e) => setSearchInputCategory(e.target.value)}
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
              {Array.isArray(filteredcategoryData) && filteredcategoryData.map((category) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.status}</td>
                  <td>
                    <span onClick={() => handleEditCategory(category)}><FiEdit /></span> &nbsp;&nbsp;&nbsp;
                    <span onClick={() => handleDelete(category)}><RiDeleteBinLine /></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> : <AddCategory sendDataToParent={sendDataToParent} category={editCategory} />} 
    </>
  ) 
}


export default ReadCategoey
