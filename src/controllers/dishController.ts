import { loadDishes } from "../utils/data-parser";
import { Request, Response } from "express";

export async function getAllDishes(req: Request,res: Response) {
    try {
        const dishes = await loadDishes()
        res.status(200).json(dishes)
    }catch(e){
        console.log(e)
        res.status(500).json({message:'failed to fetch dishes'})
    }
}

export async function getOneDish(req: Request,res: Response) {
    try {
        const {id} = req.params
        const dishes = await loadDishes()
        const findDish = dishes.find(dish => id === dish.id)
        if(!findDish){
            res.status(404).json({message: 'dish not found'})
            return
        }
        res.status(200).json(findDish)
    }catch(e){
        console.log(e)
        res.status(500).json({message:'failed to fetch dish'})
    }
}