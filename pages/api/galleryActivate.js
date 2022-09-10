import { omit } from 'lodash'
import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'
import activateDeadline from 'lib/activateDeadline'
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
    let gallery = result.document

    if (gallery && gallery.owner === req.body.username) {
      gallery = activateDeadline(gallery)

      db.updateOne({
        collection: 'galleries',
        filter: {
          _id: {
            $oid: req.body.galleryId,
          },
        },
        update: omit(gallery, '_id'),
      }).then(() => {
        console.log(`deadline activated: ${gallery.submitDeadline}`)
        res.status(200).json({ gallery })
      })

      // TODO: notify users by email that its time to vote
    }
  })
}
