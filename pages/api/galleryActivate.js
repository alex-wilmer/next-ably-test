import mongoose from 'mongoose'
import Gallery from 'lib/models/gallery'
import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'
import activateDeadline from 'lib/activateDeadline'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  mongoose.connect(process.env.MONGODB_URI)

  Gallery.findOne({ _id: req.body.galleryId }, (err, gallery) => {
    if (gallery && gallery.owner === req.body.username) {
      gallery = activateDeadline(gallery)

      gallery.markModified(`images`)

      gallery.save((err, gallery) => {
        console.log(`${gallery} deadline activated: ${gallery.submitDeadline}`)
        io.emit(`api:updateGallery`, gallery)
        res.status(200).json({ gallery })
      })

      // TODO: notify users by email that its time to vote
    }
  })
}
