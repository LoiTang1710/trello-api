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
const getDetails = async (req, res, next) => {
  try {
    //https://www.geeksforgeeks.org/web-tech/express-js-req-params-property/
    //     Route path: /plantae/:genus.:species
    // Request URL: http://localhost:3000/plantae/Prunus.persica
    // req.params: { "genus": "Prunus", "species": "persica" }
    const boardId = req.params.id //id lay tu route /:id

    const board = await boardService.getDetails(boardId)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}
export const boardController = {
  createNew,
  getDetails
}
