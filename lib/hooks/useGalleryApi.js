import { useState } from 'react'
import { useRouter } from 'next/router'
import useChannel from 'lib/hooks/useChannel'

function useGalleryApi() {
  const router = useRouter()
  const { gid } = router.query
  const [galleries, setGalleries] = useState([])
  const [gallery, setGallery] = useState(null)
  const [needToAuth, setNeedToAuth] = useState(false)
  const [userImage, setUserImage] = useState(null)
  const [multiplier, setMultiplier] = useState(5)
  const [message, setMessage] = useState('')
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [galleryPassword, setGalleryPassword] = useState('')

  const [channel] = useChannel('gallery', (message) => {
    if (gallery._id === message.data.galleryId) {
      getGallery({ password: galleryPassword })
    }
  })

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
    const galleries = await fetch('api/galleries', {
      method: `POST`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.token,
        userId: localStorage.userId,
        username: localStorage.username,
      }),
    }).then((r) => r.json())

    setGalleries(galleries)
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

    channel.publish({
      name: 'newImage',
      data: {
        galleryId: gid,
      },
    })

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

    channel.publish({
      name: 'activateDeadline',
      data: {
        galleryId: gid,
      },
    })

    setGallery(() => gallery)
  }

  async function setColor(color) {
    const gallery = await fetch(`/api/gallerySetColor`, {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify({
        token: localStorage.token,
        galleryId: gid,
        color,
      }),
    }).then((r) => r.json())

    setGallery(() => gallery)
    setColorPickerOpen(() => false)

    channel.publish({
      name: 'setColor',
      data: {
        galleryId: gid,
      },
    })
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

    channel.publish({
      name: 'togglePublic',
    })
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

      channel.publish({
        name: 'setColor',
        data: {
          galleryId: gid,
        },
      })
    } else {
      console.log(message)
    }
  }

  async function deleteGallery(galleryId) {
    await fetch('/api/galleryDelete', {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify({
        token: localStorage.token,
        galleryId: galleryId || gid,
      }),
    })

    router.push('/galleries')
    getGalleries()
  }

  return {
    galleries,
    setGalleries,
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
    setColor,
    colorPickerOpen,
    setColorPickerOpen,
    galleryPassword,
    setGalleryPassword,
  }
}

export default useGalleryApi
