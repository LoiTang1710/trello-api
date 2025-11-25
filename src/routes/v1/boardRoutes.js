// Route lien quan den board
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Apis get lists board...' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'Apis create lists board...' })
  })

export const boardRoutes = Router
