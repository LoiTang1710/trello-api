import { slugify } from '@/utils/formatters'
import { boadModel } from '@/models/boardModel'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

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
const getDetails = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const board = await boadModel.getDetails(boardId)

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }

    const resBoard = cloneDeep(board)
    //đưa card về đúng column
    resBoard.columns.forEach(column => {
      // Cach 1
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())

      // Cach 2
      column.cards = resBoard.cards.filter((card) =>
        card.columnId.equals(column._id)
      )
    })

    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails
}
