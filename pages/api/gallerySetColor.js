import Gallery from 'lib/models/gallery'
import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'
import connect from 'lib/middleware/connectToDb'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  await connect()

  Gallery.findOne({ _id: req.body.galleryId }, (err, gallery) => {
    if (gallery) {
      gallery.color = `${req.body.color.hex}`

      gallery.save((err, gallery) => {
        res.status(200).json(gallery)
      })
    }
  })
}
