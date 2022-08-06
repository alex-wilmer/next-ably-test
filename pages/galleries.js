import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import useGalleryApi from 'lib/hooks/useGalleryApi'
import Header from 'components/Header'

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
    <div
      className="container"
      style={{
        height: `100%`,
      }}
    >
      <Head>
        <title>Rater | Galleries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

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
