import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Box } from '@mui/material'
import StarRating from 'components/StarRating'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.token) {
      router.push('/galleries')
    }
  }, []) // eslint-disable-line

  return (
    <Box
      sx={{
        bgcolor: '#3b3b8e',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Head>
        <title>Rater</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          transform: 'translateY(-100px)',
        }}
      >
        <Box
          data-cy="rater-logo"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '42px',
            letterSpacing: '20px',
            ml: '16px',
          }}
        >
          RATER
        </Box>
        <StarRating rate={() => {}} />
      </Box>
      <Link href="/login">
        <Button
          data-cy="get-started-btn"
          variant="text"
          sx={{
            transform: 'translateY(-50px)',
            color: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          Get Started
        </Button>
      </Link>
    </Box>
  )
}
