import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './store';

function Signing() {
   const { register, handleSubmit } =useForm();
   const dispatch=useDispatch();
  const navigate = useNavigate();

  const myfunc = (data) => {
    dispatch(loginUser(data));
    navigate("/home");
  }
  return(
    <>
    <h2>User Sign In</h2>
    <form onSubmit={handleSubmit(myfunc)}>
      <input type='text' placeholder='userName'{...register("userName")}/>
      <input type='password' placeholder='password'{...register("password")}/>
      <button type='submit'>Sign In</button>
    </form>
    <p>
      New User?<a href='/signup'>Sign Up</a>
    </p>
    </>
  ) 
}
export default Signing;