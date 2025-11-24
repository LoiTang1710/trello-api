import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '@/config/mongodb'
import { env } from '@/config/environment'

const START_SERVER = () => {
  const app = express()
  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Hello  ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`
    )
  })
  exitHook(() => {
    CLOSE_DB()
    console.log('4. Disconnected from Mongodb Cloud Atlas')
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
