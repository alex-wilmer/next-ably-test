import Gallery from 'lib/models/gallery'
import verifyToken from 'lib/middleware/verifyToken'
import runMiddleware from 'lib/middleware/runMiddleware'
import calculateCriticalAssessmentScores from 'lib/calculateCriticalAssessmentScores'
import connect from 'lib/middleware/connectToDb'

export default async function handler(req, res) {
  await runMiddleware(req, res, verifyToken)
  await connect()

  Gallery.findOne({ _id: req.body.galleryId }, (err, gallery) => {
    if (gallery) {
      let image = gallery.images.filter(
        (x) => x.link === req.body.viewingImage.link
      )[0]

      let userImage = gallery.images.filter(
        (x) => x.username === req.body.username
      )[0]

      /*
       *  Admin Vote
       */

      if (gallery.owner === req.body.username) {
        image.raters = [
          ...image.raters.filter((x) => x.username !== req.body.username),
          {
            username: req.body.username,
            rating: req.body.rating * req.body.multiplier,
            multiplier: req.body.multiplier,
          },
        ]

        image.averageRating =
          image.raters.reduce((acc, rater) => {
            return acc + rater.rating
          }, 0) /
          (image.raters.length + (req.body.multiplier - 1))

        if (req.body.feedback) {
          // admin feedback
          image.feedback = req.body.feedback
        }

        gallery.images = [
          ...gallery.images.filter(
            (x) => x.link !== req.body.viewingImage.link
          ),
          image,
        ]

        gallery = calculateCriticalAssessmentScores(gallery)
      }

      /*
       *  User vote
       */

      if (image && userImage) {
        let userImageToRate = userImage.imagesToRate.filter(
          (x) => x.link === req.body.viewingImage.link
        )[0]

        if (!userImageToRate.rating) {
          image.raters = [
            ...image.raters,
            {
              username: req.body.username,
              rating: req.body.rating,
            },
          ]

          let ownerRate = image.raters.filter((x) => x.multiplier)[0]

          let multiplier = ownerRate ? ownerRate.multiplier - 1 : 0

          image.averageRating =
            image.raters.reduce((acc, rater) => {
              return acc + rater.rating
            }, 0) /
            (image.raters.length + multiplier)

          userImageToRate.rating = req.body.rating

          userImage.imagesToRate = [
            ...userImage.imagesToRate.filter(
              (x) => x.link !== req.body.viewingImage.link
            ),
            userImageToRate,
          ]

          gallery.images = [
            ...gallery.images.filter(
              (x) =>
                x.username !== req.body.username &&
                x.link !== req.body.viewingImage.link
            ),
            image,
            userImage,
          ]

          gallery = calculateCriticalAssessmentScores(gallery)
        } else {
          res.status(200).json({
            success: false,
            message: `Already voted!`,
          })
        }
      }

      gallery.markModified(`images`)

      gallery.save((err, gallery) => {
        console.log(
          `${req.body.username} rated ${req.body.rating} on ${image.link}`
        )

        res.status(200).json({
          gallery,
          success: true,
        })
      })
    }
  })
}
