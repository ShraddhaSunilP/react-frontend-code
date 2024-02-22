import React from 'react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { UserApiUrls } from '../api/UserApiUrls';

const LoginPage = () => {
    const { handleSubmit, control, formState: { errors } } = useForm();

    const goToHomePage = useNavigate();

    const onSubmit = async (data) => {
        try {
            const {result} = await UserApiUrls.login(data);
            console.log("Response Data:", result);
        
            if(result.status === 200){
                goToHomePage("/home");  // redirect to home page

            } else {
              alertify.set('notifier', 'position', 'top-center');
                alertify.error('Login Failed.');
                
            }
        } catch (error) {
            console.error("Email or Password not found");
            alert("Email or Password not found");
        } 
    }

    return (
        <>
            <div className="container-fluid background-img">
                <div className="row">
                    <div className="col-md-6">
                        <div className="login-outerBox">
                            <div className="row">
                                <div className="2"></div>
                                <div className="10">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <img src="/Images/D_image.jpg" alt="d_image" className="h-w-img" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3"></div>
                                        <div className="col-2">
                                            <p className="mp-digital">digital</p>
                                        </div>
                                        <div className="col-4">
                                            <p className="mp-flake">flake</p>
                                        </div>

                                        <div className="col-3"></div>
                                    </div>
                                    <div className="row text-center">
                                        <p className="h-c-text">Welcome to Digitalflake Admin</p>
                                    </div>
                                </div>
                                <div className="2"></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <form className="margin-form" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <Controller
                                                name="email"
                                                control={control}
                                                rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        type="email"
                                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                    />
                                                )}
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <Controller
                                                name="password"
                                                control={control}
                                                rules={{ required: 'Password is required' }}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        type="password"
                                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                    />
                                                )}
                                            />
                                            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-7"></div>
                                            <div className="col-md-5">
                                                <Link to="/forgotpass" className="link-no-underline">Forgot Password ?</Link>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-hw">Log In</button>
                                        <div className="row text-center">
                                            <Link to="/user">SignUp</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
