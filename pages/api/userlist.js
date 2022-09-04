import User from 'lib/models/user'
import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'
import connect from 'lib/middleware/connectToDb'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  await connect()

  User.find({}, (err, users) => {
    res.status(200).json({ users: users.map((x) => x.username) })
  })
}
