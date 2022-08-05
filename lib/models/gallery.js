import mongoose from 'mongoose'

let Schema = mongoose.Schema
let schema = new Schema({
  name: String,
  password: String,
  submitDeadline: String,
  // voteDeadline: Date,
  active: Boolean,
  owner: String,
  createdDate: String,
  passedDeadline: Boolean,
  images: [],
  color: String,
  public: Boolean,
})
let Gallery

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._galleryModel) {
    global._galleryModel = mongoose.model(`Gallery`, schema)
  }
  Gallery = global._galleryModel
} else {
  // In production mode, it's best to not use a global variable.
  Gallery = mongoose.model(`Gallery`, schema)
}

export default Gallery
