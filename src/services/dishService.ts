import { DishRepository } from '../repositories/dishRepository';

export class DishService {
    private static instance: DishService;
    private repository: DishRepository;

    private constructor() {
        this.repository = DishRepository.getInstance();
    }

    public static getInstance(): DishService {
        if (!DishService.instance) {
            DishService.instance = new DishService();
        }
        return DishService.instance;
    }

    public getAllDishes() {
        return this.repository.getAllDishes();
    }

    public getDishById(id: string) {
        return this.repository.getDishById(id);
    }

    public searchDishes(query: string) {
        const dishes = this.repository.getAllDishes()
        const lowerCaseQuery = query.toLowerCase();
        return dishes.filter(dish =>
            dish.name.toLowerCase().includes(lowerCaseQuery) ||
            dish.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerCaseQuery)) ||
            dish.state.toLowerCase().includes(lowerCaseQuery)
        ).map(dish => ({id: dish.id, name: dish.name}))
    }

    public getAllIngredients() {
        const dishes = this.repository.getAllDishes()
        const ingredients = dishes.reduce((acc: string[],dish) => {
            return [...acc,...dish.ingredients]
        },[])

        return Array.from(new Set(ingredients)).sort()
    }

    public getDishesByIngredients(ingredients: string[]) {
        const dishes = this.repository.getAllDishes()
        const filteredDishes = dishes.filter(dish => dish.ingredients.every(ele => ingredients.includes(ele)))
        return filteredDishes
    }
}
