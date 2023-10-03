import React from 'react'
import PropTypes from 'prop-types'
import SignUpForm from './SignUpForm'
import { Redirect } from 'react-router'
import { register } from '../../services/authentication'

class SignUpPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false
    }
    this.registerToApi = this.registerToApi.bind(this)
  }

  async registerToApi (username, password) {
    return await register(username, password)
               .then(() => this.setState({ redirectToReferrer: true }))              
  }

  render () {
    const { from } = this.props.location.state || '/'
    const { redirectToReferrer } = this.state
    return (     
      <div>
      {redirectToReferrer && (
        <Redirect to={from || '/login'} />
      )}
      {from && (
        <p>
          You gotta log in if you want to see
          <code>{from.pathname}</code>
        </p>
      )}
      {this.context.auth.loggedIn ? (
        <p>
          You're already logged in.
        </p>
      ) : (
        <SignUpForm register={this.registerToApi} />
      )}
    </div>
          
         
    )
  };
}

SignUpPage.contextTypes = {
  auth: PropTypes.object
}

export default SignUpPage
