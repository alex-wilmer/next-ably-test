import { useState } from 'react'
import Head from 'next/head'
import Header from 'components/Header'
import Link from 'next/link'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import useGalleryApi from 'lib/hooks/useGalleryApi'

let deadlineDate, deadlineTime

export default function NewGalleryForm() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [deadline, setDeadline] = useState(Date.now())
  const { createGallery } = useGalleryApi()

  return (
    <div>
      <Head>
        <title>Rater | New Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div
        style={{
          marginTop: '2rem',
          height: `calc(100% - 5rem)`,
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `center`,
          alignItems: `center`,
        }}
      >
        <div
          style={{
            display: `flex`,
            flexDirection: `column`,
          }}
        >
          <h2>New Gallery:</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name.."
            type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password.."
            type="text"
          />
          <hr />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date&Time picker"
              value={deadline}
              onChange={(date) => {
                setDeadline(date)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <div
            style={{
              marginTop: `1.5rem`,
            }}
          >
            <button
              style={{
                width: `100%`,
                marginBottom: `1rem`,
              }}
              onClick={async () => {
                const response = await createGallery({
                  name,
                  password,
                  submitDeadline: +deadline,
                })
              }}
            >
              Create
            </button>
            <Link href="/">
              <a>
                <button
                  style={{
                    width: `100%`,
                  }}
                >
                  Cancel
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
