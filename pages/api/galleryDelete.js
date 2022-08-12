import mongoose from 'mongoose'
import Gallery from 'lib/models/gallery'
import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  mongoose.connect(process.env.MONGODB_URI)

  Gallery.remove({ _id: req.body.galleryId }, (err) => {
    if (err) throw err
    console.log(`Gallery removed!`)
    res.status(200).json({ message: `Gallery removed!` })
  })
}
