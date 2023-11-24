"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = void 0;
const trpc_1 = require("./trpc");
const standalone_1 = require("@trpc/server/adapters/standalone");
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("./routers/user");
const cors_1 = __importDefault(require("cors"));
const project_1 = require("./routers/project");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SECRET = process.env.SECRET;
mongoose_1.default.connect(process.env.MONGO_URI || '');
const appRouter = (0, trpc_1.router)({
    user: user_1.userRouter,
    project: project_1.projectRouter,
});
const server = (0, standalone_1.createHTTPServer)({
    router: appRouter,
    middleware: (0, cors_1.default)(),
    createContext(opts) {
        let authHeader = opts.req.headers['authorization'];
        console.log(authHeader);
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            return new Promise((resolve) => {
                //@ts-ignore
                jsonwebtoken_1.default.verify(token, exports.SECRET, (err, user) => {
                    if (user) {
                        resolve({
                            //@ts-ignore
                            userId: user.userId,
                            db: { User: db_1.User, Project: db_1.Project, Task: db_1.Task },
                        });
                    }
                    else {
                        resolve({ db: { User: db_1.User, Project: db_1.Project, Task: db_1.Task } });
                    }
                });
            });
        }
        return {
            db: { User: db_1.User, Project: db_1.Project, Task: db_1.Task },
        };
    },
});
server.listen(3000);
