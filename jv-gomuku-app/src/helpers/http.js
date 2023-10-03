import { API_HOST } from "../constants"


export async function saveGame(historyData) {
  //hardcoded user admin/admin
  try {
    const game = await post(`${API_HOST}/api/game/save`, historyData)
    return Promise.resolve({
      gameId: game.gameId
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    return "Unable to login at this moment, please try again"
  }  
}

export async function getGameHistory() {
  //hardcoded user admin/admin
  try {
    const game = await get(`${API_HOST}/api/game/history`,{})
    return Promise.resolve({
      gameId: game.gameId
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    return "Error While getting game history"
  }  
}

export async function getGameById(id) {
  try {
    const game = await get(`${API_HOST}/api/game/:${id}`,{})
    return Promise.resolve({
      gameId: game.gameId
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    return "Error While getting game by id"
  }  
}

export async function validateUser(username, password) {
  //hardcoded user admin/admin
  try {
    const user = await post(`${API_HOST}/api/auth/login`, {
      username,
      password
    })
    return Promise.resolve({
      token: user.token,
      username: username,
      role: 'admin'
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    return "Unable to login at this moment, please try again"
  }  
}


export async function registerUser(username, password) {
  //hardcoded user admin/admin
  try {
    const user = await post(`${API_HOST}/api/auth/register`, {
      username,
      password
    })
    return Promise.resolve({
      token: user.token,
      username: username,
      role: 'admin'
    });
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
    return "Unable to sign up at this moment, please try again"
  }  
}

export async function http(request) {
  const response = await fetch(request)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const headers = response.headers
  const data = headers.get("content-type").includes("json")
    ? await response.json()
    : {}
  return data
}

let token = ""
export const setToken = newToken => (token = newToken)

export async function get(path) {
  return await http(
    new Request(path, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json"
      },
      method: "get"
    })
  )
}

export async function put(path, body) {
  return await http(
    new Request(path, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      method: "put"
    })
  )
}

export async function post(path, body) {
  return await http(
    new Request(path, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      method: "post"
    })
  )
}

export async function del(path) {
  return await http(
    new Request(path, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json"
      },
      method: "delete"
    })
  )
}



