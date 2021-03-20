import React,{useState} from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { signInWithGoogle } from '../../firebase/firebase.utils'
const SignIn = () => {
  const [ signin,setSignIn ] = useState({ email:"",password:""})
  function handleSubmit(event)
  {
   event.preventDefault()
   setSignIn({email:'',password:''})
  }
  function handleChange(event)
  {
    const { name, value } = event.target
    setSignIn((prevSignIn) =>
    {
      return (
          {
              ...prevSignIn,
              [name]:value
          }
      )
    }
       
    )
  }
  return (
      <div className='sign-in'>
          <h2>I already have an account</h2>
          <span>Sign in with your email and password</span>

          <div>
              <FormInput name='email' type='email' value={signin.email} handleChange={handleChange}  label = "Email"/>
              <FormInput name='password' type='password' value={signin.password} handleChange={handleChange} label="Password" />
              <div className='buttons'>
              <CustomButton type='submit'>Sign In</CustomButton>
              <CustomButton onClick={ signInWithGoogle } isGoogleSignIn>{''}Sign In With Google{''}</CustomButton>
              </div>
              
          </div>
      </div>
  )
}

export default SignIn