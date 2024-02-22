import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const ForgetPassPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle the form submission here
    console.log(data);
  };

  return (
    <div className="container">
      <div className="forgetpass-outerBox">
        <div className="row forgrtpass">
          <p>Did you forget your password?</p>
        </div>
        <div className="row enterEmailAddress-color">
          <p>Enter your email address and we'll send you a link to restore password</p>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <form className="form-m-top" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  {...register('password', {
                    required: 'Password is required'
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary updatepass-btn">Update</button>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row text-center">
          <Link to="/" className="backtologin-tc">Back to log in?</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassPage;
