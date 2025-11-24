import { env } from '@/config/environment'
import { MongoClient, ServerApiVersion } from 'mongodb'
let trelloDatabaseInstance = null

//khoi tao doi tuong connect toi mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
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
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first')
  return trelloDatabaseInstance
}

// Dong connection cua DB khi can
export const CLOSE_DB = async () => {
  console.log('3. Server is shutting down...')
  await mongoClientInstance.close()
}
