import { useState } from 'react'
import { Button } from '@mui/material'

export default function StarRating({ rate, showSubmit = true }) {
  const [rating, setRating] = useState(0)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <fieldset
        className="rating"
        style={{
          textAlign: `center`,
          marginTop: `1rem`,
        }}
      >
        <input
          className="star"
          type="radio"
          name="rating"
          id={`star1`}
          onClick={() => setRating(5)}
        />
        <label className="full" htmlFor={`star1`}>
          ★
        </label>
        <input
          className="star"
          type="radio"
          name="rating"
          id={`star2`}
          onClick={() => setRating(4)}
        />
        <label className="full" htmlFor={`star2`}>
          ★
        </label>
        <input
          className="star"
          type="radio"
          name="rating"
          id={`star3`}
          onClick={() => setRating(3)}
        />
        <label className="full" htmlFor={`star3`}>
          ★
        </label>
        <input
          className="star"
          type="radio"
          name="rating"
          id={`star4`}
          onClick={() => setRating(2)}
        />
        <label className="full" htmlFor={`star4`}>
          ★
        </label>
        <input
          className="star"
          type="radio"
          name="rating"
          id={`star5`}
          onClick={() => setRating(1)}
        />
        <label className="full" htmlFor={`star5`}>
          ★
        </label>
      </fieldset>
      {showSubmit && (
        <Button
          style={{ width: '200px' }}
          variant="contained"
          onClick={() => rate(rating)}
        >
          Submit
        </Button>
      )}
    </div>
  )
}
