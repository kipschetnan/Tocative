import React, {useState} from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage,  } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';


const RegisterPage = () => {

    const registerSchema = Yup.object().shape({
        firstname: Yup.string().required('Name cannot be blank.'),
        username: Yup.string().required('Username cannot be blank.'),
        password: Yup.string().required('Password cannot be blank.')
    })

    const [formState, setFormState] = useState({
        firstname: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
      });

    const [addUser, { error }] = useMutation(ADD_USER);
    
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(formState)
        try {
            
            const { data } = await addUser({
                variables: { ...formState },
            });
            console.log(data)

            Auth.login(data.addUser.token);
            console.log('Registered!')
        } catch (e) {
            console.error(e);
        }
    }
  return (

    <div className='loginWrapper'>
    <div className='registerContainer'>

        <Formik   validationSchema={registerSchema}>
            
            <Form className='registerForm' onSubmit={onSubmit}>

                <div className='registerTitle'>
                    <div className='text'>
                        <h1>Sign Up</h1>
                        <p>It's quick and easy.</p>
                    </div>
                    <Link to='/login' className='backLink'>X</Link>
                </div>

                <div className='line'></div>

                <label id="label">First Name: </label>
                <ErrorMessage name='firstName' component='span'/>
                <Field className='input' id='firstName'  name='firstName' placeholder='First Name' value={formState.firstName} onChange={handleChange}/>

                <label id="label">Last Name: </label>
                <ErrorMessage name='lastName' component='span'/>
                <Field className='input' id='lastName'  name='lastName' placeholder='Last Name' value={formState.lastName} onChange={handleChange}/>

                <label id="label">Username: </label>
                <ErrorMessage name='username' component='span'/>
                <Field className='input' id='username'  name='username' placeholder='Admin' value={formState.username} onChange={handleChange}/>

                <label id="label">Password: </label>
                <ErrorMessage name='password' component='span'/>
                <Field className='input' id='password' type='password' name='password' placeholder='*********' value={formState.password} onChange={handleChange}/>

                <div className='signupButton'>
                    <button className='registerButton' type='submit'>Submit</button>
                </div>

            </Form> 
        
        </Formik>

    </div>
    </div>
  )
}

export default RegisterPage