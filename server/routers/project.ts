//@ts-nocheck

import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const projectRouter = router({
  createProject: publicProcedure
    .input(
      z.object({
        title: z.string(),
        deadline: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const title = opts.input.title
      const deadline = opts.input.deadline

      const response = await opts.ctx.db.Project.create({ title, deadline })

      if (response) {
        return 'Created'
      }
    }),
  getProjects: publicProcedure.query(async (opts) => {
    const response = await opts.ctx.db.Project.find()

    if (response) {
      return response
    }
  }),
  getProject: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (opts) => {
      const id = opts.input.id

      const response = await opts.ctx.db.Project.findById(id).populate('todos')

      if (response) {
        return response
      }
    }),
  deleteProject: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const id = opts.input.id
      const post = await opts.ctx.db.Project.findOneAndDelete({ _id: id })

      return 'Success'
    }),
  updateTechStack: publicProcedure
    .input(
      z.object({
        id: z.string(),
        newTech: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const id = opts.input.id
      const newTech = opts.input.newTech
      // console.log(id)
      const updatedProject = await opts.ctx.db.Project.findOneAndUpdate(
        { _id: id },
        { $push: { techStack: newTech } },
        { new: true },
      )

      return updatedProject
    }),

  addTask: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        createdAt: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const id = opts.input.id
      const title = opts.input.title
      const description = opts.input.description
      const createdAt = opts.input.createdAt

      const task = await opts.ctx.db.Task.create({
        title,
        description,
        createdAt,
      })

      console.log(task)

      const updatedProject = await opts.ctx.db.Project.findByIdAndUpdate(
        id,
        {
          $push: { todos: task._id },
          $inc: { tasks: 1 }, // Increment the 'tasks' field by 1
        },
        { new: true },
      ).populate('todos')

      console.log(updatedProject)

      return updatedProject
    }),
  deleteTask: publicProcedure
    .input(
      z.object({
        id: z.string(),
        projectId: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const id = opts.input.id
      const projectId = opts.input.projectId
      await opts.ctx.db.Task.findByIdAndDelete(id)

      const updatedProject = await opts.ctx.db.Project.findByIdAndUpdate(
        projectId,
        {
          $inc: { completedTasks: 1 }, // Increment the 'tasks' field by 1
        },
        { new: true },
      ).populate('todos')

      return {
        id: id,
        completed: true,
      }
    }),
})
