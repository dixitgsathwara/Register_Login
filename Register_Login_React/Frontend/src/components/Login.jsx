import React from 'react'
import { Button,Checkbox,FormControlLabel,TextField, Typography } from '@mui/material'
import './style.css'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import PageTitle from './PageTitle';
const Login = () => {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.psw
    };
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have been Login successfully.'
        });
      }
      else {
        throw new Error('Email or Password incorrect');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message
      });
      console.error('Error:', error);
    }
  };
  return (
    <>
    <PageTitle title="Login Page" />

    <div className="Auth" style={{height:470}}>
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h4'>Sign in</Typography>
        <div className="formgroup">
        
        <TextField 
        {...register('email',{required:"Email Field Required"})} 
        type='email' label="Email" color="success" variant="outlined" />
        <Typography color="error" variant='span'>{errors?.email && errors.email.message}</Typography>
       
        <TextField 
        {...register('psw',{required:"Password Field Required",
        maxLength:{value:15,message:"Maximun 15 Characters"},
        minLength:{value:6,message:"Minimun 6 Characters"}})} 
        type='password' label="Password" color="success" variant="outlined" />
        <Typography color="error" variant='span'>{errors?.psw && errors.psw.message}</Typography>

        <FormControlLabel control={<Checkbox color="success"/>} label="Remember Me" />
        <Button type='submit' variant="contained">Login</Button>
        <p className='link'>Don't have an account ? <Link to="/register"> Register </Link></p>
        </div>
      </form>
    
    </div>
    </>
  )
}

export default Login