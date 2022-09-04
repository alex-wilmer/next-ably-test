import Gallery from 'lib/models/gallery'
import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'
import connect from 'lib/middleware/connectToDb'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  await connect()

  Gallery.find(
    { $or: [{ owner: req.body.username }, { public: true }] },
    (err, galleries) => {
      res.status(200).json(galleries)
    }
  )
}
