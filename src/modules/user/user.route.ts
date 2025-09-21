import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router()

router.get('/', UserController.getAllFromDB)
router.post('/', UserController.createUser)
router.get('/:id', UserController.getUserById)
router.delete('/:id', UserController.deleteUser)

export const UserRoute = router  