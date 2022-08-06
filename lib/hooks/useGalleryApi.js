import { useState } from 'react'
import { useRouter } from 'next/router'

function useGalleryApi() {
  const router = useRouter()
  const { gid } = router.query
  const [gallery, setGallery] = useState(null)
  const [needToAuth, setNeedToAuth] = useState(false)
  const [userImage, setUserImage] = useState(null)

  async function createGallery({ name, password, submitDeadline }) {
    let body = {
      name,
      password,
      submitDeadline,
      owner: localStorage.username,
      token: localStorage.token,
    }

    return await fetch(`api/newgallery`, {
      method: `POST`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => r.json())

    // let { success, galleryId } = await response.json()

    // if (success) {
    //   this.setState({ nextPathname: `/gallery/${galleryId}` }, () =>
    //     this.setState({ nextPathname: null })
    //   )
    // }
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
        this.setState({ message: gallery.message })
      }
    } else {
      let userImage = gallery.images.filter(
        (x) => x.username === localStorage.username
      )[0]

      if (userImage) {
        setUserImage(userImage)
      }

      setGallery(gallery)
      setNeedToAuth(false)
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

  return {
    getGalleries,
    createGallery,
    getGallery,
    gallery,
    needToAuth,
    userImage,
    saveToDb,
  }
}

export default useGalleryApi
