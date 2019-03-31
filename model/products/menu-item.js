import Ingredient from "./ingredient"
import log from 'winston'

export default class MenuItem{
    
    /**
     * @param {string} name 
     * @param {Ingredient[]} default_ingredients 
     */
    constructor(name, default_ingredients){
        this.name = name;
        this.ingredients = default_ingredients;
        log.error(`Default ingridients ${default_ingredients.map(i => i.name)}`);
    }

    get price(){
        log.error(`MenuItem ${this.name} has ingredients ${this.ingredients.map(i => i.name)} with prices ${this.ingredients.map(i => i.price)}`);
        const price = this.ingredients.map(i => i.price).reduce((totalPrice, price) => totalPrice + price); //@TODO test
        log.error(`MenuItem ${this.name} has price ${price}`);
        return price;
    }


}