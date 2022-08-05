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

  return { createGallery }
}

export default useGalleryApi
