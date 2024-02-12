import React, { useState, useEffect } from 'react'
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ProductsApiUrls } from "../api/ProductsApiUrls";
import AddProducts from "./AddProducts";
// import { useNavigate } from "react-router-dom";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';



const ReadProducts = () => {

  // stat for rendering conditional based component  
  const [addNew, setAddNewProducts] = useState(false)
  // state for storing api response
  const [productData, setProductData] = useState([]);
  const [editProduct, setEditProduct] = useState();
  
  // const history = useNavigate();

  // api calling for getall data in table
  const fetchData = async (data) => {
    const response = await ProductsApiUrls.getall(data);
    console.log(data);
    // check if the API call was successfull
    if (response.result) {
        //update the state with the fetched data 
      setProductData(response.result.data);
    } else {
      // Handle the error, you can log it or show message to the user
      console.log("Error fetching data: ", response.result);
    }
  }

  useEffect(() => {
    // Call the api when the component mount
    fetchData();
  }, []);

  // func for add new products
  const handleClick = () => {
    setAddNewProducts(true);
    setEditProduct(null);
  };

  //function for edit 
  // const handleEditProduct = (product) => {
  //   history("/updateproducts", {state: product});
  // };

  const handleEditProduct = (product) => {
    setAddNewProducts(true);
    setEditProduct(product);  // state variable to hold the product being edited
  }
  

  const sendDataToParent = (e) => {
    console.log(e);
    setAddNewProducts(false);
    fetchData();

  };

//function for delete 
  const handleDeleteProduct = async (product) => {
    //check data is coming or not
    console.log(product);
  // Call the delete API
    const response = await ProductsApiUrls.delete(product.id);
      if(response.result) { 
        //If deletion is successfull, fetch update data
        console.log("deleted successfully.");

        //alertify for confirmation to delete 
      alertify.set('notifier', 'position', 'top-center');
      alertify.confirm('Confirmation', 'Are you sure you want to delete?',
        function () {
        }
        , function () {
        });
        fetchData();
      } else {
      console.log("Error deleting product: ", response.result)
    }
  };
 
  return (
    <>
      {!addNew ? // "!" means false becomes true and true becomes false 
                 //just consider "addNew=false" when i write "!addNew" addnew becomes "true" 
                 //here we use ternery operator Ex: {condiiton ? true : false}                     
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
              {productData.map((product) => (
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