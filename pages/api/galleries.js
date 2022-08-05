import mongoose from 'mongoose'
import Gallery from '../../lib/models/gallery'
import verifyToken from '../../lib/middleware/verifyToken'
import runMiddleware from '../../lib/middleware/runMiddleware'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  mongoose.connect(process.env.MONGODB_URI)

  Gallery.find(
    { $or: [{ owner: req.body.username }, { public: true }] },
    (err, galleries) => {
      res.status(200).json(galleries)
    }
  )
}
