import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db.config";
import { takeCoverage } from "v8";

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

const getAllPost = async ({ page = 1, limit = 10, search, isFeatured, tags }: {
    page?: number,
    limit?: number,
    search?: string,
    isFeatured?: boolean,
    tags?: string[]
}) => {
    console.log(isFeatured);
    const skip = (page - 1) * limit
    const where: any = {
        AND: [search && {
            OR: [
                {
                    title: { contains: search, mode: "insensitive" },
                },
                {
                    content: { contains: search, mode: "insensitive" }
                }
            ]
        },
        typeof isFeatured === "boolean" && { isFeatured },
        tags && tags?.length > 0 && { tags: { hasEvery: tags } }

        ].filter(Boolean)
    }
    console.log(search);
    const result = await prisma.post.findMany({
        skip,
        take: limit,
        where: where,
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    const total = await prisma.post.count({ where })
    return {
        result,
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit)
    };
}
const getPostById = async (id: number) => {
    const result = await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: { id },
            data: {
                views: { increment: 1 }
            }
        })
        const postData = await tx.post.findUnique({
            where: { id }
        })
        return postData
    })


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
    updatePost,
    getPostById
}