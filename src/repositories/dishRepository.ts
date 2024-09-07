// repositories/DishRepository.ts
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { Dish } from '../types';

export class DishRepository {
    private static instance: DishRepository;
    private dishes: Dish[] = [];

    private constructor() {
        this.loadDishes();
    }

    public static getInstance(): DishRepository {
        if (!DishRepository.instance) {
            DishRepository.instance = new DishRepository();
        }
        return DishRepository.instance;
    }

    private async loadDishes() {
        try {
            const results = await this.getDishesFromSource();
            this.dishes = results.map((result, index) => {
                for (let key in result) {
                    if (result[key] === '' || result[key] === '-1') {
                        if (key === 'name' || key === 'ingredients') return null;
                        else {
                            result[key] = 'unknown';
                        }
                    }
                }
                result.ingredients = result.ingredients.split(',').map((ingredient: string) => ingredient.trim());
                result.id = (index + 1).toString();
                return result;
            }).filter(result => result !== null) as Dish[];
        } catch (error) {
            console.error('Error loading dishes:', error);
        }
    }

    private getDishesFromSource(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const results: any[] = [];
            fs.createReadStream(path.join(__dirname, '../assets/indian_food.csv'))
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (err) => reject(err));
        });
    }

    public getAllDishes(): Dish[] {
        return this.dishes;
    }

    public getDishById(id: string): Dish | undefined {
        return this.dishes.find(dish => dish.id === id);
    }
}
