import React from 'react'
import { Button,Checkbox,FormControlLabel,TextField, Typography } from '@mui/material'
import './style.css'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import PageTitle from './PageTitle';
const Register = () => {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const onSubmit = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.psw
    };
    try {
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have been registered successfully.'
        });
      }else if(response.status==400){
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'User Already register with this email!!'
        });
      }
       else {
        throw new Error('Registration failed.');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'An error occurred while registering. Please try again. '+ error.message
      });
      console.error('Error:', error);
    }
  };
  return (
    <>
      <PageTitle title="Register Page" />
      <div className="Auth">
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h4'>Sign Up</Typography>
        
        <div className="formgroup">
        
        <TextField 
        {...register('name',{required:"Name Field Required",
        maxLength:{value:15,message:'Maximun 15 Characters'}})} 
        type='text' label="Name" color="success" variant="outlined" />
        <Typography color="error" variant='span'>{errors?.name && errors.name.message}</Typography>

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
        <Button type='submit' variant="contained">Create Account</Button>
        <p className='link' >Have an account ? <Link to="/"> Login </Link></p>
        </div>
      </form>
    
    </div>
    </>
  )
}

export default Register