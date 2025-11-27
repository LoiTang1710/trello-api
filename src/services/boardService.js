import { slugify } from '@/utils/formatters'
import { boadModel } from '@/models/boardModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // xu ly logic du lieu dac thu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdBoard = await boadModel.createNew(newBoard)

    // lay ban ghi tu board sau khi goi (tuy muc dich cua du an)
    const getNewBoard = await boadModel.findOneById(createdBoard.insertedId)
    // console.log(getNewBoard)
    //trong service luon tra ve return
    return getNewBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}
