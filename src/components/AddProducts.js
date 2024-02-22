import { IoIosArrowRoundBack } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { ProductsApiUrls } from '../api/ProductsApiUrls';
import { useEffect } from "react";

const AddProducts = ({ sendDataToParent, product }) => {

  const { handleSubmit, register, setValue, formState: { errors }} = useForm();   // for validation

  useEffect(()=>{
    if(product){
      Object.keys(product).forEach((key)=>{
        setValue(key, product[key]);
      });
    } else {
      setValue('category', '');  // If no product is provided, reset all form fields
      setValue('productName', '');
      setValue('packSize', '');
      setValue('mrp', '');
      setValue('status', '');
    }
  },[product, setValue]);

  const onSubmit = async (data) =>{
    try{
      // Check if it's an update or create operation
      if(product){   
        const response = await ProductsApiUrls.update(product.id, data);  //Update API call
        if(response.result){
          console.log("Product updated successfully");
          sendDataToParent();
        } else {
          console.log("Failed to create product");
        }
      } else {
        const response = await ProductsApiUrls.create(data);  //Create API call
        if(response.result){
          console.log("Product created successfully");
          sendDataToParent();
        } else {
          console.log("Failed to create product");
        }
      }
    } catch(error){
      console.log("Error occurred while subbmitting the form",error);
    }
  }
  
  return (
    <>
      <div className="row">
        <div>
          <span className="back-arrow" onClick={(e) => { e.preventDefault(); sendDataToParent();}}><IoIosArrowRoundBack /></span>
          <span className="add-category">{product ? 'Update Product' : 'Add Product'}</span>
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
                <select {...register('status', { required: 'Status is required' })} className={`status-hw form-control ${errors.status ? 'is-invalid' : ''}`} >
                  <option value="">Select Status</option>
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
            <span><button type="submit" className="save-category">{product ? 'Update' : 'Save'}</button></span>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProducts;
