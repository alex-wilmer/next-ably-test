import { TwitterPicker as ColorPicker } from 'react-color'
import Button from '@mui/material/Button'

function GalleryAdminView({
  gallery,
  colorPickerOpen,
  openColorPicker,
  activateDeadline,
  togglePublic,
  setColor,
  openDeleteModal,
}) {
  return (
    <div>
      <div>Password: {gallery.password}</div>

      <div
        style={{
          display: `flex`,
          height: `3rem`,
          alignItems: `center`,
        }}
      >
        <Button onClick={togglePublic}>
          {gallery.public ? `Make Private` : `Make Public`}
        </Button>
      </div>

      <div
        style={{
          display: `flex`,
          height: `3rem`,
          alignItems: `center`,
        }}
      >
        <span>Choose color:</span>
        <span
          onClick={openColorPicker}
          style={{
            cursor: `pointer`,
            display: `inline-block`,
            marginLeft: `1rem`,
            backgroundColor: gallery.color || `rgb(27, 173, 112)`,
            border: `1px solid black`,
            width: `30px`,
            height: `23px`,
          }}
        />
      </div>

      {colorPickerOpen && (
        <div style={{ position: `absolute` }}>
          <ColorPicker onChange={setColor} type="swatches" />
        </div>
      )}
      <div>
        <span>Voting multiplier:</span>
        <input
          // ref="multiplier"
          placeholder="Voting Multiplier"
          type="text"
          defaultValue="5"
          style={{
            display: `inline-block`,
            width: `4rem`,
            textAlign: `center`,
            marginLeft: `1rem`,
          }}
        />
      </div>

      <Button
        onClick={openDeleteModal}
        style={{
          float: `right`,
          background: `rgb(191, 45, 13)`,
          color: `white`,
          marginLeft: `1rem`,
        }}
      >
        Delete Gallery
      </Button>

      <Button onClick={activateDeadline} style={{ float: `right` }}>
        Activate Deadline
      </Button>
    </div>
  )
}

export default GalleryAdminView