import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Add new user to array
    existingUsers.push(data);

    // Save updated user list to localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert("Registration Successful");

    // Redirect to Sign In
    navigate('/signin');
  };

  return (
     <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
 <div className="gender-group">
          <span>Gender:</span>
          <label>
            <input type="radio" value="Male" {...register("gender", { required: true })} /> Male
          </label>
          <label>
            <input type="radio" value="Female" {...register("gender", { required: true })} /> Female
          </label>
          {errors.gender && <p className="error">Gender is required</p>}
        </div>

        <div className="preference-group">
          <label>Select Preference:</label>
          <select {...register("preference", { required: true })}>
            <option value="">--Select--</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Milk">Milk</option>
            <option value="Chocolate">Chocolate</option>
          </select>
          {errors.preference && <p className="error">Preference is required</p>}
        </div>

        <button type="submit">Sign Up</button>
      </form>
       <p>
        Already have an account? <Link to="/Signing">Sign In</Link>
      </p>
    </div>


  )
}

export default SignUp;