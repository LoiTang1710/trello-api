import { StatusCodes } from 'http-status-codes'
import ApiError from '@/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    console.log('request body: ', req.body)

    // Điều hướng sang tầng service
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'test error')
    // res
    //   .status(StatusCodes.CREATED)
    //   .json({ message: 'POST from Controllers: Apis create lists board...' })
  } catch (error) {
    next(error)
  }
}
export const boardController = {
  createNew
}
