import mongoose from 'mongoose'
import Gallery from '../../lib/models/gallery'
import verifyToken from '../../lib/middleware/verifyToken'
import runMiddleware from '../../lib/middleware/runMiddleware'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  mongoose.connect(process.env.MONGODB_URI)

  Gallery.findOne({ _id: req.body.galleryId }, (err, gallery) => {
    if (gallery) {
      if (
        gallery.owner === req.body.username ||
        gallery.password === req.body.password
      ) {
        res.status(200).json(gallery)
      } else {
        let response = {
          needToAuth: true,
        }
        if (req.body.password) {
          response.message = `Wrong password.`
        }
        res.status(400).json(response)
      }
    }
  })
}
