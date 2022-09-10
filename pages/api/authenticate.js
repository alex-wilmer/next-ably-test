import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import connect from 'lib/middleware/connectToDb'

const SECRET = 'wubbalubbadubdub'

export default async function handler(req, res) {
  const db = connect()
  let { username, password } = req.body

  db.findOne({
    collection: 'users',
    filter: { username },
  }).then((result) => {
    const user = result.document

    if (!user) {
      res.status(400).json({ success: false, message: 'User not found.' })
    } else if (user) {
      // check if password matches
      const hash = crypto
        .createHmac('sha256', SECRET)
        .update(password)
        .digest('hex')

      if (user.password !== hash) {
        res.status(400).json({ success: false, message: 'Wrong password.' })
      } else {
        let token = jwt.sign(
          {
            username: user.username,
            password: user.password,
          },
          SECRET,
          {
            expiresIn: 1440 * 6000, // don't expire or ages
          }
        )

        res.status(200).json({
          success: true,
          message: 'Enjoy your token!',
          token,
          user,
        })
      }
    }
  })
}
