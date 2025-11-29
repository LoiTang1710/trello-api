// Route lien quan den board
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '@/validations/boardValidation'
import { boardController } from '@/controllers/boardController'

const Router = express.Router()

//https://expressjs.com/en/guide/routing.html
Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Apis get lists board...' })
  })
  .post(boardValidation.createNew, boardController.createNew)
Router.route('/:id')
  .get(boardController.getDetails)
  // updae
  .put(() => {})
export const boardRoute = Router
