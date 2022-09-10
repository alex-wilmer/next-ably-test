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
      gallery.color = `${req.body.color.hex}`

      db.updateOne({
        collection: 'galleries',
        filter: {
          _id: {
            $oid: req.body.galleryId,
          },
        },
        update: omit(gallery, '_id'),
      }).then(() => {
        res.status(200).json(gallery)
      })
    }
  })
}
