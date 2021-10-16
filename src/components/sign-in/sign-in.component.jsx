import React, { useState } from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux'


const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [signin, setSignIn] = useState({ email: "", password: "" })
  async function handleSubmit(event) {
    event.preventDefault()
    emailSignInStart(signin.email, signin.password)
  }
  function handleChange(event) {
    const { name, value } = event.target
    setSignIn((prevSignIn) => {
      return (
        {
          ...prevSignIn,
          [name]: value
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
        <FormInput name='email' type='email' value={signin.email} handleChange={handleChange} label="Email" />
        <FormInput name='password' type='password' value={signin.password} handleChange={handleChange} label="Password" />
        <div className='buttons'>
          <CustomButton type='submit' onClick={handleSubmit}>Sign In</CustomButton>
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>{''}Sign In With Google{''}</CustomButton>
        </div>

      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn)