import { prisma } from "../../config/db.config";

const login = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new Error("User not found")
    }
    if (password != user.password) {
        throw new Error("Password not match")

    }
    return user
    }

export const authService = {
    login
}