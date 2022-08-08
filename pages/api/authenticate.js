import User from 'lib/models/user'
import crypto from 'crypto'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const SECRET = 'wubbalubbadubdub'

export default function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)

  let { username, password } = req.body

  User.findOne({ username }, (err, user) => {
    if (err) throw err

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
