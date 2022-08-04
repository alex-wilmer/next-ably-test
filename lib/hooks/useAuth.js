const useAuth = () => {
  function signup(body) {
    return fetch(`api/signup`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify(body),
    }).then((r) => r.json())

    // if (success) {
    //   // socket.emit('ui:newsignup', { username: body.username })
    //   // this.login(body, cb)
    // } else {
    //   // cb({ success, message })
    // }
  }

  async function login(body) {
    let response = await fetch(`api/authenticate`, {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify(body),
    })

    let { success, message, token, user } = await response.json()

    if (success) {
      localStorage.admin = user.admin
      localStorage.token = token
      localStorage.userId = user._id
      localStorage.username = user.username
      // cb({ success, message, user })
    } else {
      return { message }
    }
  }

  function logout(cb) {
    delete localStorage.token
    if (cb) cb()
  }

  function loggedIn() {
    return !!localStorage.token
  }

  return { signup, login, logout, loggedIn }
}

export default useAuth
