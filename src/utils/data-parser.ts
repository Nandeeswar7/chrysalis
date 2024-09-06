import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { Dish } from '../types';

export async function loadDishes(): Promise<Dish[]> {
    let results = await getDishesFromSource()
    const newResults = results.map((result,index) => {
        for(let key in result){
            if(result[key] === '' || result[key] === '-1'){
                if(key === 'name' || key === 'ingredients') return null
                else {
                    result[key] = 'unknown'
                }
            }
        }
        result.id = (index+1).toString()
        return result
    })

    return newResults.filter(result => result !== null)
}

export const getDishesFromSource = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(path.join(__dirname, '../assets/indian_food.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};
