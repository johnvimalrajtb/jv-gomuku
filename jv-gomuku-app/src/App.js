import React from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import HomePage from './components/home/HomePage'
import HistoryPage from './components/history/HistoryPage'
import AboutPage from './components/about/AboutPage'
import NotFoundPage from './components/NotFoundPage'
import LoginPage from './components/login/LoginPage'
import SignUpPage from './components/signup/SignUpPage'
import GamesPage from './components/games/GamesPage'
import GamesROPage from './components/games/GamesROPage'
import TopBar from './components/layout/TopBar'
import PrivateRoute from './components/router/PrivateRoute'
import RouteWithProps from './components/router/RouteWithProps'
import * as authentication from './services/authentication'
import '../node_modules/picnic/picnic.min.css'
import './App.css'

class App extends React.Component {
  constructor () {
    super()

    let authState = authentication.getAuthState()
    this.state = {
      auth: {
        loggedIn: authState.userToken !== null,
        username: authState.username,
        userToken: authState.userToken,
        role: authState.role
      }
    }

    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.logout = this.logout.bind(this)
  }

  getChildContext () {
    return {
      auth: {
        loggedIn: this.state.auth.loggedIn,
        username: this.state.auth.username,
        userToken: this.state.auth.userToken,
        role: this.state.auth.role
      }
    }
  }

  register (username, password) {
    return authentication.register(username, password)
    .then(result => {
      this.setState({
        auth: {
          ...this.state.auth,
          loggedIn: false,
          username: '',
          userToken: '',
          role: ''
        }
      })
    })
  }

  login (username, password) {
    return authentication.login(username, password)
        .then(result => {
          this.setState({
            auth: {
              ...this.state.auth,
              loggedIn: true,
              username: result.username,
              userToken: result.userToken,
              role: result.role
            }
          })
        })
        .catch(err => {
          this._logout()
          return Promise.reject(err)
        })
  }

  logout () {
    return authentication.logout().then(result => {
      this._logout()
    })
  }

  render () {
    return (
      <Router>
        <div>
          <TopBar logout={this.logout} />
          <div className='mainbody'>
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/about' component={AboutPage} />
              <Route path="/signup" component={SignUpPage} props={{ register: this.register }}/>
              <RouteWithProps path='/login' component={LoginPage} props={{ login: this.login }} />
              <RouteWithProps path='/notloggedin' component={LoginPage} props={{ login: this.login }} />
              <PrivateRoute path='/game' component={GamesPage} />
              <PrivateRoute path='/games' component={HistoryPage} />
              <PrivateRoute path='/game-log/:id' component={GamesROPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }

  _logout () {
    this.setState({
      auth: {
        ...this.state.auth,
        loggedIn: false,
        username: null,
        userToken: null,
        role: null
      }
    })
  }

}

App.childContextTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    username: PropTypes.string,
    userToken: PropTypes.string,
    role: PropTypes.string
  })
}

export default App
