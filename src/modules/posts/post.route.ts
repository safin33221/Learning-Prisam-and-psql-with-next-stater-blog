import { Router } from "express";
import { postController } from "./post.controller";

const route = Router()
route.post("/", postController.createPost)

export const PostRoute = route