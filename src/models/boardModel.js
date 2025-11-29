import Joi from 'joi'
//www.mongodb.com/docs/manual/reference/method/ObjectId/
import { ObjectId } from 'mongodb'
import { GET_DB } from '@/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators'
// Define collection (Name & Schema)
const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTIO_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).max(50).trim().strict(),
  desciption: Joi.string().required().min(3).max(256).trim().strict(),

  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})
const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTIO_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}
// data nhan tu ben tang service
const createNew = async (data) => {
  try {
    // trước khi gọi đến DB để lưu dữ liệu thì chúng ta sẽ validate trước
    const validData = await validateBeforeCreate(data)
    console.log(validData)
    const createdBoard = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .insertOne(validData)
    console.log('createdBoar', createdBoard)
    return createdBoard
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
    // https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getDetails = async (id) => {
  try {
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const boadModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTIO_SCHEMA,
  createNew,
  findOneById,
  getDetails
}
