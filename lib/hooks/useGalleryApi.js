import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { getNativeSelectUtilityClasses } from '@mui/material'

function useGalleryApi() {
  const router = useRouter()
  const { gid } = router.query
  const [gallery, setGallery] = useState(null)
  const [needToAuth, setNeedToAuth] = useState(false)
  const [userImage, setUserImage] = useState(null)
  const [multiplier, setMultiplier] = useState(5)
  const [message, setMessage] = useState('')

  async function createGallery({ name, password, submitDeadline }) {
    let body = {
      name,
      password,
      submitDeadline,
      owner: localStorage.username,
      token: localStorage.token,
    }

    const { success, galleryId } = await fetch(`/api/galleryCreate`, {
      method: `POST`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => r.json())

    if (success) {
      router.push(`/gallery/${galleryId}`)
    }
  }

  async function getGalleries() {
    return await fetch('api/galleries', {
      method: `POST`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.token,
        userId: localStorage.userId,
        username: localStorage.username,
      }),
    }).then((r) => r.json())
  }

  async function getGallery({ password } = {}) {
    const gallery = await fetch(`/api/gallery`, {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify({
        token: localStorage.token,
        username: localStorage.username,
        galleryId: gid,
        password,
      }),
    }).then((r) => r.json())

    if (gallery.needToAuth) {
      setNeedToAuth(true)
      if (gallery.message) {
        setMessage(gallery.message)
      }
    } else {
      let userImage = gallery.images.filter(
        (x) => x.username === localStorage.username
      )[0]

      if (userImage) {
        setUserImage(userImage)
      }

      setMessage(() => '')
      setGallery(() => gallery)
      setNeedToAuth(() => false)
    }
  }

  async function saveToDb({ link, width, height, caption }) {
    const userImage = await fetch(`/api/galleryImage`, {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify({
        token: localStorage.token,
        galleryId: gid,
        username: localStorage.username,
        link,
        caption,
        width,
        height,
      }),
    }).then((r) => r.json())

    setUserImage(() => userImage.image)
  }

  async function activateDeadline() {
    const { gallery } = await fetch(`/api/galleryActivate`, {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify({
        token: localStorage.token,
        galleryId: gid,
        username: localStorage.username,
      }),
    }).then((r) => r.json())

    setGallery(() => gallery)
  }

  async function togglePublic() {
    let gallery = await fetch(`/api/galleryTogglePublic`, {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify({
        token: localStorage.token,
        galleryId: gid,
      }),
    }).then((r) => r.json())

    if (gallery) {
      setGallery(gallery)
    }

    // this.props.socket.emit(`ui:togglePublic`, {
    //   _id: this.state.gallery._id,
    // })
  }

  async function rate({ viewingImage, rating, feedback }) {
    let ratingSpec = {
      token: localStorage.token,
      galleryId: gid,
      username: localStorage.username,
      viewingImage,
      rating,
      multiplier,
    }

    if (gallery.owner === localStorage.username) {
      ratingSpec.feedback = feedback
    }

    let response = await fetch('/api/vote', {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify(ratingSpec),
    })

    let { gallery: g, success, message } = await response.json()

    if (success) {
      setUserImage(
        () => g.images.filter((x) => x.username === localStorage.username)[0]
      )

      setGallery(() => g)

      // setTimeout(() => {
      //   this.setState({
      //     message: null,
      //     viewingImage: null,
      //   })
      // }, 1000)
    } else {
      console.log(message)
    }
  }

  async function deleteGallery() {
    await fetch('/api/galleryDelete', {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify({
        token: localStorage.token,
        galleryId: gid,
      }),
    })

    router.push('/')
  }

  return {
    getGalleries,
    createGallery,
    getGallery,
    gallery,
    needToAuth,
    userImage,
    saveToDb,
    activateDeadline,
    togglePublic,
    rate,
    multiplier,
    setMultiplier,
    deleteGallery,
    message,
  }
}

export default useGalleryApi
