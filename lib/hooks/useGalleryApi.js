function useGalleryApi() {
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

  return { getGalleries, createGallery }
}

export default useGalleryApi
