import Ingredient from './ingredient'
import log from 'winston'

export default class MenuItem{
    
    /**
     * @param {string} name 
     * @param {Ingredient[]} default_ingredients 
     */
    constructor(name, default_ingredients){
        this.name = name;
        this.default_ingredients = [];
        this.default_ingredients.push(...default_ingredients);
        this.ingredients = [];
        this.ingredients.push(...default_ingredients);
    }

    get price(){
        // log.error(`MenuItem ${this.name} has ingredients ${this.ingredients.map(i => i.name)} with prices ${this.ingredients.map(i => i.price)}`);
        const price = this.ingredients.map(i => i.price).reduce((totalPrice, price) => totalPrice + price); //@TODO test
        // log.error(`MenuItem ${this.name} has price ${price}`);
        return price;
    }

    /**
     * Adds a new Ingredient to this specific menu-item
     * @param {Ingredient} ingredient
     * 
     */
    addIngredient(ingredient){
        this.ingredients.push(ingredient);
    }

    /**
     * Remove a Ingredient from this menu-item ingredients
     * @param {Ingredient} ingredient 
     */
    removeIngredient(ingredient){
        this.ingredients.pop(ingredient);
    }

    /**
     * Discards all ingredient changes and get back to default ingredients
     */
    discardChanges(){
        this.ingredients = [];
        this.ingredients.push(...this.default_ingredients);
    }
}