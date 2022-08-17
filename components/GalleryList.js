import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from 'components/Header'
import Link from 'next/link'
import useGalleryApi from 'lib/hooks/useGalleryApi'
import useChannel from 'lib/hooks/useChannel'
import GalleriesTable from './GalleriesTable'
import { Container, Button } from '@mui/material'

export default function Galleries() {
  const { getGalleries } = useGalleryApi()
  const [galleries, setGalleries] = useState([])
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    async function req() {
      const response = await getGalleries()
      // todo: response could be error with no token provided message
      // handle all auth errors somewhere
      if (response) setGalleries(response)

      setAdmin(localStorage.admin === 'true')
    }

    req()
  }, [])

  useChannel('gallery', async (message) => {
    if (message.name === 'togglePublic') {
      const response = await getGalleries()
      // todo: response could be error with no token provided message
      // handle all auth errors somewhere
      if (response) setGalleries(response)
    }
  })

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

      <Container sx={{ pt: '1rem' }}>
        <div
          style={{
            display: `flex`,
            flexWrap: `wrap`,
          }}
        >
          {admin && (
            <Link href="/new-gallery">
              <Button variant="contained" data-cy="new-gallery-btn">
                <div>New Gallery</div>
              </Button>
            </Link>
          )}
          <GalleriesTable galleries={galleries} />
        </div>
      </Container>
    </div>
  )
}
