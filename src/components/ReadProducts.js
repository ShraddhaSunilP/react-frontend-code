import React, { useState, useEffect } from 'react'
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ProductsApiUrls } from "../api/ProductsApiUrls";
import AddProducts from "./AddProducts";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const ReadProducts = () => {

  
  const [addNew, setAddNewProducts] = useState(false)  // state for rendering conditional based component
  const [productData, setProductData] = useState([]);  // state for storing api response
  const [editProduct, setEditProduct] = useState();    // state for storing edit product 
  const [searchInput, setSearchInput] = useState("");  // state for search functionality
  
  
  const fetchData = async (data) => {  // api calling for getall data in table
    const response = await ProductsApiUrls.getall(data);
    console.log(data);
    if (response.result) {  // check if the API call was successfull
       setProductData(response.result.data);  //update the state with the fetched data
    } else {
      console.log("Error fetching data: ", response.result);  // Handle the error, you can log it or show message to the user
    }
  }

  
  useEffect(() => {
    fetchData();  // Call the api when the component mount
  }, []);


  const handleClick = () => {    // func for add new products
    setAddNewProducts(true);
    setEditProduct(null);
  };

  const sendDataToParent = (e) => {
    setAddNewProducts(false);
    fetchData();
  };

  const handleEditProduct = (product) => {
    setAddNewProducts(true);
    setEditProduct(product);  // state variable to hold the product being edited
  }

 
  const handleDeleteProduct = async (product) => {   //function for delete 
    console.log(product);  //check data is coming or not

    alertify.confirm(
      'Confirmation',
      'Are you sure you want to delete?',
      async function () {
        const response = await ProductsApiUrls.delete(product.id);   // Call the delete API
        if(response.result) { 
          console.log("deleted successfully.");  //If deletion is successfull, fetch update data
          fetchData();
        } else {
          console.log('Error deleting category: ', response.result);
        }
      },
      function () {
      }
    );
  };
 
  // filter productData based on searchInput
  const filteredproductData = productData.filter(product =>
    product.productName.toLowerCase().includes(searchInput.toLowerCase())
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
                value={searchInput}
                onChange= {(e)=> setSearchInput(e.target.value)}
              />
              <span className="search-icon" ><IoIosSearch /></span>
            </div>
            <div className="col-md-2">
              <button className="addNew-btn" onClick={()=>handleClick()}>Add New</button>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Category</th>
                <th scope="col">ProductName</th>
                <th scope="col">PackSize</th>
                <th scope="col">Mrp</th>
                <th scope="col">PackSize</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredproductData) && filteredproductData.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.category}</td>
                  <td>{product.productName}</td>
                  <td>{product.packSize}</td>
                  <td>{product.mrp}</td>
                  <td>{product.status}</td>
                  <td>

                    <span onClick={() => handleEditProduct(product)} ><FiEdit /></span> &nbsp;&nbsp;&nbsp;
                    <span onClick={() => handleDeleteProduct(product)}><RiDeleteBinLine /></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> : <AddProducts sendDataToParent={sendDataToParent} product={editProduct}/>}
      </>
  )
}

export default ReadProducts