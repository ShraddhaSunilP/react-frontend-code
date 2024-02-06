import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { ProductsApiUrls } from '../api/ProductsApiUrls';


const AddProducts = ({ sendDataToParent }) => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const goToReadProducts = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await ProductsApiUrls.create(data);
      console.log("Response Data: ", result);

      if (result.status === 200) {
        goToReadProducts('/readproducts'); 
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
          <span className="add-category">Add Product</span>
        </div>
      </div>
      <div className="row container-fluid">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <label>Category</label>
                <select {...register('category', { required: 'Category is required' })} className={`status-hw form-control ${errors.category ? 'is-invalid' : ''}`}>
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
                <select {...register('status', { required: 'Status is required' })} className="status-hw form-control">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
              </div>
            </div>
          </div>
          <div className="col-md-12 btn-end prod-flex-container">
            <span><button type="button" className="cancel-category" onClick={sendDataToParent}>Cancel</button></span>
            &nbsp;&nbsp;
            <span><button type="submit" className="save-category">Save</button></span>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProducts;
