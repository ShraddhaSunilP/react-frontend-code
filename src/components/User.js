import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {Link} from "react-router-dom";


function User() {
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            name: '', 
            email: '',
            password: '',
        },
    });
    
    const onSubmit = async (data) => {
        console.log(data);
    };

    return (
        <>
            <div className="container">
                <div className="col-md-3"></div>
                <div className="col-md-6 user-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => <input {...field} type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Enter name" />}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
                                render={({ field }) => <input {...field} type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Enter email" />}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: 'Password is required' }}
                                render={({ field }) => <input {...field} type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" />}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <div className="text-center"> 
                            <Link to ="/login">Log In</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </>
    );
}

export default User;
