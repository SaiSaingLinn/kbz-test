import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/button';
import colors from '../../components/colors';
import { MdOutlineEmail, MdOutlineLock } from 'react-icons/md';

const AuthWrapper = {
  backgroundColor: '#FFF',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '100px 50px',
  textAlign: 'center',
  borderRadius: '0.375rem',
}

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  // form validation schema
  const validationSchema = yup.object().shape({
    email: yup.string()
      .max(25, 'Too Long!')
      .required('Please enter your name'),
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Please enter your password'),
  });

  // formik hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitLogin(values);
    },
  });

  // async function submit form 
  const submitLogin = async (values) => {
    setLoading(true);
  }

  return (
    <section style={{background: colors.primary, width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={AuthWrapper}>
          <h1>Signin</h1>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <p style={{paddingRight: '5px'}}>Don't have an account?</p>
            <Link to="/register">
              <span>Register here</span>
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
            <div className={`input-group ${formik.touched.email && Boolean(formik.errors.email) ? 'error' : ''}`}>
              <span className='input-group-icon'><MdOutlineEmail /></span>
              <input
                className={`form-control ${formik.touched.email && Boolean(formik.errors.email) ? 'error' : ''}`}
                id="email"
                type="text"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email Address"
              />
              {
                formik.touched.email && formik.errors.email && (
                  <span id="name-error-text">{formik.errors.email}</span>
                )
              }
            </div>
            <div className={`input-group ${formik.touched.password && Boolean(formik.errors.password) ? 'error' : ''}`}>
              <span className='input-group-icon'><MdOutlineLock /></span>
              <input
                id="password"
                type="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className={`form-control ${formik.touched.email && Boolean(formik.errors.email) ? 'error' : ''}`}
                placeholder="Password"
              />
              {
                formik.touched.password && formik.errors.password && (
                  <span id="password-error-text">{formik.errors.password}</span>
                )
              }
            </div>
            <div>
              <Button color="primary" type="submit">Signin</Button>
              {
                error && (
                  <p>Something was wrong, please try again!</p>
                )
              }
            </div>
          </form>
        
      </div>
    </section>
  );
};