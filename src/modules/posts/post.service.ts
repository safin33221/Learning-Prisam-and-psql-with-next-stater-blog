import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db.config";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    const result = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }

            }
        }
    })
    return result
}

const getAllPost = async () => {
    const result = await prisma.post.findMany()
    return result;
}
const updatePost = async (id: number, payload: Partial<Post>) => {
    const result = await prisma.post.update({
        where: { id },
        data: payload
    })
    return result
}

export const postService = {
    createPost,
    getAllPost,
    updatePost
}