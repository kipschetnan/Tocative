import React from 'react'
import './Login.css'
import { Formik, Form, Field, ErrorMessage,  } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import bgImage from "./images/bg-img.jpeg"

const LoginPage = () => {


    const initialValues = {
        username: '',
        password:'',
      }
    
    const loginSchema = Yup.object().shape({
        username: Yup.string().required('Username cannot be blank.'),
        password: Yup.string().required('Password cannot be blank.')
    })

    const onSubmit = (data) => {
      console.log(data)
    }



  return (

    <div className='loginContainer'>
        <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
            <Form className='formContainer'>
              <div className='loginSection'>
                <div className='inputs'>
                  <label id="label">Username: </label>
                  <ErrorMessage name='username' component='span' />
                  <Field className='input'  placeholder='Admin' name='username' />
                  <label id="label">Password: </label>
                  <ErrorMessage name='password' component='span' />
                  <Field className='input' type='password' placeholder='***********' name='password'/>
                </div>
                <button className='loginButton'>Log in </button>

                <a className='resetLink' href='#'> Forgot password? </a>
                <div className='line'></div>
              </div>
              
              <div className='registerSection'>
                <Link to='/register' className='registerLink'>
                  <button className='registerButton' type='submit' >Create new account</button>
                </Link>
              </div>
              
            </Form>
          </Formik>
    </div>
  )
}

export default LoginPage