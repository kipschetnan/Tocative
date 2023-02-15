import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage,  } from 'formik'
import * as Yup from 'yup'


const RegisterPage = () => {
    const initialValues = {
        username: '',
        password:'',
    }

    const registerSchema = Yup.object().shape({
        username: Yup.string().required('Username cannot be blank.'),
        password: Yup.string().required('Password cannot be blank.')
    })

    const onSubmit = (data) => {
        console.log(data)
    }
  return (


    <div className='registerContainer'>

        <Formik initialValues={initialValues} onSubmit={onSubmit}  validationSchema={registerSchema}>
            
            <Form className='registerForm' >

                <div className='registerTitle'>
                    <div className='text'>
                        <h1>Sign Up</h1>
                        <p>It's quick and easy.</p>
                    </div>
                    <Link to='/login' className='backLink'>X</Link>
                </div>

                <div className='line'></div>
                <label id="label">Username: </label>
                <ErrorMessage name='username' component='span'/>
                <Field className='input' id='username'  name='username' placeholder='Admin'/>
                <label id="label">Password: </label>
                <ErrorMessage name='password' component='span'/>
                <Field className='input' id='password' type='password' name='password' placeholder='*********'/>

               
                <div className='signupButton'>
                    <button className='registerButton' type='submit'>Submit</button>
                </div>

            </Form> 
        
        </Formik>

    </div>
  )
}

export default RegisterPage