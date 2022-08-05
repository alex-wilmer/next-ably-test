import mongoose from 'mongoose'

let Schema = mongoose.Schema
let schema = new Schema({
  username: String,
  password: String,
  admin: Boolean,
})
let User

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._userModel) {
    global._userModel = mongoose.model(`User`, schema)
  }
  User = global._userModel
} else {
  // In production mode, it's best to not use a global variable.
  User = mongoose.model(`User`, schema)
}

export default User
