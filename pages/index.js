import dynamic from 'next/dynamic'
import Link from 'next/link'
import Head from 'next/head'
import Header from 'components/Header'

// const AblyChatComponent = dynamic(() => import('../components/AblyChatComponent'), { ssr: false });

export default function Home() {
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

      <Link href="/galleries">
        <a
          style={{
            marginLeft: `1rem`,
            color: `#f0ff3e`,
          }}
        >
          See Galleries
        </a>
      </Link>
    </div>
  )
}
