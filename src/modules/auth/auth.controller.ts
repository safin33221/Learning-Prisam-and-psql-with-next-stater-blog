import { Request, Response } from "express";
import { authService } from "./auth.service";

const login = async (req: Request, res: Response) => {
    try {
        const result = await authService.login(req.body)
        res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const authController = {
    login
}