import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await postService.createPost(req.body)
        res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
const getAllPost = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const search = (req.query.search as string) || ""
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined
        const tags = req.query.tags ? (req.query.tags as string).split(",") : []

        const result = await postService.getAllPost({ page, limit, search, isFeatured,tags })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
const getPostById = async (req: Request, res: Response) => {
    try {

        const result = await postService.getPostById(Number(req.params.id))
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
const updatePost = async (req: Request, res: Response) => {
    try {
        const result = await postService.updatePost(Number(req.params.id), req.body)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


export const postController = {
    createPost,
    getAllPost,
    updatePost,
    getPostById
}