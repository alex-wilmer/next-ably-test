import User from 'lib/models/user'
import crypto from 'crypto'
import mongoose from 'mongoose'

const SECRET = 'wubbalubbadubdub'

export default function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)

  let { username, password } = req.body

  if (username && password) {
    User.findOne({ username }, (err, user) => {
      if (err) throw err
      if (user)
        res.status(400).json({
          success: false,
          message: `User with this username already exists.`,
        })
      else {
        const hash = crypto
          .createHmac('sha256', SECRET)
          .update(password)
          .digest('hex')

        let user = new User({ username, password: hash })

        if (username === `admin`) user.admin = true

        user.save((err) => {
          if (err) throw err
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
