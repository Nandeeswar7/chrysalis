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
        const dishes = this.repository.getAllDishes();
        const lowerCaseQuery = query.toLowerCase();
    
        // Filter dishes by name
        let nameFilteredDishes = dishes.filter(dish =>
            dish.name.toLowerCase().includes(lowerCaseQuery)
        );
    
        // Filter dishes by ingredients
        const otherFilteredDishes = dishes.filter(dish => {
    
            // Check for matches with ingredients
            const ingredientMatch = dish.ingredients.some(ingredient =>
                ingredient.toLowerCase() === lowerCaseQuery || ingredient.toLowerCase().split(/\s+/).includes(lowerCaseQuery)
            );
    
            // Check for matches with state
            const stateMatch = dish.state.toLowerCase() === lowerCaseQuery || dish.state.toLowerCase().split(/\s+/).includes(lowerCaseQuery)

            return ingredientMatch || stateMatch
        })
    
        // Combine results and remove duplicates
        const allFilteredDishes = [
            ...nameFilteredDishes,
            ...otherFilteredDishes
        ]
        const uniqueDishes = Array.from(new Map(allFilteredDishes.map(dish => [dish.id, dish])).values());
    
        return uniqueDishes.map(dish=>({id: dish.id, name: dish.name}));
    }
    

    public getAllIngredients(): string[] {
        // Retrieve all dishes from the repository
        const dishes = this.repository.getAllDishes() || [];
    
        // Flatten and collect ingredients from all dishes
        const ingredients: string[] = dishes.flatMap(dish => dish.ingredients || []);
    
        // Normalize ingredients to lowercase and remove duplicates
        return Array.from(new Set(
            ingredients.map(ingredient => ingredient.toLowerCase())
        )).sort()
    
    }
    public getDishesByIngredients(ingredients: string[]) {
        const dishes = this.repository.getAllDishes()
        return dishes.filter(dish =>
            dish.ingredients.every(ele =>
                ingredients.some(ing => ing.toLowerCase() === ele.toLowerCase())
            )
        );
    }
}
