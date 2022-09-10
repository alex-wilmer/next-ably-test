import { createMongoDBDataAPI } from 'mongodb-data-api'

function connectToDb() {
  const db = createMongoDBDataAPI({
    apiKey: process.env.MONGO_ATLAS_DB_API_KEY,
    urlEndpoint: process.env.MONGO_ATLAS_URI,
  })
    .$cluster(process.env.MONGO_CLUSTER)
    .$database(process.env.MONGO_DB)

  return db
}

export default connectToDb
