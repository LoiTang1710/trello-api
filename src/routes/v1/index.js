import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from './boardRoutes'

const Router = express.Router()

// 2 tham so duoc truyen vao: 1. api-endpoint, 2-callback function
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Apis v1 ready...' })
})
Router.use('/boards', boardRoutes)

export const APIs_V1 = Router
