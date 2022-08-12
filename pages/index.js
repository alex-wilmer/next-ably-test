import { useEffect } from 'react'
import Head from 'next/head'
import Header from 'components/Header'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.token) {
      router.push('/galleries')
    }
  }, []) // eslint-disable-line

  return (
    <div
      className="container"
      style={{
        height: `100%`,
      }}
    >
      <Head>
        <title>Rater</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </div>
  )
}
