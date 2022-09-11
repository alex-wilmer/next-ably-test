import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import ImagesToRate from './ImagesToRate'
import UploadImage from './UploadImage'
import ShareYoutube from './ShareYoutube'
import averageCriticalAssessmentScore from 'lib/averageCriticalAssessmentScore'
import YourImage from './YourImage'

export default function GalleryUserView({
  clearDataUrl,
  dataUrl,
  gallery,
  imageSize,
  link,
  uploadFile,
  uploadToImgur,
  userImage,
  viewImage,
  submitYoutube,
  youtubeLink,
  clearYoutubelink,
  saveToDb,
}) {
  const [youtube, setYoutube] = useState('')

  return (
    <div>
      {!gallery.passedDeadline && (
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            flexDirection: `column`,
            textAlign: `center`,
            padding: `3rem`,
          }}
        >
          <YourImage userImage={userImage} dataUrl={dataUrl} />

          <div
            style={{
              marginTop: `1rem`,
              fontSize: `1.3rem`,
            }}
          >
            Thank you! You may submit a different image until the deadline.
          </div>

          {!!link || (
            <UploadImage
              clearDataUrl={clearDataUrl}
              dataUrl={dataUrl}
              imageSize={imageSize}
              uploadFile={uploadFile}
              uploadToImgur={uploadToImgur}
            />
          )}
          {!!link || (
            <div>
              <TextField
                value={youtube}
                sx={{ width: '30rem' }}
                onChange={(e) => setYoutube(e.target.value)}
                label="Youtube Share URL"
                InputProps={{
                  endAdornment: (
                    <Button onClick={() => submitYoutube(youtube)}>
                      Submit
                    </Button>
                  ),
                }}
              />
            </div>
          )}

          {!!youtubeLink && !link && (
            <ShareYoutube
              clearYoutubelink={clearYoutubelink}
              youtubeLink={youtubeLink}
              saveToDb={saveToDb}
            />
          )}
        </div>
      )}
      {gallery.passedDeadline && !userImage && (
        <div>The deadline has passed.</div>
      )}
      {gallery.passedDeadline && (
        <div>
          {!!userImage && ( // user has submitted
            <div>
              {!userImage.imagesToRate.length && (
                <div
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    justifyContent: `center`,
                    alignItems: `center`,
                    fontSize: `1.3rem`,
                    paddingBottom: '4rem',
                  }}
                >
                  <div
                    style={{
                      fontWeight: `bold`,
                      margin: `1rem 0`,
                    }}
                  >
                    You have not been assigned any images to rate.
                  </div>
                </div>
              )}
              {!!userImage.imagesToRate.length &&
                userImage.imagesToRate.every((x) => x.rating) && (
                  <div
                    style={{
                      display: `flex`,
                      flexDirection: `column`,
                      justifyContent: `center`,
                      alignItems: `center`,
                      fontSize: `1.3rem`,
                      paddingBottom: '4rem',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: `bold`,
                        margin: `1rem 0`,
                      }}
                    >
                      Thank you for rating!
                    </div>
                    <div>
                      <div>
                        Current Average Rating:{' '}
                        {userImage.averageRating
                          ? userImage.averageRating.toFixed(1)
                          : `No ratings yet.`}{' '}
                      </div>
                      <div>
                        Current Critical Assessment:{' '}
                        {averageCriticalAssessmentScore(userImage).toFixed(1)}
                      </div>
                      <div
                        style={{
                          marginTop: `0.5rem`,
                          fontWeight: `bold`,
                        }}
                      >
                        Instructor feedback:
                      </div>
                      <div>{userImage?.feedback || `None at this time.`}</div>
                    </div>
                  </div>
                )}
              {userImage.imagesToRate.every((x) => x.rating) && (
                <div
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    justifyContent: `center`,
                    alignItems: `center`,
                  }}
                >
                  <YourImage userImage={userImage} dataUrl={dataUrl} />
                </div>
              )}
              {!userImage.imagesToRate.every((x) => x.rating) && (
                <ImagesToRate userImage={userImage} viewImage={viewImage} />
              )}
            </div>
          )}
          {!userImage && <div>The deadline has passed.</div>}
        </div>
      )}
    </div>
  )
}
