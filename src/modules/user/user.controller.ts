import { Request, Response } from "express";
import { UseService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await UseService.createUser(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}
const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await UseService.deleteUser(Number(req.params.id))
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}
const getAllFromDB = async (req: Request, res: Response) => {
    try {
        const result = await UseService.getAllFromDB()
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json(error)
    }
}
const getUserById = async (req: Request, res: Response) => {
    try {
        const result = await UseService.getUserById(Number(req.params.id ))
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json(error)
    }
}

export const UserController = {
    createUser,
    getAllFromDB,
    getUserById,
    deleteUser
}