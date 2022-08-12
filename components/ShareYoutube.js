import { useState } from 'react'
import YouTube from 'react-youtube'
import Box from '@mui/material/Box'

function ShareYoutube({ youtubeLink, saveToDb, clearYoutubelink }) {
  const [caption, setCaption] = useState('')

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <div>
      <YouTube videoId={youtubeLink.split('/').pop()} opts={opts} />

      <label
        style={{
          fontSize: `1.1rem`,
          display: `block`,
          marginBottom: `0.5rem`,
        }}
      >
        Figure caption:
      </label>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows="10"
          style={{
            marginBottom: `1rem`,
            height: `8rem`,
          }}
        />
        <Box>
          <button onClick={clearYoutubelink}>Cancel</button>
          <button
            onClick={() => saveToDb({ link: youtubeLink, caption })}
            style={{
              marginLeft: `3rem`,
            }}
          >
            Save
          </button>
        </Box>
      </Box>
    </div>
  )
}

export default ShareYoutube
