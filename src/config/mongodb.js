// heobovidai
// br2IbjFDhvI53qU5
const MONGODB_URI =
  'mongodb+srv://heobovidai:br2IbjFDhvI53qU5@cluster0.nvzxs73.mongodb.net/?appName=Cluster0'
const DATABASE_NAME = 'trello-database'

import { MongoClient, ServerApiVersion } from 'mongodb'

let trelloDatabaseInstance = null

//khoi tao doi tuong connect toi mongodb
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  // goi connect toi MongoAtlas voi URI duoc khai bao trong mongoClientInstance
  await mongoClientInstance.connect()

  // connect thanh cong thi lay database va gan nguoc laij vao trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first')
  return trelloDatabaseInstance
}
