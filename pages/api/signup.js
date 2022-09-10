import crypto from 'crypto'
import connect from 'lib/middleware/connectToDb'

const SECRET = 'wubbalubbadubdub'

export default async function handler(req, res) {
  const db = connect()

  let { username, password } = req.body

  if (username && password) {
    db.findOne({
      collection: 'users',
      filter: { username },
    }).then((result) => {
      const user = result.document

      if (user) {
        res.status(400).json({
          success: false,
          message: `User with this username already exists.`,
        })
      } else {
        const hash = crypto
          .createHmac('sha256', SECRET)
          .update(password)
          .digest('hex')

        let document = { username, password: hash }

        if (username === `admin`) document.admin = true

        db.insertOne({
          collection: 'users',
          document,
        }).then(() => {
          res.status(200).json({ success: true })
        })
      }
    })
  } else
    res.status(400).json({
      success: false,
      message: `Must provide username and password.`,
    })
}
