import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const defaultLocalValues = {
  isLoggedIn: false,
  isAdmin: false,
  username: null,
}

const useAuth = () => {
  const router = useRouter()

  const [localValues, setLocalValues] = useState(defaultLocalValues)

  function signup(body) {
    return fetch(`api/signup`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify(body),
    }).then((r) => r.json())
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

  function logout() {
    localStorage.clear()
    setLocalValues(defaultLocalValues)
    router.push('/')
  }

  function loggedIn() {
    return !!localStorage.token
  }

  function isAdmin() {
    return localStorage.admin === true
  }

  function getUsername() {
    return localStorage.username
  }

  // localStorage only available on client
  useEffect(() => {
    setLocalValues({
      isLoggedIn: loggedIn(),
      isAdmin: isAdmin(),
      username: getUsername(),
    })
  }, [])

  return { signup, login, logout, loggedIn, isAdmin, getUsername, localValues }
}

export default useAuth
