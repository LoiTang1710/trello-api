import { StatusCodes } from 'http-status-codes'
import { boardService } from '@/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // console.log('request body: ', req.body)
    const createdBoard = await boardService.createNew(req.body)
    // Điều hướng sang tầng service
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'test error')
    // Co ket qua thi tra ve service
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}
export const boardController = {
  createNew
}
