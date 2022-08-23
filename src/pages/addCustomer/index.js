import React, { useEffect, useState } from 'react';
import { Field, useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '../../components/appbar'
import Button from '../../components/button'
import Sidebar from '../../components/sidebar'
import colors from '../../components/colors';
import { MdOutlineEmail, MdOutlineLock } from 'react-icons/md';
import { auth, db, storage } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authStore } from '../../services';
import { home } from '../../store/action';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function AddCustomer() {
  const [file, setFile] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  // upload photo
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
            default:
              break;
          }
        },
        (error) => {
          setError(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPhotoURL(downloadURL)
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  // form validation schema
  const validationSchema = yup.object().shape({
    email: yup.string().email()
      .required('Please enter your email'),
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Please enter your password')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "At least 1 Uppercase, 1 Lowercase, and 1 Number"),
    confirmpass: yup.string()
      .oneOf([yup.ref('password'), null], 'Password must match'),
    name: yup.string()
      .required('Name is required')
      .max(9, 'must be between 3 and 9 characters long')
      .min(3, 'must be between 3 and 9 characters long'),
    phone: yup.string()
      .required('Phone is required'),
    dob: yup.string()
      .required('Birthday is required'),
    nrcNumber: yup.string()
      .required('NRC is required')
      .max(6, 'Please add valid NRC number')
      .min(6, 'Please add valid NRC number'),
  });

  // formik hook
  const formik = useFormik({
    initialValues: {
      // photo: photoURL && '',
      email: '',
      password: '',
      confirmpass: '',
      name: '',
      phone: '',
      dob: '',
      nrc1: '1',
      nrc2: 'AHGAYA',
      nrc3: 'N',
      nrcNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitNewCustomer(values);
    },
  });

  // gender change
  const [gender, setGender] = useState("Male")
  const handleGenderChange = e => {
    setGender(e.target.value);
  }

  // new customer submit form 
  const submitNewCustomer = async (values) => {
    photoURL !== "" ? setError(false) : setError(true)
    const mergeNrc = `${values.nrc1}/${values.nrc2}(${values.nrc3})${values.nrcNumber}`;
    setLoading(true);
    try {
      await addDoc(collection(db, "customers"), {
        ...values,
        timeStamp: serverTimestamp(),
        photo: photoURL,
        gender,
        nrc: mergeNrc,
      });
      setError(false)
      history.push('/')
    } catch (err) {
      setError(true)
    }
    setLoading(false);
  }
  return (
    <section>
      <div className="container">
        <div style={{display: 'flex'}}>
          <Sidebar />
          <div className="content" style={{width: '100%', height: '100vh', background: '#EEF1F7'}}>
            <AppBar />
            <div 
              className='content-body' 
              style={{
                boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 4%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 4px 0px',
                backgroundColor: '#FFF',
                margin: 20,
                padding: 20,
              }}
            >
              <div style={{maxWidth: 800, width: '100%', margin: '0 auto'}} className="input-group-customer">
                <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
                  <div className={`input-group ${error ? 'error' : ''}`}>
                    <label htmlFor='photo'>Photo</label>
                    <div className='form-control-wrap'>
                      <input
                        className={`form-control ${error ? 'error' : ''}`}
                        id="photo"
                        type="file"
                        name="photo"
                        accept='image/*'
                        value={formik.values.photo}
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      
                      {
                        error && (
                          <div className="error-text">Photo is required</div>
                        )
                      }
                    </div>
                  </div>
                  <div className={`input-group ${formik.touched.email && Boolean(formik.errors.email) ? 'error' : ''}`}>
                    <label htmlFor='email'>Email</label>
                    <div className='form-control-wrap'>
                      <input
                        className={`form-control ${formik.touched.email && Boolean(formik.errors.email) ? 'error' : ''}`}
                        id="email"
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      {
                        formik.touched.email && formik.errors.email && (
                          <div className="error-text">{formik.errors.email}</div>
                        )
                      }
                    </div>
                  </div>
                  <div className={`input-group ${formik.touched.password && Boolean(formik.errors.password) ? 'error' : ''}`}>
                    <label htmlFor='password'>Password</label>
                    <div className='form-control-wrap'>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className={`form-control ${formik.touched.password && Boolean(formik.errors.password) ? 'error' : ''}`}
                      />
                      {
                        formik.touched.password && formik.errors.password && (
                          <div className="error-text">{formik.errors.password}</div>
                        )
                      }
                    </div>
                  </div>
                  <div className={`input-group ${formik.touched.confirmpass && Boolean(formik.errors.confirmpass) ? 'error' : ''}`}>
                    <label htmlFor='confirmpass'>Confirm Password</label>
                    <div className='form-control-wrap'>
                      <input
                        id="confirmpass"
                        type="password"
                        name="confirmpass"
                        value={formik.values.confirmpass}
                        onChange={formik.handleChange}
                        className={`form-control ${formik.touched.confirmpass && Boolean(formik.errors.confirmpass) ? 'error' : ''}`}
                      />
                      {
                        formik.touched.confirmpass && formik.errors.confirmpass && (
                          <div className="error-text">{formik.errors.confirmpass}</div>
                        )
                      }
                    </div>
                  </div>
                  <div className={`input-group ${formik.touched.name && Boolean(formik.errors.name) ? 'error' : ''}`}>
                    <label htmlFor='name'>Name</label>
                    <div className='form-control-wrap'>
                      <input
                        className={`form-control ${formik.touched.name && Boolean(formik.errors.name) ? 'error' : ''}`}
                        id="name"
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                      {
                        formik.touched.name && formik.errors.name && (
                          <div className="error-text">{formik.errors.name}</div>
                        )
                      }
                    </div>
                  </div>
                  <div className={`input-group ${formik.touched.phone && Boolean(formik.errors.phone) ? 'error' : ''}`}>
                    <label htmlFor='phone'>Phone Number</label>
                    <div className='form-control-wrap'>
                      <input
                        className={`form-control ${formik.touched.phone && Boolean(formik.errors.phone) ? 'error' : ''}`}
                        id="phone"
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      />
                      {
                        formik.touched.phone && formik.errors.phone && (
                          <div className="error-text">{formik.errors.phone}</div>
                        )
                      }
                    </div>
                  </div>
                  <div className={`input-group ${formik.touched.dob && Boolean(formik.errors.dob) ? 'error' : ''}`}>
                    <label htmlFor='dob'>Birthday</label>
                    <div className='form-control-wrap'>
                      <input
                        className={`form-control ${formik.touched.dob && Boolean(formik.errors.dob) ? 'error' : ''}`}
                        id="dob"
                        type="date"
                        name="dob"
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                      />
                      {
                        formik.touched.dob && formik.errors.dob && (
                          <div className="error-text">{formik.errors.dob}</div>
                        )
                      }
                    </div>
                  </div>
                  <div className={`input-group ${formik.touched.nrc1 && Boolean(formik.errors.nrc1) ? 'error' : ''}`}>
                    <label htmlFor='nrc1'>NRC</label>
                    <div className='nrc-wrap' style={{display: 'flex'}}>
                      <div className='nrc-code'>
                        <div className='form-control-wrap'>
                          <select
                            className={`form-control ${formik.touched.nrc1 && Boolean(formik.errors.nrc1) ? 'error' : ''}`}
                            id="nrc1"
                            type="text"
                            name="nrc1"
                            value={formik.values.nrc1}
                            onChange={formik.handleChange}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                          </select>
                        </div>
                        <div className='form-control-wrap'>
                          <select
                            className={`form-control ${formik.touched.nrc2 && Boolean(formik.errors.nrc2) ? 'error' : ''}`}
                            id="nrc2"
                            type="text"
                            name="nrc2"
                            value={formik.values.nrc2}
                            onChange={formik.handleChange}
                          >
                            <option value="AHGAYA">AHGAYA</option>
                            <option value="MADALA">MADALA</option>
                            <option value="LAYANA">LAYANA</option>
                            <option value="HAKAKA">HAKAKA</option>
                            <option value="TAKANA">TAKANA</option>
                            <option value="KAKHANA">KAKHANA</option>
                            <option value="KAYANA">KAYANA</option>
                          </select>
                        </div>
                        <div className='form-control-wrap'>
                          <select
                            className={`form-control ${formik.touched.nrc3 && Boolean(formik.errors.nrc3) ? 'error' : ''}`}
                            id="nrc3"
                            type="text"
                            name="nrc3"
                            value={formik.values.nrc3}
                            onChange={formik.handleChange}
                          >
                            <option value="N">N</option>
                          </select>
                        </div>
                      </div>
                      <div className='nrc-number'>
                        <div className={`input-group ${formik.touched.nrcNumber && Boolean(formik.errors.nrcNumber) ? 'error' : ''}`}>
                          <div className='form-control-wrap' style={{width: '100%'}}>
                            <input
                              className={`form-control ${formik.touched.nrcNumber && Boolean(formik.errors.nrcNumber) ? 'error' : ''}`}
                              id="nrcNumber"
                              type="text"
                              name="nrcNumber"
                              value={formik.values.nrcNumber}
                              onChange={formik.handleChange}
                              placeholder="123456"
                            />
                            {
                              formik.touched.nrcNumber && formik.errors.nrcNumber && (
                                <div className="error-text">{formik.errors.nrcNumber}</div>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`input-group ${formik.touched.gender && Boolean(formik.errors.gender) ? 'error' : ''}`}>
                    <label htmlFor='gender'>Birthday</label>
                    <div className='form-control-wrap radio'>
                      <label>
                        <input type="radio" name="gender" value="Male" checked={gender === 'Male'} onChange={handleGenderChange} />
                        Male
                      </label>
                      <label>
                        <input type="radio" name="gender" value="Female" checked={gender === 'Female'} onChange={handleGenderChange} />
                        Female
                      </label>
                    </div>
                  </div>
                  <div>
                    <Button color="primary" type="submit" disabled={loading}>Submit</Button>
                    {
                      error && (
                        <p>Something was wrong, please try again!</p>
                      )
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
