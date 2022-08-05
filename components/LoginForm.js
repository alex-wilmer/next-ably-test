import { useState } from 'react'
import PinInput from 'react-pin-input'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import useAuth from '../lib/hooks/useAuth'
import useChannel from '../lib/hooks/useChannel'

export default function Login() {
  const router = useRouter()
  const { nextPathname } = router.query
  const { signup, login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [channel] = useChannel('userlist')

  return (
    <div
      style={{
        height: `calc(100% - 5rem)`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
      }}
    >
      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          minHeight: `200px`,
        }}
      >
        <label
          style={{
            fontSize: '1.2em',
            textAlign: 'center',
            width: '100%',
            display: 'block',
          }}
        >
          StudentID
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <div>
          <label
            style={{
              fontSize: '1.2em',
              textAlign: 'center',
              width: '100%',
              display: 'block',
            }}
          >
            4 Digit Pin (Remember this!)
          </label>
          <PinInput
            length={4}
            onChange={(value, index) => {
              setPassword(value)
            }}
            type="numeric"
            style={{ padding: '10px' }}
            inputStyle={{ borderColor: 'rgb(165, 187, 179)' }}
            inputFocusStyle={{ borderColor: 'blue' }}
            onComplete={(value, index) => {}}
          />
        </div>
        <Button
          onClick={async () => {
            if (password.length !== 4) {
              setMessage('Please enter a 4 digit pin.')
            } else {
              const response = await login({
                username,
                password,
              })

              // something went wrong
              if (response?.message) {
                setMessage(response.message)
              } else {
                router.push('/galleries')
              }
            }
          }}
          style={{
            marginTop: `0.5rem`,
          }}
        >
          Log In
        </Button>
        <Button
          onClick={async () => {
            const response = await signup({
              username,
              password,
            })
            if (response?.message) {
              setMessage(response.message)
            } else {
              channel.publish({ name: 'new-signup', data: username })
              // login user after successful signup
              await login({
                username,
                password,
              })
              router.push('/galleries')
            }
          }}
          style={{
            marginTop: `1rem`,
          }}
        >
          Sign Up
        </Button>
        {!!message && <div>{message}</div>}
      </div>
    </div>
  )
}
