import { useState } from 'react'
import Box from '@mui/material/Box'

export default function UploadImage({
  clearDataUrl,
  dataUrl,
  imageSize,
  uploadFile,
  uploadToImgur,
}) {
  const [caption, setCaption] = useState('')
  return (
    <div>
      {!!dataUrl || (
        <form
          style={{
            display: `flex`,
            justifyContent: `center`,
          }}
        >
          <div
            className="file"
            style={{
              margin: `2rem 0`,
            }}
          >
            <input
              type="file"
              name="imageFile"
              onChange={uploadFile}
              style={{
                height: `100%`,
                width: `100%`,
              }}
            />
            <button htmlFor="file">Upload Image</button>
          </div>
        </form>
      )}
      {!!dataUrl && (
        <div
          style={{
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
          }}
        >
          <div>
            <img // eslint-disable-line
              alt="dataUrl"
              src={dataUrl}
              style={{
                maxWidth: `40rem`,
              }}
            />
          </div>
          <div
            style={{
              margin: `1rem 0`,
            }}
          >
            <div
              style={{
                marginBottom: `1rem`,
              }}
            >
              {imageSize.width}px - {imageSize.height}px
            </div>

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
                <button onClick={clearDataUrl}>Cancel</button>
                <button
                  onClick={() => uploadToImgur({ caption })}
                  style={{
                    marginLeft: `3rem`,
                  }}
                >
                  Save
                </button>
              </Box>
            </Box>
          </div>
        </div>
      )}
    </div>
  )
}
