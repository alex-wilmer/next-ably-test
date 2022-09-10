import { Button, TextField } from '@mui/material'

export default function GalleryLogin({
  getGallery,
  message,
  galleryPassword,
  setGalleryPassword,
}) {
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
          value={galleryPassword}
          type="password"
          onChange={(e) => {
            setGalleryPassword(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              getGallery({ password: galleryPassword })
            }
          }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          sx={{ mb: '2rem' }}
        />
        <Button onClick={() => getGallery({ password: galleryPassword })}>
          Submit
        </Button>
        {!!message && <div>{message}</div>}
      </div>
    </div>
  )
}
