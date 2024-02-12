import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { CategoryApiUrls } from '../api/CategoryApiUrls';

const AddCategory = ({sendDataToParent}) => {
  
  const { handleSubmit, register, formState: { errors } } = useForm();
 

  const onSubmit = async (data) => {
    try {
      if (data.status !== 'active' && data.status !== 'inactive') {
        console.error('Invalid status provided. Status must be "active" or "inactive".');
        return;
      }
      // api call for post method 
      const response = await CategoryApiUrls.create(data);
      //console.log(data);
      console.log('Response data:', response);

      if (response.result) {
        console.log("submitted !!!");
      } else {
        console.log("submitted failed !!!");
      }
    } catch (error) {
      console.error('Error occurred while submitting the form:', error);
    }
  };

  return (
    <>
      <div className="row">
        <div>
          <span className="back-arrow" onClick={sendDataToParent}><IoIosArrowRoundBack /></span>
          <span className="add-category">Add Category</span>
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
                className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
              />
              {errors.categoryName && <div className="invalid-feedback">{errors.categoryName.message}</div>}
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
                className="status-hw form-control"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
            </div>
            <div className="col-md-12 btn-end flex-container">
              <span><button type="button" className="cancel-category" onClick={sendDataToParent}>Cancel</button></span>
              &nbsp;&nbsp;
              <span><button type="submit" className="save-category">Save</button></span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
