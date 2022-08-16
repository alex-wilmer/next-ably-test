import { useState } from 'react'
import Head from 'next/head'
import Header from 'components/Header'
import Link from 'next/link'
import { Button } from '@mui/material'
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
          <TextField
            data-cy="gallery-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{ mb: '0.3rem' }}
          />
          <TextField
            data-cy="gallery-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            sx={{ mb: '0.6rem' }}
          />
          <hr />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Submission Deadline"
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
            <Button
              data-cy="create-gallery-btn"
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
            </Button>
            <Link href="/">
              <a>
                <Button
                  style={{
                    width: `100%`,
                  }}
                >
                  Cancel
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
