// import React, { Component } from 'react'
// import { API } from '../config'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import useGalleryApi from '../lib/hooks/useGalleryApi'

// export default class Home extends Component {
//   state = { galleries: [] }

//   componentDidMount() {
//     this.getGalleries()

//     this.props.socket.on(`api:updateGallery`, gallery => {
//       if (!this.state.galleries.some(x => x._id === gallery._id)) {
//         this.setState(s => ({ galleries: s.galleries.concat(gallery) }))
//       }
//     })
//   }

export default function Galleries({ admin = true }) {
  const { getGalleries } = useGalleryApi()
  const [galleries, setGalleries] = useState([])

  useEffect(() => {
    async function req() {
      const response = await getGalleries()
      if (response) setGalleries(response)
    }

    req()
  }, [])

  return (
    <div>
      <div
        style={{
          display: `flex`,
          flexWrap: `wrap`,
        }}
      >
        {admin && (
          <Link href="/new-gallery">
            <a
              style={{
                width: `15rem`,
                height: `7rem`,
                border: `2px solid rgb(59, 150, 80)`,
                display: `flex`,
                flexDirection: `column`,
                justifyContent: `center`,
                alignItems: `center`,
                margin: `1rem`,
              }}
            >
              <div>+</div>
              <div>New Gallery</div>
            </a>
          </Link>
        )}

        {galleries.map((g) => (
          <Link href={`/gallery/${g._id}`} key={g._id}>
            <a
              style={{
                width: `15rem`,
                height: `7rem`,
                border: `2px solid ${g.color || `rgb(27, 173, 112)`}`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                margin: `1rem`,
              }}
            >
              {g.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
