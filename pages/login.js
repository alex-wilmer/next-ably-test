import React from 'react';
import PinInput from 'react-pin-input';
import { useRouter } from 'next/router'
import auth from '../lib/auth'

let username,
  password = '';

export default function Login() {
  const router = useRouter()
  const { nextPathname } = router.query

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
        <input ref={node => (username = node)} type="text" />
        <div>
          <label
            style={{
              fontSize: '1.2em',
              textAlign: 'center',
              width: '100%',
              display: 'block',
            }}
          >
            4 Digit Pin (Don't forget it!)
          </label>
          <PinInput
            length={4}
            onChange={(value, index) => {
              password = value;
            }}
            type="numeric"
            style={{ padding: '10px' }}
            inputStyle={{ borderColor: 'rgb(165, 187, 179)' }}
            inputFocusStyle={{ borderColor: 'blue' }}
            onComplete={(value, index) => { }}
          />
        </div>
        <button
          // onClick={() => {
          //   password.length === 4
          //     ? login({
          //       type: `login`,
          //       userInfo: {
          //         username: username.value,
          //         password: password,
          //       },
          //       nextPathname,
          //     })
          //     : alert('Please enter a 4 digit pin.');
          // }}
          style={{
            marginTop: `0.5rem`,
          }}
        >
          Log In
        </button>
        <button
          onClick={async () => {
            const response = await auth.signup({ username: username.value, password })
            console.log({ response })
          }}
          style={{
            marginTop: `1rem`,
          }}
        >
          Sign Up
        </button>
        {/* {!!message && <div>{message}</div>} */}
      </div>
    </div>
  );
}
