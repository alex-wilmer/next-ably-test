export default function ImagesToRate({ userImage, viewImage }) {
  return (
    <div
      style={{
        display: `flex`,
        alignItems: `center`,
        padding: `3rem 0`,
        flexDirection: `column`,
      }}
    >
      <div
        style={{
          fontSize: `1.2em`,
          textAlign: `center`,
        }}
      >
        Please vote on the images below:
      </div>
      <div
        style={{
          display: `flex`,
          flexDirection: `row`,
        }}
      >
        {userImage.imagesToRate.map((image, i) => (
          <div
            key={i}
            onClick={() => viewImage({ image })}
            style={{
              margin: `1rem`,
              cursor: `pointer`,
              display: `flex`,
              flexDirection: `column`,
              textAlign: `center`,
            }}
          >
            {image.link?.includes(`youtu`) && (
              <img // eslint-disable-line
                alt="image"
                style={{
                  maxWidth: `8rem`,
                  maxHeight: `8rem`,
                  minWidth: `8rem`,
                  minHeight: `8rem`,
                  marginBottom: `0.25rem`,
                  border: `1px solid rgba(0, 0, 0, 0.2)`,
                }}
                src="https://thumbs.dreamstime.com/b/web-189206689.jpg"
              />
            )}
            {!image.link?.includes(`youtu`) && (
              <img // eslint-disable-line
                alt="image"
                style={{
                  maxWidth: `8rem`,
                  maxHeight: `8rem`,
                  minWidth: `8rem`,
                  minHeight: `8rem`,
                  marginBottom: `0.25rem`,
                }}
                src={image.link}
              />
            )}
            {!!image.rating && <span>Already Rated</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
