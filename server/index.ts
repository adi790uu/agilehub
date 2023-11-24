import { router } from './trpc'
import { createHTTPServer } from '@trpc/server/adapters/standalone'
import mongoose from 'mongoose'
import { User, Project, Task } from './db'
import jwt from 'jsonwebtoken'
import { userRouter } from './routers/user'
import cors from 'cors'
import { projectRouter } from './routers/project'
import dotenv from 'dotenv'

dotenv.config()

export const SECRET = process.env.SECRET

mongoose.connect(
  'mongodb+srv://adi790:adi790123csgo@adicluster.xrul8vw.mongodb.net/agilehub',
)

const appRouter = router({
  user: userRouter,
  project: projectRouter,
})

export type AppRouter = typeof appRouter

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
  createContext(opts) {
    let authHeader = opts.req.headers['authorization']
    console.log(authHeader)

    if (authHeader) {
      const token = authHeader.split(' ')[1]

      return new Promise<{
        db: { User: typeof User; Project: typeof Project; Task: typeof Task }
        userId?: string
      }>((resolve) => {
        //@ts-ignore
        jwt.verify(token, SECRET, (err, user) => {
          if (user) {
            resolve({
              //@ts-ignore
              userId: user.userId as string,
              db: { User, Project, Task },
            })
          } else {
            resolve({ db: { User, Project, Task } })
          }
        })
      })
    }

    return {
      db: { User, Project, Task },
    }
  },
})

server.listen(3000)
