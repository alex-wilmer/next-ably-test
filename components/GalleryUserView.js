import { useState } from 'react'
import YouTube from 'react-youtube'
import ImagesToRate from './ImagesToRate'
import UploadImage from './UploadImage'
import ShareYoutube from './ShareYoutube'
import averageCriticalAssessmentScore from 'lib/averageCriticalAssessmentScore'

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

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  }

  console.log({ userImage })

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
          {!!userImage &&
            !dataUrl && ( // user has submitted
              <div>
                <div>
                  {userImage.link?.includes(`youtu`) && (
                    <YouTube
                      videoId={userImage.link.split('/').pop()}
                      opts={opts}
                    />
                  )}
                  {!userImage.link?.includes(`youtu`) && (
                    <img // eslint-disable-line
                      alt="userImage"
                      src={userImage.link}
                      style={{
                        maxWidth: `40rem`,
                      }}
                    />
                  )}
                </div>
                {!!userImage.width && (
                  <div
                    style={{
                      marginTop: `1rem`,
                    }}
                  >
                    {userImage.width}px - {userImage.height}px
                  </div>
                )}
                {!!userImage.caption && (
                  <div
                    style={{
                      marginTop: `1rem`,
                      fontSize: `1.2rem`,
                    }}
                  >
                    {userImage.caption}
                  </div>
                )}
                <div
                  style={{
                    marginTop: `1rem`,
                    fontSize: `1.3rem`,
                  }}
                >
                  Thank you! You may submit a different image until the
                  deadline.
                </div>
              </div>
            )}
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
              <div>or paste youtube link</div>
              <input
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                style={{ width: `20rem` }}
              />
              <button onClick={() => submitYoutube(youtube)}>Submit</button>
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
                    height: `10rem`,
                    display: `flex`,
                    flexDirection: `column`,
                    justifyContent: `center`,
                    alignItems: `center`,
                    fontSize: `1.3rem`,
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
                      height: `10rem`,
                      display: `flex`,
                      flexDirection: `column`,
                      justifyContent: `center`,
                      alignItems: `center`,
                      fontSize: `1.3rem`,
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
                          ? userImage.averageRating
                          : `No ratings yet.`}{' '}
                      </div>
                      <div>
                        Current Critical Assessment:{' '}
                        {averageCriticalAssessmentScore(userImage)}
                      </div>
                      <div
                        style={{
                          marginTop: `0.5rem`,
                          fontWeight: `bold`,
                        }}
                      >
                        Instructor feedback:
                      </div>
                      <div>{!userImage.feedback && `None at this time.`}</div>
                    </div>
                  </div>
                )}
              {userImage.imagesToRate.every((x) => x.rating) || (
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
