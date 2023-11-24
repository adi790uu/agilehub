"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
exports.projectRouter = (0, trpc_1.router)({
    createProject: trpc_1.publicProcedure
        .input(zod_1.z.object({
        title: zod_1.z.string(),
        deadline: zod_1.z.string(),
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const title = opts.input.title;
        const deadline = opts.input.deadline;
        const response = yield opts.ctx.db.Project.create({ title, deadline });
        if (response) {
            return 'Created';
        }
    })),
    getProjects: trpc_1.publicProcedure.query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield opts.ctx.db.Project.find();
        if (response) {
            return response;
        }
    })),
    getProject: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const id = opts.input.id;
        const response = yield opts.ctx.db.Project.findById(id).populate('todos');
        if (response) {
            return response;
        }
    })),
    deleteProject: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const id = opts.input.id;
        const post = yield opts.ctx.db.Project.findOneAndDelete({ _id: id });
        return 'Success';
    })),
    updateTechStack: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        newTech: zod_1.z.string(),
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const id = opts.input.id;
        const newTech = opts.input.newTech;
        // console.log(id)
        const updatedProject = yield opts.ctx.db.Project.findOneAndUpdate({ _id: id }, { $push: { techStack: newTech } }, { new: true });
        return updatedProject;
    })),
    addTask: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        createdAt: zod_1.z.string(),
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const id = opts.input.id;
        const title = opts.input.title;
        const description = opts.input.description;
        const createdAt = opts.input.createdAt;
        const task = yield opts.ctx.db.Task.create({
            title,
            description,
            createdAt,
        });
        console.log(task);
        const updatedProject = yield opts.ctx.db.Project.findByIdAndUpdate(id, {
            $push: { todos: task._id },
            $inc: { tasks: 1 }, // Increment the 'tasks' field by 1
        }, { new: true }).populate('todos');
        console.log(updatedProject);
        return updatedProject;
    })),
    deleteTask: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        projectId: zod_1.z.string(),
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const id = opts.input.id;
        const projectId = opts.input.projectId;
        yield opts.ctx.db.Task.findByIdAndDelete(id);
        const updatedProject = yield opts.ctx.db.Project.findByIdAndUpdate(projectId, {
            $inc: { completedTasks: 1 }, // Increment the 'tasks' field by 1
        }, { new: true }).populate('todos');
        return {
            id: id,
            completed: true,
        };
    })),
});
