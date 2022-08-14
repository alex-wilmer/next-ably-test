import mongoose from 'mongoose'
import Gallery from 'lib/models/gallery'
import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  mongoose.connect(process.env.MONGODB_URI)

  Gallery.findOne({ _id: req.body.galleryId }, (err, gallery) => {
    if (gallery) {
      let image = gallery.images.filter(
        (x) => x.username === req.body.username
      )[0]

      if (image) {
        image.link = req.body.link
        image.caption = req.body.caption
        image.width = req.body.width
        image.height = req.body.height
        image.uploadDate = +new Date()
      } else {
        image = {
          link: req.body.link,
          width: req.body.width,
          height: req.body.height,
          caption: req.body.caption,
          username: req.body.username,
          raters: [],
          imagesToRate: [],
          averageRating: 0,
          uploadDate: +new Date(),
        }
      }

      gallery.images = [
        ...gallery.images.filter((x) => x.username !== req.body.username),
        image,
      ]

      gallery.markModified('images')

      gallery.save((err, g) => {
        console.log(`Updated Gallery`, g)
        res.status(200).json({ image })
      })
    }
  })
}
