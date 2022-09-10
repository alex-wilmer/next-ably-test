import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'
import connect from 'lib/middleware/connectToDb'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  const db = connect()

  let { owner, name, password, submitDeadline } = req.body

  if (name && password) {
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
        res
          .status(400)
          .json({ error: `Gallery with this name already exists.` })
      } else {
        let document = {
          name,
          password,
          submitDeadline,
          owner,
          public: false,
          active: true,
          passedDeadline: false,
          createdDate: +new Date(),
          images: [],
        }

        db.insertOne({
          collection: 'galleries',
          document,
        }).then((result) => {
          res.status(200).json({
            success: true,
            galleryId: result.insertedId,
          })
        })
      }
    })
  } else res.status(400).json({ error: `Must provide name and password.` })
}
