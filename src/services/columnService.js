import { columnModel } from '@/models/columnModel'
import { boadModel } from '@/models/boardModel'
const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
    if (getNewColumn) {
      // Xu ly cau truc data truoc khi tra du lieu ve
      getNewColumn.cards = []

      //cap nhat mang columnOrderIds
      await boadModel.pushColumnOrderIds(getNewColumn)
    }
    return getNewColumn
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew
}
