import { useState } from 'react'
// import { API } from '../config'

// async componentDidMount() {
//   let { users } = await fetch(`${API}/api/userlist`, {
//     method: `POST`,
//     headers: { 'Content-Type': `application/json` },
//     body: JSON.stringify({
//       token: localStorage.token,
//     }),
//   }).then(r => r.json())

//   this.setState({ users: [...new Set(users)] })

//   this.props.socket.on('api:newsignup', username =>
//     this.setState({ users: [...new Set([...users, username])] }),
//   )
// }
export default function Userlist() {
  const [users, setUsers] = useState([])

  return (
    <div style={{ padding: 20 }}>
      <label style={{ fontSize: '1.4em' }}>REGISTERED USERS:</label>
      {users
        .slice()
        .sort()
        .map(username => {
          return <div key={username}>{username}</div>
        })}
    </div>
  )
}
