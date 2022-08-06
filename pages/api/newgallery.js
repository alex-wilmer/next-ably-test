import mongoose from 'mongoose'
import Gallery from 'lib/models/gallery'
import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  mongoose.connect(process.env.MONGODB_URI)

  let { owner, name, password, submitDeadline } = req.body

  if (name && password) {
    Gallery.findOne({ name }, (err, gallery) => {
      if (err) throw err

      console.log({ gallery })

      if (gallery) {
        res
          .status(400)
          .json({ error: `Gallery with this name already exists.` })
      } else {
        let gallery = new Gallery({
          name,
          password,
          submitDeadline,
          owner,
          active: true,
          passedDeadline: false,
          createdDate: +new Date(),
          images: [],
        })

        gallery.save((err, g) => {
          if (err) throw err

          res.status(200).json({
            success: true,
            galleryId: g._id,
          })
        })
      }
    })
  } else res.status(400).json({ error: `Must provide name and password.` })
}
