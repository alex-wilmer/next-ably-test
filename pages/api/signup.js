import User from 'lib/models/user'
import crypto from 'crypto'
import connect from 'lib/middleware/connectToDb'

const SECRET = 'wubbalubbadubdub'

export default async function handler(req, res) {
  await connect()

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
