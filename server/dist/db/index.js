"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.Project = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define mongoose schemas
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    email: { type: String },
    password: String,
});
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: String,
    },
});
const projectSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    techStack: {
        type: [String],
    },
    todos: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Task',
        },
    ],
}, {
    timestamps: true,
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Project = mongoose_1.default.model('Project', projectSchema);
exports.Task = mongoose_1.default.model('Task', taskSchema);
