import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { TRPCError } from '@trpc/server'
import { isLoggedIn } from '../middleware/user'
import { SECRET } from '..'

export const userRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async (opts) => {
      try {
        const email = opts.input.email
        const password = opts.input.password
        const name = opts.input.name
        const response = await opts.ctx.db.User.create({
          name,
          email,
          password,
        })
        console.log(response)
        const userId = response._id
        //@ts-ignore
        const token: string = jwt.sign({ userId: userId }, SECRET, {
          expiresIn: '48h',
        })

        console.log(token)

        return {
          token,
        }
      } catch (e) {
        console.log(e)
      }
    }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async (opts) => {
      let response = await opts.ctx.db.User.find({
        email: opts.input.username,
      })
      if (!response) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
      //@ts-ignore
      const token: string = jwt.sign({ userId: opts.ctx.userId }, SECRET, {
        expiresIn: '1h',
      })

      return {
        token,
      }
    }),
  me: publicProcedure
    .use(isLoggedIn)
    .output(
      z.object({
        name: z.string(),
        email: z.string(),
      }),
    )
    .query(async (opts) => {
      let response = await opts.ctx.db.User.findById(opts.ctx.userId)
      if (!response) {
        // shouldn't happen
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
      return {
        name: response.name || '',
        email: response.email || '',
      }
    }),

  deleteAccount: publicProcedure.use(isLoggedIn).mutation(async (opts) => {
    const userId = opts.ctx.userId
    let response = await opts.ctx.db.User.findByIdAndDelete(userId)

    return {
      completed: true,
    }
  }),
})
