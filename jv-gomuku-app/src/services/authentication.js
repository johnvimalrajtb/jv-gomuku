import { validateUser,registerUser } from '../helpers/http'

export const getAuthState = () => {
  return {
    userToken: localStorage.getItem('userToken'),
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role')
  }
}

export const  login = async (username, password) => {
  return await validateUser(username, password).then(user => {
    localStorage.setItem('userToken', user.token)
    localStorage.setItem('username', user.username)
    localStorage.setItem('role', user.role)
    return {
      userToken: user.token,
      username: user.username,
      role: user.role
    }
  }).catch(error => {
    console.log(error)
    throw error;
  });
}

export const  register = async (username, password) => {
  return await registerUser(username, password).then(user => {
    localStorage.setItem('userToken', user.token)
    localStorage.setItem('username', user.username)
    localStorage.setItem('role', user.role)
    return {
      userToken: user.token,
      username: user.username,
      role: user.role
    }
  })
}

export const logout = () => {
  return new Promise((resolve) => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    resolve(true)
  })
}
