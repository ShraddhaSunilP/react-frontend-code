import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useForm, Controller } from 'react-hook-form';

const AddCategory = ({ sendDataToParent }) => {
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
          <span className="add-category">Add Category</span>
        </div>
      </div>
      <div className="row container-fluid">
        <form onSubmit={handleSubmit(onSubmit)} className="col-md-12">
          <div className="row">
          <div className="form-group col-md-4">
            <label>Category Name</label>
            <Controller
              name="categoryName"
              control={control}
              rules={{ required: 'Category Name is required' }}
              render={({ field }) => (
                <>
                  <input {...field} type="text" className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`} />
                  {errors.categoryName && <div className="invalid-feedback">{errors.categoryName.message}</div>}
                </>
              )}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Description</label>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <>
                  <input {...field} type="text" className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                  {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                </>
              )}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Status</label>
            <Controller
              name="status"
              control={control}
              rules={{ required: 'Status is required' }}
              render={({ field }) => (
                <>
                  <select {...field} className="status-hw form-control">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </>
              )}
            />
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
