import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loading from './../Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { UserContext } from '../Conext/UserContext';
import Helmet from'react-helmet'

export default function Login() {
  const { setUserToken } = useContext(UserContext); // Consume UserContext
  const [loading, setLoading] = useState(false);
  const [Msg, setMsg] = useState('');
  const navigate = useNavigate();

  async function submitData(values) {
    try {
      setLoading(true);
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      if (data.message === 'success') {
        setUserToken(data.token);
        localStorage.setItem('userToken', data.token);
        setLoading(false);
        navigate('/');
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('email is invalid').required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'invalid password').required('password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: submitData,
  });

  return (
    <div className='container'>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      {loading && <Loading />}
      <form onSubmit={formik.handleSubmit} className='w-75 mx-auto py-5'>
        {Msg ? <p className='alert alert-danger'>{Msg}</p> : ''}
        <h2 className='pt-2 mb-5'>Login Now</h2>
        <label htmlFor='email'>email :</label>
        <input
          className='form-control my-2'
          name='email'
          id='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type='email'
        />
        {formik.errors.email && formik.touched.email ? (
          <div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div>
        ) : (
          ''
        )}

        <label htmlFor='password'>password :</label>
        <input
          className='form-control my-2'
          name='password'
          id='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type='password'
        />
        {formik.errors.password && formik.touched.password ? (
          <div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div>
        ) : (
          ''
        )}

        <Link to={'forgetPassword'} className='text-main text-decoration-none'>
          Forget Password
        </Link>

        <button className='btn bg-main text-white p-2 mt-2 ms-auto d-block' type='submit' disabled={!formik.isValid && formik.dirty}>
          {loading ? (
            <ThreeDots
              visible={true}
              height='20'
              width='40'
              color='#4fa94d'
              radius='9'
              ariaLabel='three-dots-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
}
