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
      if (
        gallery.owner === req.body.username ||
        gallery.password === req.body.password
      ) {
        res.status(200).json(gallery)
      } else {
        let response = {
          needToAuth: true,
        }
        if (req.body.password) {
          response.message = `Wrong password.`
        }
        res.status(400).json(response)
      }
    }
  })
}
