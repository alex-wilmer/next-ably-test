import { omit } from 'lodash'
import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'
import connect from 'lib/middleware/connectToDb'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  const db = connect()

  db.findOne({
    collection: 'galleries',
    filter: {
      _id: {
        $oid: req.body.galleryId,
      },
    },
  }).then((result) => {
    const gallery = result.document
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

        db.updateOne({
          collection: 'galleries',
          filter: {
            _id: {
              $oid: req.body.galleryId,
            },
            'images.username': req.body.username,
          },
          update: {
            $set: { 'images.$': image },
          },
        }).then(() => {
          res.status(200).json({ image })
        })
      } else {
        const document = {
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

        db.updateOne({
          collection: 'galleries',
          filter: {
            _id: {
              $oid: req.body.galleryId,
            },
          },
          update: {
            $addToSet: { images: document },
          },
        }).then(() => {
          res.status(200).json({ image: document })
        })
      }
    }
  })
}
