import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Loading from './../Loading';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';


export default function Register() {

  let [loading, setLoading] = useState(false)
  let [msg, setMsg] = useState('')
  let navigate = useNavigate()


  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let validationSchema =Yup.object({
    name: Yup.string().min(3,'name is too short').max(10,"the maximam lenght is 10").required('name is required'),
    email: Yup.string().email('email is invalid').required('email is required'),
    phone: Yup.string().matches(phoneRegExp,"phone dont match").required('phone is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'invalid password').required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'repassword must match with password').required('repassword is required')

  })

  async function submitData(values){
    try{
      setLoading(true)
       let { data } =await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
      if (data.message === 'success'){
        setLoading(false)
        setMsg('')
        navigate('/login')
      }
    }
    catch(error){
      setMsg(error.response.data.message)
      setLoading(false)
    }
   
  }

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      password:'',
      rePassword:''
    },validationSchema,
    onSubmit:submitData
  })

  return <>
  <div className="container">
  {loading && <Loading></Loading>}
  <h2 className='pt-2'>Register Now</h2>
  <form onSubmit={formik.handleSubmit} className='w-75 mx-auto py-5 '>
  {msg ? <p className='alert alert-danger'>{msg}</p> : ''}
  <label htmlFor="name">Name :</label>
  <input className='form-control my-2' name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" />
  {formik.errors.name && formik.touched.name?<p className='alert alert-danger mt-2 p-2'>{formik.errors.name}</p>:''}

  <label htmlFor="email">email :</label>
  <input className='form-control my-2' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" />
  {formik.errors.email && formik.touched.email?<p className='alert alert-danger mt-2 p-2'>{formik.errors.email}</p>:''}

  <label htmlFor="phone">phone :</label>
  <input className='form-control my-2' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" />
  {formik.errors.phone && formik.touched.phone?<p className='alert alert-danger mt-2 p-2'>{formik.errors.phone}</p>:''}


  <label htmlFor="password">password :</label>
  <input className='form-control my-2' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" />
  {formik.errors.password && formik.touched.password?<p className='alert alert-danger mt-2 p-2'>{formik.errors.password}</p>:''}

  <label htmlFor="rePassword">rePassword :</label>
  <input className='form-control my-2' name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" />
  {formik.errors.rePassword && formik.touched.rePassword?<p className='alert alert-danger mt-2 p-2'>{formik.errors.rePassword}</p>:''}


  <button className='btn bg-main text-white p-2 mt-2' type='submit' disabled={!formik.isValid && formik.dirty}>
    {
      loading ?  <ThreeDots
      visible={true}
      height="20"
      width="40"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      /> : 'Register'
    }
    </button>
  </form> 
  </div>
  </>
}
