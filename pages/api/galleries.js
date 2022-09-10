import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'
import connect from 'lib/middleware/connectToDb'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  const db = connect()

  db.find({
    collection: 'galleries',
    filter: { $or: [{ owner: req.body.username }, { public: true }] },
  }).then((result) => {
    res.status(200).json(result.documents)
  })
}
