import { useState } from 'react'
import { TwitterPicker as ColorPicker } from 'react-color'
import Button from '@mui/material/Button'
import useGalleryApi from 'lib/hooks/useGalleryApi'
import { generateCSV } from 'lib/downloadCSV'

function GalleryAdminView({
  gallery,
  colorPickerOpen,
  openColorPicker,
  activateDeadline,
  togglePublic,
  setColor,
  openDeleteModal,
}) {
  const { multiplier, setMultiplier } = useGalleryApi()
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
          value={multiplier}
          onChange={(e) => setMultiplier(e.target.value)}
          style={{
            display: `inline-block`,
            width: `4rem`,
            textAlign: `center`,
            marginLeft: `1rem`,
          }}
        />
      </div>

      <Button
        data-cy="open-delete-modal-btn"
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

      <Button
        variant="contained"
        onClick={activateDeadline}
        style={{ float: `right`, marginLeft: `1rem` }}
      >
        Activate Deadline
      </Button>

      <Button
        variant="contained"
        onClick={() => generateCSV(gallery.images, gallery.name)}
        style={{ float: `right` }}
      >
        Export CSV
      </Button>
    </div>
  )
}

export default GalleryAdminView
