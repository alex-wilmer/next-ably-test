import Link from 'next/link'
import useAuth from 'lib/hooks/useAuth'
import { Box } from '@mui/material'

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
        <Box
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '24px',
            letterSpacing: '6px',
            ml: '16px',
          }}
        >
          RATER
        </Box>
      </Link>
      {localValues.isAdmin && (
        <Link href="/userlist">
          <a
            style={{
              marginLeft: `1rem`,
              color: `white`,
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
    </div>
  )
}

export default Header
