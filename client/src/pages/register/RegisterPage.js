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
        username: Yup.string().required('Username cannot be blank.'),
        password: Yup.string().required('Password cannot be blank.')
    })

    const [formState, setFormState] = useState({
        username: '',
        password: '',
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

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            
        }
    }
  return (


    <div className='registerContainer'>

        <Formik onSubmit={onSubmit}  validationSchema={registerSchema}>
            
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
  )
}

export default RegisterPage