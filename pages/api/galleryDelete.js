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
  }).then(() => {
    console.log(`Gallery removed!`)
    res.status(200).json({ message: `Gallery removed!` })
  })
}
