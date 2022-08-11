import { useState } from 'react'
import StarRating from './StarRating'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

/*
      <Dialog !!viewingImage={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Do you really want to delete this gallery?</DialogTitle>
        <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
        <Button onClick={deleteGallery}>Yes, Delete Is!</Button>
      </Dialog>
*/

export default function ViewImage({
  asAdmin,
  message,
  rate,
  viewingImage,
  viewImage,
  close,
}) {
  const [feedback, setFeedback] = useState('')
  return (
    <Dialog open={!!viewingImage} onClose={close}>
      <div
        style={{
          minWidth: `455px`,
          padding: `5rem`,
          backgroundColor: `white`,
          border: `1px solid rgb(151, 185, 169)`,
          position: `relative`,
          textAlign: `center`,
        }}
      >
        <a
          onClick={() => viewImage({ image: null })}
          style={{
            position: `absolute`,
            right: `15px`,
            top: `15px`,
            fontWeight: `bold`,
            cursor: 'pointer',
          }}
        >
          ✕ CLOSE
        </a>
        {viewingImage?.link.includes(`youtube`) && (
          <iframe
            width="560"
            height="315"
            title={viewingImage.link}
            src={`https://www.youtube.com/embed/${viewingImage.link
              .split(`=`)
              .pop()}`}
            frameBorder="0"
            allowFullScreen
          />
        )}
        {!viewingImage?.link.includes(`youtube`) && (
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
            value={feedback || viewingImage?.feedback}
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
