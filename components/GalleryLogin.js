import { useState } from 'react'

export default function GalleryLogin({ getGallery, message }) {
  const [password, setPassword] = useState('')

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
          width: `18rem`,
          height: `20rem`,
          padding: `2rem`,
          display: `flex`,
          flexDirection: `column`,
        }}
      >
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password.."
          type="password"
        />
        <button onClick={() => getGallery({ password })}>Submit</button>
        {!!message && <div>{message}</div>}
      </div>
    </div>
  )
}
