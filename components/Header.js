import Link from 'next/link'
import useAuth from 'lib/hooks/useAuth'

function Header({ color }) {
  const { localValues, logout } = useAuth()

  return (
    <div
      className="z-depth-2"
      style={{
        backgroundColor: color || '#3b3b8e',
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
      {localValues.isAdmin && (
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
      {localValues.isLoggedIn && (
        <div
          style={{
            marginLeft: `auto`,
          }}
        >
          <span>Welcome, {localValues.username}</span>
          <a
            onClick={logout}
            style={{
              cursor: 'pointer',
              marginLeft: `1rem`,
              color: `white`,
            }}
          >
            Log out
          </a>
        </div>
      )}
      {!localValues.isLoggedIn && (
        <div
          style={{
            marginLeft: `auto`,
          }}
        >
          <Link href="/login">
            <a
              style={{
                cursor: 'pointer',
                marginLeft: `1rem`,
                color: `white`,
              }}
            >
              Get Started
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
