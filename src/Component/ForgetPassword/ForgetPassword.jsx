import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function ForgetPassword() {

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email('Enter valid Email'),
  });

  async function SendCode(values) {
    let { data } =await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      
      values
    );
    console.log(data);
    if(data?.statusMsg == 'success'){
        document.querySelector('.forgotPassword').classList.add('d-none')
        document.querySelector('.VerifyPassword').classList.remove('d-none')
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: SendCode,
  });


  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Code is required"),
  });
let navigate=useNavigate()
 async function verfiyCode(values) {
    let { data } = await axios.post(
      `https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,
      values
    );
    console.log(data);
    if(data.status == 'Success'){
        navigate('/resetPassword')
    }
  }

  let verfiy = useFormik({
    initialValues: {
        resetCode: "",
    },
    validationSchema:validationSchema2,
    onSubmit: verfiyCode,
  });




  
  return (
    <div className="container">
     <div className="forgotPassword">
      <h3 className="my-4">Forget Password :</h3>
      <br />
      <form onSubmit={formik.handleSubmit} className="w-75 mx-auto my-5">
        <label htmlFor="email" className="pb-3">E-mail :</label>
        <input
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          id="email"
          name="email"
          className="form-control"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="alert alert-danger my-3">{formik.errors.email}</p>
        ) : (
          ""
        )}
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn bg-main my-3 p-2 text-white d-block ms-auto"
        >
          Send Code
        </button>
      </form>
    </div>
     <div className="VerifyPassword d-none">
      <h3 className="my-4">Verify Code :</h3>
      <br />
      <form onSubmit={verfiy.handleSubmit} className="w-75 mx-auto my-5">
        <label htmlFor="resetCode" className="pb-3">Code :</label>
        <input
          type="text"
          onChange={verfiy.handleChange}
          onBlur={verfiy.handleBlur}
          value={verfiy.values.resetCode}
          id="resetCode"
          name="resetCode"
          className="form-control"
        />
        {verfiy.touched.resetCode && verfiy.errors.resetCode ? (
          <p className="alert alert-danger my-3">{verfiy.errors.resetCode}</p>
        ) : (
          ""
        )}
        <button
          type="submit"
          className="btn bg-main my-3 p-2 text-white d-block ms-auto" 
        >
          Verify Code
        </button>
      </form>
    </div>
    </div>
   
  );
}
