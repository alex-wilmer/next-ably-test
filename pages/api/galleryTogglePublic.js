import mongoose from 'mongoose'
import Gallery from '../../lib/models/gallery'
import verifyToken from '../../lib/middleware/verifyToken'
import runMiddleware from '../../lib/middleware/runMiddleware'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  mongoose.connect(process.env.MONGODB_URI)

  Gallery.findOne({ _id: req.body.galleryId }, (err, gallery) => {
    if (gallery) {
      gallery.public = !gallery.public

      gallery.save((err, gallery) => {
        // io.emit(`api:updateGallery`, gallery)
        res.status(200).json(gallery)
      })
    }
  })
}
