// Route lien quan den board
import express from 'express'
import { columnValidation } from '@/validations/columnValidation'
import { columnController } from '@/controllers/columnController'

const Router = express.Router()

//https://expressjs.com/en/guide/routing.html
Router.route('/')
  .post(columnValidation.createNew, columnController.createNew)

export const columnRoute = Router
