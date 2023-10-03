import React from 'react'
import PropTypes from 'prop-types'
import style from './SignUp.module.css'
import Message from '../../components/Message'

class SignUpForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      signUpFailed:false,
      errorMessage: '',
      fields: {
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.setErrorMessage = this.setErrorMessage.bind(this)
  }

  onInputChange (event) {
    const fields = this.state.fields
    fields[event.target.name] = event.target.value
    this.setState({ fields })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setErrorMessage('')
    if (this.state.fields.password !== this.state.fields.confirmPassword) {
      this.setErrorMessage('Passwords do not match')
      return
    }    
    this.props.register(this.state.fields.username, this.state.fields.password)
        .catch(err => {
          console.log(err)
          this.signUpFailed()
        })
  }


  setErrorMessage (message) {
    this.setState({
      errorMessage: message
    })
  }

  signUpFailed () {
    this.setState({
      signUpFailed: true,
      fields: {
        username: '',
        password: '',
        confirmPassword: ''
      }
    })
  }

  render () {
    return (
      <div>
        {this.state.errorMessage && <Message variant="error" message={this.state.errorMessage} />}
        <form onSubmit={this.handleSubmit} className={style.container}>
            Username:<br />
          <input onChange={this.onInputChange} placeholder='Enter username' name='username' value={this.state.fields.username} type='text' />
            Password:<br />
          <input onChange={this.onInputChange} placeholder='Enter password' name='password' value={this.state.fields.password} type='password' />
            Confirm Password:<br />
          <input onChange={this.onInputChange} placeholder='Confirm password' name='confirmPassword' value={this.state.fields.confirmPassword} type='password' />          
          <input type='submit' value='SignUp' disabled={!this.state.fields.username || !this.state.fields.password || !this.state.fields.confirmPassword}/>
        </form>

        { this.state.signUpFailed && <h3>SignUp failed.</h3> }
      </div>
    )
  };
}

SignUpForm.contextTypes = {
  auth: PropTypes.object
}
export default SignUpForm
