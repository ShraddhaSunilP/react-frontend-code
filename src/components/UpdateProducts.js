import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { ProductsApiUrls } from '../api/ProductsApiUrls';
import { useLocation } from "react-router-dom";
 
const UpdateProducts = () => {
    const {state} = useLocation();
    
  // for validation
  const { handleSubmit, register, setValue, formState: { errors }} = useForm();

    // pre-fill form fields with state data
    useEffect(()=>{
        if(state){
            Object.keys(state).forEach((key)=>{
                setValue(key, state[key]);
            });
        }
    },[state, setValue]);


    const onSubmit = async(data) => {
      try{
        const id = state.id;
        const response = await ProductsApiUrls.update(id, data);
        console.log(data);
        if(response.result){
            console.log("data updated successfully");
            alert("data updated");
        }
        else {
            console.log("Failed to updated");
        }
    }catch(error){
        console.log("Error occurred while submitting the form: ", error); 
      }

    }
    return (
    <>
      <div className="row">
        <div>
          <span className="back-arrow"><IoIosArrowRoundBack /></span>
          <span className="add-category">Add Product</span>
        </div>
      </div>
      <div className="row container-fluid">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <label>Category</label>
                <select {...register('category', { required: 'Category is required' })} className={`status-hw form-control ${errors.category ? 'is-invalid' : ''}`} >
                  <option value="">Select category</option>
                  <option value="milks">Milks</option>
                  <option value="fruits">Fruits</option>
                </select>
                {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
              </div>
              <div className="col-md-4">
                <label>Product Name</label>
                <input {...register('productName', { required: 'Product Name is required' })} type="text" className={`form-control ${errors.productName ? 'is-invalid' : ''}`} />
                {errors.productName && <div className="invalid-feedback">{errors.productName.message}</div>}
              </div>
              <div className="col-md-4">
                <label>Pack Size</label>
                <input {...register('packSize', { required: 'Pack Size is required' })} type="text" className={`form-control ${errors.packSize ? 'is-invalid' : ''}`} />
                {errors.packSize && <div className="invalid-feedback">{errors.packSize.message}</div>}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label>MRP</label>
                <input {...register('mrp', { required: 'MRP is required' })} type="text" className={`form-control ${errors.mrp ? 'is-invalid' : ''}`} />
                {errors.mrp && <div className="invalid-feedback">{errors.mrp.message}</div>}
              </div>
              <div className="col-md-4">
                <label>Status</label>
                <select {...register('status', { required: 'Status is required' })} className="status-hw form-control" >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
              </div>
            </div>
          </div>
          <div className="col-md-12 btn-end prod-flex-container">
            <span><button type="button" className="cancel-category">Cancel</button></span>
            &nbsp;&nbsp;
            <span><button type="submit" className="save-category">Save</button></span>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProducts;

