import React, { useState, useEffect, } from 'react'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import AddCategory from "./AddCategory";
import { CategoryApiUrls } from '../api/CategoryApiUrls';
import { useNavigate } from "react-router-dom";
 

const ReadCategoey = () => {

  // save the (result) in categoryData 
  const [categoryData, setCategoryData] = useState([]);
  const [addNew, setAddNewCategory] = useState(false)
  // const [editCategory, setEditCategory] = useState(null);

  const goToUpdateCategory = useNavigate();

  // Getall api
  const fetchData = async (data) => {
    const response = await CategoryApiUrls.getall(data);
    console.log(data);

    // check if the API call was successfull
    if (response.result) {
      //update the state with the fetched data 
      setCategoryData(response.result.data);
    } else {
      // Handle the error, you can log it or show message to the user
      console.log("Error fetching data: ", response.result);
    }
  }

  const handleClick = () => {
    setAddNewCategory(true);
  }

  // for condition base toggle component 
  const sendDataToParent = (e) => {
    console.log(e);
    setAddNewCategory(false);
  };

  // for edit data
  const handleEdit = (category) => {
    // check data is coming or not 
    console.log(category);
    goToUpdateCategory("/updatecategory", { state : category });

  }
  // for handle the side effect in component(if state or value changes useEffect is use to re-render the component all time)
  useEffect(() => {
    // Call the api when the component mount
    fetchData();
  }, []);

  
  // Delete api
  const handleDelete = async (category) => {
    console.log(category);
    // call delete api
    const response = await CategoryApiUrls.delete(category.id)
    if (response.result) {
      //If deletion is successfull, fetch update data
      console.log("Deleted Successfully");
      
      //alertify for confirmation to delete 
      alertify.set('notifier', 'position', 'top-center');
      alertify.confirm('Confirmation', 'Are you sure you want to delete?',
        function () {
        }
        , function () {
        });
      fetchData();
    } else {
      console.log("Error deleting category: ", response.result)
    }
  };

  return (
    <>
      {!addNew ? // when we click on AddNew btn that time addNew will be true  !addNew(true) means AddNew(false) thats why it render the addCategory component
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
              {categoryData.map((category) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.status}</td>
                  <td>
                    <span onClick={() => handleEdit(category)}><FiEdit /></span> &nbsp;&nbsp;&nbsp;
                    <span onClick={() => handleDelete(category)}><RiDeleteBinLine /></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> : <AddCategory sendDataToParent={sendDataToParent} />} 
              {/*call <AddCategory /> when condition is false */}
    </>
  ) 
}


export default ReadCategoey
