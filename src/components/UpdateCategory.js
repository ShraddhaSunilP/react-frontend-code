import React from "react";
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { CategoryApiUrls } from '../api/CategoryApiUrls';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


const UpdateCategory = (props) => {
    const { state } = useLocation();
    console.log(state); // check data is coming or not

    const { handleSubmit, register, setValue, formState: { errors } } = useForm();

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
            const response = await CategoryApiUrls.update(id, data);
            console.log(data);
            if(response.result){
                console.log("data updated successfully");
                alert("Updated");
            } else {
                console.log("failed to updated");
            }
        }catch(error){
            console.error('Error occurred while submitting the form:', error);
        }
    }


    return (
        <>
            <div className="row">
                <div>
                    <span className="back-arrow"><IoIosArrowRoundBack /></span>
                    <span className="add-category">Edit Category</span>
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
                            <span><button type="button" className="cancel-category">Cancel</button></span>
                            &nbsp;&nbsp;
                            <span><button type="submit" className="save-category">Save</button></span>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default UpdateCategory