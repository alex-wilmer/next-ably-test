import Gallery from 'lib/models/gallery'
import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'
import activateDeadline from 'lib/activateDeadline'
import connect from 'lib/middleware/connectToDb'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  await connect()

  Gallery.findOne({ _id: req.body.galleryId }, (err, gallery) => {
    if (gallery && gallery.owner === req.body.username) {
      gallery = activateDeadline(gallery)

      gallery.markModified(`images`)

      gallery.save((err, gallery) => {
        console.log(`deadline activated: ${gallery.submitDeadline}`)
        res.status(200).json({ gallery })
      })

      // TODO: notify users by email that its time to vote
    }
  })
}
