import { Router } from "express";
import { postController } from "./post.controller";

const route = Router()
route.post("/", postController.createPost)
route.get("/", postController.getAllPost)
route.get("/:id", postController.getPostById)
route.patch("/:id", postController.updatePost)

export const PostRoute = route