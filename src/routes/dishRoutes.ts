import { Router } from "express";
import { getAllDishes, getOneDish } from "../controllers/dishController";

const router = Router()

router.get('/dishes',getAllDishes)

router.get('/dishes/:id',getOneDish)

export default router