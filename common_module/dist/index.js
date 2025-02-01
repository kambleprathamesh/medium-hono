"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.createBlog = exports.signin = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
//Signup
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().length(6),
    name: zod_1.default.string().optional(),
});
//Signin
exports.signin = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().length(6),
});
//create blog
exports.createBlog = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
//update Blog
exports.updateBlog = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
    id: zod_1.default.string(),
});
