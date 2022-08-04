import { useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// const AblyChatComponent = dynamic(() => import('../components/AblyChatComponent'), { ssr: false });

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [admin, setAdmin] = useState(true)
  const [username, setUsername] = useState('alex')

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
      <div
        className="z-depth-2"
        style={{
          // backgroundColor: this.state.headerColor,
          backgroundColor: 'blue',
          height: `5rem`,
          width: `100%`,
          padding: `0 3rem`,
          display: `flex`,
          alignItems: `center`,
          color: `white`,
        }}
      >
        <Link href="/">
          <a
            style={{
              color: `white`,
              fontSize: `1.4em`,
            }}
          >
            Rater
          </a>
        </Link>
        {admin && (
          <Link href="/userlist">
            <a
              style={{
                marginLeft: `1rem`,
                color: `#f0ff3e`,
              }}
            >
              USERLIST
            </a>
          </Link>
        )}
        {loggedIn && (
          <div
            style={{
              marginLeft: `auto`,
            }}
          >
            <span>Welcome, {username}</span>
            <a
              // onClick={this.logout}
              style={{
                marginLeft: `1rem`,
                color: `white`,
              }}
            >
              Log out
            </a>
          </div>
        )}
      </div>

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
