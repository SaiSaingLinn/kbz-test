import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import colors from '../../components/colors';
import { MdOutlineEmail, MdOutlineLock } from 'react-icons/md';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authStore } from '../../services';
import { home } from '../../store/action';
import './login.css';

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  // if user already login go to home page
  useEffect(() => {
    const authData = authStore.getAuth();
    authData && history.push('/')
  }, [history])
  

  // form validation schema
  const validationSchema = yup.object().shape({
    email: yup.string().email()
      .required('Please enter your email'),
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

  // login submit form 
  const submitLogin = async (values) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      dispatch(home.setLoginStore('SET_LOGIN', user))
      setError(false);
      history.push('/')
    })
    .catch((error) => {
      setError(true);
      console.log('error', error)
    });
    setLoading(false);
  }

  return (
    <section style={{background: colors.primary, width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className='auth-wrapper'>
          <h1>Signin</h1>
          <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
            <div className={`input-group login-input-group ${formik.touched.email && Boolean(formik.errors.email) ? 'error' : ''}`}>
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
              
            </div>
            {
                formik.touched.email && formik.errors.email && (
                  <div className="error-text" style={{marginBottom: '1rem'}}>{formik.errors.email}</div>
                )
              }
            <div className={`input-group login-input-group ${formik.touched.password && Boolean(formik.errors.password) ? 'error' : ''}`}>
              <span className='input-group-icon'><MdOutlineLock /></span>
              <input
                id="password"
                type="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className={`form-control ${formik.touched.password && Boolean(formik.errors.password) ? 'error' : ''}`}
                placeholder="Password"
              />
            </div>
            {
              formik.touched.password && formik.errors.password && (
                <div className="error-text" style={{marginBottom: '1rem'}}>{formik.errors.password}</div>
              )
            }
            <div>
              <button className='primary' type="submit" disabled={loading}>Signin</button>
              {
                error && (
                  <p className='error-text' style={{textAlign: 'center'}}>Invalid Email or Password!</p>
                )
              }
            </div>
          </form>
      </div>
    </section>
  );
};