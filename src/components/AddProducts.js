// import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useForm, Controller } from 'react-hook-form';

const AddProducts = ({ sendDataToParent }) => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
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
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: 'Category is required' }}
                  render={({ field }) => (
                    <select {...field} className={`status-hw form-control ${errors.category ? 'is-invalid' : ''}`}>
                      <option value="milks">Milks</option>
                      <option value="fruits">Fruits</option>
                    </select>
                  )}
                />
                {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
              </div>
              <div className="col-md-4">
                <label>Product Name</label>
                <Controller
                  name="productName"
                  control={control}
                  rules={{ required: 'Product Name is required' }}
                  render={({ field }) => <input {...field} type="text" className={`form-control ${errors.productName ? 'is-invalid' : ''}`} />}
                />
                {errors.productName && <div className="invalid-feedback">{errors.productName.message}</div>}
              </div>
              <div className="col-md-4">
                <label>Pack Size</label>
                <Controller
                  name="packSize"
                  control={control}
                  rules={{ required: 'Pack Size is required' }}
                  render={({ field }) => <input {...field} type="text" className={`form-control ${errors.packSize ? 'is-invalid' : ''}`} />}
                />
                {errors.packSize && <div className="invalid-feedback">{errors.packSize.message}</div>}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label>MRP</label>
                <Controller
                  name="mrp"
                  control={control}
                  rules={{ required: 'MRP is required' }}
                  render={({ field }) => <input {...field} type="text" className={`form-control ${errors.mrp ? 'is-invalid' : ''}`} />}
                />
                {errors.mrp && <div className="invalid-feedback">{errors.mrp.message}</div>}
              </div>
              <div className="col-md-4">
                <label>Status</label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: 'Status is required' }}
                  render={({ field }) => (
                    <select {...field} className="status-hw form-control">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  )}
                />
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
