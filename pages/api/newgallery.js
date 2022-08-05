import Gallery from '../../lib/models/user'

export default async function handler(req, res) {
  let { owner, name, password, submitDeadline } = req.body

  if (name && password) {
    Gallery.findOne({ name }, (err, gallery) => {
      if (err) throw err
      if (gallery) res.json({ error: `Gallery with this name already exists.` })
      else {
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

          res.json({
            success: true,
            galleryId: g._id,
          })
        })
      }
    })
  } else res.json({ error: `Must provide name and password.` })
}
