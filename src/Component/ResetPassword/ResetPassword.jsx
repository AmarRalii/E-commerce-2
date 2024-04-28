import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPassword() {
  let navigate=useNavigate()
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("email is invalid"),
    newPassword: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,7}$/),
  });

  async function ResetPassword(values) {
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      values
    );
    console.log(data);
    if(data.token){
      navigate('/')
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: ResetPassword,
  });

  return (
    <div className="container">
      <h3 className="py-5">Reset Password</h3>
      <form onSubmit={formik.handleSubmit} className="w-75 mx-auto">
        <label htmlFor="email" className="my-3">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control "
        />
        <label htmlFor="newPassword" className="my-3">
          New-Password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control "
        />
        <button className="btn  btn-brdr ms-auto d-inline p-2 my-3"> Reset Password</button>
      </form>
    </div>
  );
}
