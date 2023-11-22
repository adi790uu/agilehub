import { initTRPC } from '@trpc/server'
import { User, Project, Task } from './db'
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC
  .context<{
    db: { User: typeof User; Project: typeof Project; Task: typeof Task }
    userId?: string
  }>()
  .create()
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware
