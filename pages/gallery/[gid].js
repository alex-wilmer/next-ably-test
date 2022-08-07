import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Header from 'components/Header'
import useGalleryApi from 'lib/hooks/useGalleryApi'
import GalleryAdminView from 'components/GalleryAdminView'
import GalleryUserView from 'components/GalleryUserView'
import GalleryLogin from 'components/GalleryLogin'
import ViewImage from 'components/ViewImage'
import ResultsTable from 'components/ResultsTable'

export default function Gallery() {
  const router = useRouter()
  const { gid } = router.query

  const { getGallery, gallery, needToAuth, userImage, saveToDb } =
    useGalleryApi()

  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [viewingImage, setViewingImage] = useState()
  const [dataUrl, setDataUrl] = useState(null)
  const [imageSize, setImageSize] = useState(null)
  const [youtubeLink, setYoutubeLink] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!gid) return

    async function req() {
      getGallery()
    }

    req()
  }, [gid])

  function setColor(color) {
    // this.props.socket.emit(`ui:setGalleryColor`, {
    //   color,
    //   _id: this.state.gallery._id,
    // })
    setColorPickerOpen(false)
  }

  async function togglePublic() {
    let response = await fetch(`/api/galleryTogglePublic`, {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify({
        token: localStorage.token,
        galleryId: gid,
      }),
    }).then((r) => r.json())

    if (response) {
      setGallery(response)
    }

    // this.props.socket.emit(`ui:togglePublic`, {
    //   _id: this.state.gallery._id,
    // })
  }

  function uploadFile(event) {
    let files = event.target.files

    if (!files.length) {
      return console.log(`no file chosen`)
    }

    let file = files[0]
    let fileReader = new FileReader()
    let img = new Image()
    let _URL = window.URL || window.webkitURL
    img.src = _URL.createObjectURL(file)

    fileReader.onload = (event) => {
      let dataUrl = event.target.result
      setDataUrl(dataUrl)
      setImageSize(() => ({
        width: img.naturalWidth,
        height: img.naturalHeight,
      }))
    }

    fileReader.readAsDataURL(file)
  }

  async function uploadToImgur({ caption }) {
    let format = (string) => {
      let [type, ...data] = string.split(',')
      return data.join()
    }

    setLoading(true)

    let response = await fetch(`https://api.imgur.com/3/image`, {
      method: `POST`,
      headers: {
        Authorization: `Client-ID a1f8ff831c67e9b`,
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({
        image: format(dataUrl),
        type: `base64`,
      }),
    })

    let { data } = await response.json()

    if (data.link) {
      setDataUrl(null)

      saveToDb({
        link: data.link,
        width: data.width,
        height: data.height,
        caption,
      })
    }

    // this.setState({ loading: false })
  }

  function deleteGallery() {}

  function rate() {}

  function viewImage({ image }) {
    if (image && !image.rating) {
      setViewingImage(image)
    } else if (!image) {
      setViewingImage(image)
    }
  }

  function getOwnerRating(image) {
    let owner = image.raters.filter(
      (x) => x.username === localStorage.username
    )[0]

    if (owner) {
      return `${owner.rating} (${owner.rating / owner.multiplier} * ${
        owner.multiplier
      })`
    }
  }

  return (
    <div>
      <Head>
        <title>Rater</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Do you really want to delete this gallery?</DialogTitle>
        <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
        <Button onClick={deleteGallery}>Yes, Delete Is!</Button>
      </Dialog>

      {gallery && (
        <>
          {!!viewingImage && (
            <ViewImage
              asAdmin={gallery.owner === localStorage.username}
              // message={this.state.message}
              rate={rate}
              viewingImage={viewingImage}
              viewImage={viewImage}
            />
          )}

          <div
            style={{
              padding: `3rem`,
            }}
          >
            <div>Gallery: {gallery.name}</div>
          </div>

          {gallery.owner === localStorage.username && (
            <GalleryAdminView
              gallery={gallery}
              colorPickerOpen={colorPickerOpen}
              openColorPicker={() => setColorPickerOpen(true)}
              setColor={setColor}
              togglePublic={togglePublic}
              openDeleteModal={() => setDeleteModalOpen(true)}
            />
          )}

          <div>
            <span>Submission Deadline:</span>
            <span style={{ paddingLeft: `0.4rem` }}>
              {gallery.submitDeadline}
              {/* `MMMM Do YYYY, h:mm:ss a` */}
              {/* )} */}
            </span>
          </div>

          {gallery.owner !== localStorage.username && (
            <GalleryUserView
              gallery={gallery}
              userImage={userImage}
              dataUrl={dataUrl}
              imageSize={imageSize}
              clearDataUrl={() => setDataUrl(null)}
              uploadFile={uploadFile}
              uploadToImgur={uploadToImgur}
              viewImage={viewImage}
              submitYoutube={(link) => setYoutubeLink(link)}
              clearYoutubelink={() => setYoutubeLink('')}
              saveToDb={async (...args) => {
                await saveToDb(...args)
                setDataUrl(null)
              }}
            />
          )}

          {gallery.owner === localStorage.username && (
            <div style={{ marginTop: `2rem` }}>
              <ResultsTable
                images={gallery.images}
                viewImage={viewImage}
                getOwnerRating={getOwnerRating}
              />
            </div>
          )}
        </>
      )}

      {needToAuth && (
        <GalleryLogin
          getGallery={getGallery}
          //  message={message}
        />
      )}
    </div>
  )
}
