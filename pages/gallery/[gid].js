import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useGalleryApi from '../../lib/hooks/useGalleryApi'
import GalleryAdminView from '../../components/GalleryAdminView'
// import { TwitterPicker as ColorPicker } from 'react-color'
// import moment from 'moment'
// import Dialog from 'material-ui/Dialog'
// import FlatButton from 'material-ui/FlatButton'
// import { API } from '../config'
// import GalleryLogin from './GalleryLogin'
// import GalleryUserView from './GalleryUserView'
// import ResultsTable from './ResultsTable'
// import ViewImage from './ViewImage'

// state = {
//   gallery: {},
//   dataUrl: null,
//   imageSize: null,
//   userImage: null,
//   viewingImage: null,
//   loading: true,
//   deleteModalOpen: false,
// }

// componentDidMount() {
//   this.getGallery({})

//   this.props.socket.on(`api:updateGallery`, (gallery) => {
//     if (!this.state.needToAuth) {
//       let userImage = (gallery.images || []).find(
//         (x) => x.username === localStorage.username
//       )

//       if (userImage) {
//         this.setState({ userImage })
//       }

//       if (gallery.color) this.props.setHeaderColor(gallery.color)

//       this.setState({ gallery })
//     }
//   })
// }

// openDeleteModal = () => this.setState({ deleteModalOpen: true })
// closeDeleteModal = () => this.setState({ deleteModalOpen: false })

// getGallery = async ({ password }) => {
//   let { params, setHeaderColor } = this.props

//   let response = await fetch(`${API}/api/gallery`, {
//     method: `POST`,
//     headers: { 'Content-Type': `application/json` },
//     body: JSON.stringify({
//       token: localStorage.token,
//       galleryId: params.galleryId,
//       username: localStorage.username,
//       password,
//     }),
//   })

//   let gallery = await response.json()

//   if (gallery.color) setHeaderColor(gallery.color)

//   if (gallery.needToAuth) {
//     this.setState({ needToAuth: true })
//     if (gallery.message) {
//       this.setState({ message: gallery.message })
//     }
//   } else {
//     let userImage = gallery.images.filter(
//       (x) => x.username === localStorage.username
//     )[0]

//     if (userImage) {
//       this.setState({ userImage })
//     }

//     this.setState({
//       gallery,
//       needToAuth: false,
//     })
//   }

//   this.setState({ loading: false })
// }

// uploadFile = (event) => {
//   let files = event.target.files

//   if (!files.length) {
//     return console.log(`no file chosen`)
//   }

//   let file = files[0]
//   let fileReader = new FileReader()
//   let img = new Image()
//   let _URL = window.URL || window.webkitURL
//   img.src = _URL.createObjectURL(file)

//   fileReader.onload = (event) => {
//     let dataUrl = event.target.result
//     this.setState({
//       dataUrl,
//       imageSize: {
//         width: img.width,
//         height: img.height,
//       },
//     })
//   }

//   fileReader.readAsDataURL(file)
// }

// clearDataUrl = () => {
//   this.setState({ dataUrl: null })
// }

// uploadToImgur = async ({ caption }) => {
//   let format = (string) => {
//     let [type, ...data] = string.split(',') // eslint-disable-line
//     return data.join()
//   }

//   this.setState({ loading: true })

//   let response = await fetch(`https://api.imgur.com/3/image`, {
//     method: `POST`,
//     headers: {
//       Authorization: `Client-ID dddbdc53f65b3e2`,
//       Accept: `application/json`,
//       'Content-Type': `application/json`,
//     },
//     body: JSON.stringify({
//       image: format(this.state.dataUrl),
//       type: `base64`,
//     }),
//   })

//   let { data } = await response.json()

//   if (data.link) {
//     this.setState({ dataUrl: null })

//     this.saveToDb({
//       link: data.link,
//       width: data.width,
//       height: data.height,
//       caption,
//     })
//   }

//   this.setState({ loading: false })
// }

// saveToDb = async ({ link, width, height, caption }) => {
//   let { params } = this.props

