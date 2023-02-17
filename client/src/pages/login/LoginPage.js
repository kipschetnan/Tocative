import React, {useState} from 'react'
import './Login.css'
import { Formik, Form, Field, ErrorMessage,  } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import bgImage from "./images/bg-img.jpeg"
import Auth from '../../utils/auth';

const LoginPage = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const initialValues = {
      username: '',
      password:'',
    }
  
  const loginSchema = Yup.object().shape({
      username: Yup.string().required('Username cannot be blank.'),
      password: Yup.string().required('Password cannot be blank.')
  })

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  }


  return (

    <div className='loginContainer'>
        <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
            <Form className='formContainer' >
              <div className='loginSection'>
                <div className='inputs'>
                  <label id="label">Username: </label>
                  <ErrorMessage name='username' component='span' />

                  <Field className='input'  placeholder='Admin' name='username'/>
                  <label id="label">Password: </label>

                  <ErrorMessage name='password' component='span' />
                  <Field className='input' type='password' placeholder='***********' name='password'/>
                </div>
                <button className='loginButton' type='submit'>Log in </button>

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