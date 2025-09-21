import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db.config";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    console.log(payload);
    const createUser = await prisma.user.create({
        data: payload
    })
    return createUser
}

const deleteUser = async (id: number) => {
    const user = await prisma.user.delete({
        where: { id }
    })
    return user
}

const getAllFromDB = async () => {
    const user = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            isVerified: true,
            phone: true,
            picture: true,
            createdAt: true,
            posts: true,
            role: true,
            status: true,
            updatedAt: true,
        },
        orderBy: {
            createdAt: "desc"
        },

    })
    console.log(user);
    return user
}

const getUserById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: { id }
    })
    return user
}
export const UseService = {
    createUser,
    getAllFromDB,
    getUserById,
    deleteUser
}
