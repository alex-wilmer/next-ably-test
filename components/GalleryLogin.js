import { useState } from 'react'
import { Button, TextField } from '@mui/material'

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
        <TextField
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          sx={{ mb: '2rem' }}
        />
        <Button onClick={() => getGallery({ password })}>Submit</Button>
        {!!message && <div>{message}</div>}
      </div>
    </div>
  )
}
