import mongoose from 'mongoose'
// Define mongoose schemas

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: { type: String },
  password: String,
})

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: String,
  },
})

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    deadline: {
      type: String,
    },
    tasks: {
      type: Number,
      default: 0,
    },
    completedTasks: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    techStack: {
      type: [String],
    },

    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const User = mongoose.model('User', userSchema)
export const Project = mongoose.model('Project', projectSchema)
export const Task = mongoose.model('Task', taskSchema)
