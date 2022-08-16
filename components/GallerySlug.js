import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { format } from 'date-fns'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Container from '@mui/material/Container'
import DialogTitle from '@mui/material/DialogTitle'
import Header from 'components/Header'
import useGalleryApi from 'lib/hooks/useGalleryApi'
import GalleryAdminView from 'components/GalleryAdminView'
import GalleryUserView from 'components/GalleryUserView'
import GalleryLogin from 'components/GalleryLogin'
import ViewImage from 'components/ViewingImage'
import ResultsTable from 'components/ResultsTable'

export default function Gallery() {
  const router = useRouter()
  const { gid } = router.query

  const {
    getGallery,
    gallery,
    needToAuth,
    userImage,
    saveToDb,
    activateDeadline,
    togglePublic,
    rate,
    deleteGallery,
    message,
    setColor,
    colorPickerOpen,
    setColorPickerOpen,
    galleryPassword,
    setGalleryPassword,
  } = useGalleryApi()

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
      setDataUrl(() => dataUrl)
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
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
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

      <Header color={gallery?.color} />

      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Do you really want to delete this gallery?</DialogTitle>
        <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
        <Button onClick={deleteGallery}>delete</Button>
      </Dialog>

      <Container sx={{ pt: '1rem' }}>
        <Box sx={{ mb: '1rem' }}>
          <Link href="/galleries">
            <a
              style={{
                color: `black`,
                fontSize: `1.4em`,
              }}
            >
              ← Back To Galleries
            </a>
          </Link>
        </Box>

        {gallery && (
          <>
            <ViewImage
              close={() => setViewingImage(null)}
              asAdmin={gallery.owner === localStorage.username}
              // message={this.state.message}
              rate={rate}
              viewingImage={viewingImage}
              viewImage={viewImage}
            />

            <Box sx={{ fontSize: '20px', mb: '0.3rem' }}>
              Gallery: {gallery.name}
            </Box>

            {gallery.owner === localStorage.username && (
              <GalleryAdminView
                activateDeadline={activateDeadline}
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
                {gallery.submitDeadline &&
                  format(+gallery.submitDeadline, 'MMMM do yyyy, h:mm a')}
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
                youtubeLink={youtubeLink}
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
            galleryPassword={galleryPassword}
            setGalleryPassword={setGalleryPassword}
            getGallery={getGallery}
            message={message}
          />
        )}
      </Container>
    </div>
  )
}
