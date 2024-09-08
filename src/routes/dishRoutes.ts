import { Router, Request, Response } from 'express';
import { DishService } from '../services/dishService';

const router = Router();
const dishService = DishService.getInstance();

router.get('/dishes', (req: Request, res: Response) => {
    try {
        const dishes = dishService.getAllDishes();
        res.json(dishes);
    } catch (error) {
        console.error('Error fetching dishes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/dishes/:id', (req: Request, res: Response) => {
    try {
        const dish = dishService.getDishById(req.params.id);
        if (dish) {
            res.json(dish);
        } else {
            res.status(404).json({ message: 'Dish not found' });
        }
    } catch (error) {
        console.error('Error fetching dish:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/search', (req: Request, res: Response) => {
    try {
        const query = req.query.q as string;
        if (!query) {
            return res.status(400).json({ message: 'Query string is required' });
        }
        
        const results = dishService.searchDishes(query);
        res.json(results);
    } catch (error) {
        console.error('Error handling search request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/ingredients', (req: Request, res: Response) => {
    try {
        const results = dishService.getAllIngredients();
        res.json(results)
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/dishes-by-ingredients', (req: Request, res: Response) => {
    try {
        const {ingredients} = req.body
        if(!ingredients || !Array.isArray(ingredients)) return res.status(400).json({message: "a list of ingredients is required"})
        const results = dishService.getDishesByIngredients(ingredients)
        res.json(results)
    } catch(error) {
        console.error('Error fetching ingredients:', error);
        res.status(500).json({message: 'Internal Server Error'})
    }
})

export default router;
