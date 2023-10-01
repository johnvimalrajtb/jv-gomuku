import React from 'react'
import PropTypes from 'prop-types'
import SignUpForm from './SignUpForm'

class SignUpPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false
    }
    this.registerToApi = this.registerToApi.bind(this)
  }

  registerToApi (username, password) {
    return this.props.login(username, password)
               .then(() => this.setState({ redirectToReferrer: true }))              
  }

  render () {
    const { from } = this.props.location.state || '/'
    const { redirectToReferrer } = this.state
    return (     

          <SignUpForm register={this.registerToApi} />
         
    )
  };
}

SignUpPage.contextTypes = {
  auth: PropTypes.object
}

SignUpPage.propTypes = {
  login: PropTypes.func
}

export default SignUpPage
