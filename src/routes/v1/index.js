import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'
import { columnRoute } from './columnRoute'
import { cardRoute } from './cardRoute'

const Router = express.Router()

// 2 tham so duoc truyen vao: 1. api-endpoint, 2-callback function
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Apis v1 ready...' })
})
// Board APIs
Router.use('/boards', boardRoute)

// Column APIs
Router.use('/columns', columnRoute)

// Card APIs
Router.use('/cards', cardRoute)


export const APIs_V1 = Router
