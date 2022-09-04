import mongoose from 'mongoose'

let cachedClient = null

async function connectToDb() {
  if (cachedClient) return
  const client = await mongoose.connect(process.env.MONGODB_URI)
  cachedClient = client
}

export default connectToDb
