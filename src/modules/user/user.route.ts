import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router()

router.post('/', UserController.createUser)
router.get('/:id', UserController.getUserById)
router.get('/', UserController.getAllFromDB)

export const UserRoute = router  