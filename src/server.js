/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { CONNECT_DB, GET_DB } from '@/config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Hello Trung Quan Dev, I am running at http://${hostname}:${port}/`
    )
  })
}
// Anonymous function
;(async () => {
  try {
    console.log('1. Connecting to Mongodb Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to Mongodb Atlas')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
// Chi ket noi thanh cong database thi moi start server tu backend
// CONNECT_DB()
//   .then(() => console.log('Connected to Mongodb Atlas'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
