import FreeIngredientsSale from './parent-sales/free-ingredients-sale'
import log from 'winston'
import Ingredients from '../products/e-ingredients'

export default class LotsOfMeatSale extends FreeIngredientsSale{
    constructor(name = 'Muita Carne', isActive = true){
        super(name, isActive);
        this.requiredAmountOfMeat = 3;
    }

    /**
     * Return true if is participant of this sale and false otherwise
     * @param {Ingredient[]} ingredients 
     */
    _isParticipating(ingredients){
        const meatIngredients = ingredients.filter(i => i.name === Ingredients.MEAT.name);
        const meatNumber = meatIngredients.length;
        return meatNumber >= this.requiredAmountOfMeat;
    }

    /**
     * Return an array with free ingredients for this if it's participating
     * or an empty array if its not participating on it
     * or an empty array if this sale is not active
     * @param {Ingredient[]} ingredients 
     * @returns {Ingredient[]} freeIngredients
     */
    getFreeIngredients(ingredients){
        log.info(`Trying to get FreeMeat on LotsOfMeatSale for ingredients: ${ingredients.map(i => i.name)}`);
        if(this._isParticipating(ingredients) && this.isActive){
            const meatIngredients = ingredients.filter(i => i.name === Ingredients.MEAT.name);
            const meatNumber = meatIngredients.length;

            const freeAmount = Math.floor(meatNumber / this.requiredAmountOfMeat);
            // Returning the removed elements from the array
            log.info(`${freeAmount} free meat(s) to you!`);
            return meatIngredients.splice(0, freeAmount); 
        }else{
            log.info(`No Free Meat's today bro!`)
            return [];
        }
            
            
    }
}