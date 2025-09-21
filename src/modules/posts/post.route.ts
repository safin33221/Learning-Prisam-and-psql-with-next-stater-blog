import { Router } from "express";
import { postController } from "./post.controller";

const route = Router()
route.post("/", postController.createPost)
route.get("/", postController.getAllPost)

export const PostRoute = route