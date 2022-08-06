import { useState, useEffect } from 'react'
import useChannel from 'lib/hooks/useChannel'

export default function Userlist() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      let { users } = await fetch(`api/userlist`, {
        method: `POST`,
        headers: { 'Content-Type': `application/json` },
        body: JSON.stringify({
          token: localStorage.token,
        }),
      }).then((r) => r.json())

      if (users) {
        setUsers(users)
      }
    }

    fetchUsers()
  }, [])

  // TODO: these are not JWT secured messages
  useChannel('userlist', (message) => {
    let newUser = message.data
    setUsers((users) => [...users, newUser])
  })

  return (
    <div style={{ padding: 20 }}>
      <label style={{ fontSize: '1.4em' }}>REGISTERED USERS:</label>
      {users
        .slice()
        .sort()
        .map((username) => {
          return <div key={username}>{username}</div>
        })}
    </div>
  )
}
