import YouTube from 'react-youtube'

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 0,
  },
}

function YourImage({ userImage, dataUrl }) {
  return (
    <>
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
          </div>
        )}
    </>
  )
}

export default YourImage
