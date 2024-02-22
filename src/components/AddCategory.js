import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { CategoryApiUrls } from '../api/CategoryApiUrls';
import { useEffect } from "react";

const AddCategory = ({sendDataToParent, category}) => {
  
  const { handleSubmit, register, setValue, formState: { errors } } = useForm();

  useEffect(()=>{
    if(category){
      Object.keys(category).forEach((key)=>{
        setValue(key, category[key]);
      });
    } else{
      setValue('name','');
      setValue('description','');
      setValue('status','');
    }
  }, [category, setValue])
 
  const onSubmit = async(data) => {
    try{
      if(category){
        const response = await CategoryApiUrls.update(category.id, data);
        if(response.result){
          console.log("Data Updated Successfully...");
          sendDataToParent();
        } else {
          console.log("Failed to Updated");
        }
      } else {
        const response = await CategoryApiUrls.create(data);
        if(response.result){
          console.log("Created successfully");
          sendDataToParent();
        } else {
          console.log("Failed to create");
        }
      }
    } catch (error){
      console.log("Error occured for dat submitting :", error);
    }
  }

  return (
    <>
      <div className="row">
        <div>
          <span className="back-arrow" onClick={(e)=>{ e.preventDefault(); sendDataToParent()}}><IoIosArrowRoundBack /></span>
          <span className="add-category">{category ? "Update Category" : "Add Category"}</span>
        </div>
      </div>
      <div className="row container-fluid">
        <form onSubmit={handleSubmit(onSubmit)} className="col-md-12">
          <div className="row">
            <div className="form-group col-md-4">
              <label>Category Name</label>
              <input
                {...register('name', { required: 'Category Name is required' })}
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>
            <div className="form-group col-md-4">
              <label>Description</label>
              <input
                {...register('description', { required: 'Description is required' })}
                type="text"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              />
              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </div>
            <div className="form-group col-md-4">
              <label>Status</label>
              <select
                {...register('status', { required: 'Status is required' })}
                className={`status-hw form-control ${errors.status ? 'is-invalid' : ''}`}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
            </div>
            <div className="col-md-12 btn-end flex-container">
              <span><button type="button" className="cancel-category" onClick={sendDataToParent}>Cancel</button></span>
              &nbsp;&nbsp;
              <span><button type="submit" className="save-category">{category ? "Update Category" : "Add Category"}</button></span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
