import mongoose from 'mongoose'
import User from '../../lib/models/user'
import verifyToken from '../../lib/middleware/verifyToken'
import runMiddleware from '../../lib/middleware/runMiddleware'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  mongoose.connect(process.env.MONGODB_URI)

  User.find({}, (err, users) => {
    res.status(200).json({ users: users.map((x) => x.username) })
  })
}