//   let response = await fetch(`${API}/api/gallery/image`, {
//     method: `POST`,
//     headers: { 'Content-Type': `application/json` },
//     body: JSON.stringify({
//       token: localStorage.token,
//       galleryId: params.galleryId,
//       username: localStorage.username,
//       link,
//       caption,
//       width,
//       height,
//     }),
//   })

//   let { image } = await response.json()
//   this.setState({ userImage: image, youtubeLink: `` })
// }

// activateDeadline = async () => {
//   let { params } = this.props

//   let response = await fetch(`${API}/api/gallery/activate`, {
//     method: `POST`,
//     headers: { 'Content-Type': `application/json` },
//     body: JSON.stringify({
//       token: localStorage.token,
//       galleryId: params.galleryId,
//       username: localStorage.username,
//     }),
//   })

//   let json = await response.json()
//   this.setState({ gallery: json.gallery })
// }

// viewImage = ({ image }) => {
//   if (image && !image.rating) {
//     this.setState({ viewingImage: image })
//   } else if (!image) {
//     this.setState({ viewingImage: image })
//   }
// }

// rate = async ({ viewingImage, rating, feedback }) => {
//   let { params } = this.props

//   let multiplier = +(this.refs.multiplier || {}).value

//   let ratingSpec = {
//     token: localStorage.token,
//     galleryId: params.galleryId,
//     username: localStorage.username,
//     viewingImage,
//     rating,
//     multiplier,
//   }

//   if (this.state.gallery.owner === localStorage.username) {
//     ratingSpec.feedback = feedback
//   }

//   let response = await fetch(`${API}/api/gallery/vote`, {
//     method: `POST`,
//     headers: { 'Content-Type': `application/json` },
//     body: JSON.stringify(ratingSpec),
//   })

//   let { gallery, success, message } = await response.json()

//   if (success) {
//     this.setState({
//       userImage: gallery.images.filter(
//         (x) => x.username === localStorage.username
//       )[0],
//       gallery,
//       message: `Thank you!`,
//     })

//     setTimeout(() => {
//       this.setState({
//         message: null,
//         viewingImage: null,
//       })
//     }, 1000)
//   } else {
//     console.log(message)
//   }
// }

// getOwnerRating = (image) => {
//   let owner = image.raters.filter(
//     (x) => x.username === localStorage.username
//   )[0]

//   if (owner) {
//     return `${owner.rating} (${owner.rating / owner.multiplier} * ${
//       owner.multiplier
//     })`
//   }
// }

// setColor = (color) => {
//   this.props.socket.emit(`ui:setGalleryColor`, {
//     color,
//     _id: this.state.gallery._id,
//   })
//   this.setState({ colorPickerOpen: false })
// }

// togglePublic = () => {
//   this.props.socket.emit(`ui:togglePublic`, {
//     _id: this.state.gallery._id,
//   })
// }

// deleteGallery = async () => {
//   let { params, history } = this.props

//   await fetch(`${API}/api/gallery/delete`, {
//     method: `POST`,
//     headers: { 'Content-Type': `application/json` },
//     body: JSON.stringify({
//       token: localStorage.token,
//       galleryId: params.galleryId,
//     }),
//   })

//   history.push('/')
// }

// submitYoutube = ({ youtubeLink }) => {
//   this.setState({ youtubeLink })
// }

// clearYoutubelink = () => this.setState({ youtubeLink: `` })

// render() {

export default function Gallery() {
  const router = useRouter()
  const { gid } = router.query
  const [gallery, setGallery] = useState()
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const { getGallery } = useGalleryApi()

  useEffect(() => {
    if (!gid) return

    async function req() {
      const response = await getGallery({ galleryId: gid })
      if (response) {
        setGallery(response)
      }
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

  let actions = [
    // <FlatButton
    //   key="button1"
    //   label="Cancel"
    //   secondary={true}
    //   onClick={this.closeDeleteModal}
    // />,
    // <FlatButton
    //   key="button2"
    //   label="Yes, Delete It!"
    //   primary={true}
    //   keyboardFocused={true}
    //   onClick={this.deleteGallery}
    // />,
  ]

  return (
    <div>
      {gallery && (
        <>
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
        </>
      )}
    </div>
  )
}
