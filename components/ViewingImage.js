import { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import StarRating from './StarRating'
import Dialog from '@mui/material/Dialog'

// TODO: output excel

export default function ViewImage({
  asAdmin,
  message,
  rate,
  viewingImage,
  close,
}) {
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    setFeedback(viewingImage?.feedback || '')
  }, [viewingImage?.feedback])

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <Dialog open={!!viewingImage} onClose={close}>
      <div
        style={{
          minWidth: `400px`,
          backgroundColor: `white`,
          position: `relative`,
          textAlign: `center`,
          marginBottom: `3rem`,
        }}
      >
        {viewingImage?.link.includes(`youtu`) && (
          <YouTube videoId={viewingImage.link.split('/').pop()} opts={opts} />
        )}
        {!viewingImage?.link.includes(`youtu`) && (
          <img // eslint-disable-line
            alt="viewing_image"
            src={viewingImage?.link}
            style={{
              maxWidth: `40rem`,
            }}
          />
        )}
        {viewingImage?.width && viewingImage?.height && (
          <div
            style={{
              marginBottom: `1rem`,
            }}
          >
            {viewingImage?.width}px - {viewingImage?.height}px
          </div>
        )}
        <div
          style={{
            fontSize: `1.2rem`,
            marginTop: `1.5rem`,
          }}
        >
          {viewingImage?.caption}
        </div>
        {asAdmin && (
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="10"
            placeholder="Provide feedback (optional)"
            style={{
              margin: `1rem 0`,
              padding: `0.5rem`,
              height: `8rem`,
            }}
          />
        )}
        <StarRating
          rate={(rating) => {
            let ratingSpec = {
              rating,
              viewingImage,
            }

            if (asAdmin) ratingSpec.feedback = feedback

            rate(ratingSpec)
          }}
        />
        <div
          style={{
            textAlign: `center`,
            fontSize: `1.3em`,
          }}
        >
          {!!message || asAdmin || (
            <div>You can only vote once! Make it count.</div>
          )}
          {!!message && <div>{message}</div>}
        </div>
      </div>
    </Dialog>
  )
}
