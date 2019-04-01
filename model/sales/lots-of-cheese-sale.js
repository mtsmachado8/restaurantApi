import FreeIngredientsSale from './parent-sales/free-ingredients-sale'
import Ingredients from '../products/e-ingredients'
import log from 'winston'

export default class LotsOfCheeseSale extends FreeIngredientsSale{
    constructor(name = 'Muito Queijo', isActive = true){
        super(name, isActive);
        this.requiredAmountOfCheese = 3;
    }

    /**
     * Return true if is participant of this sale and false otherwise
     * @param {Ingredient[]} ingredients 
     */
    _isParticipating(ingredients){
        const cheeseIngredients = ingredients.filter(i => i.name === Ingredients.CHEESE.name); //@TODO check for type
        const cheeseNumber = cheeseIngredients.length;
        return cheeseNumber >= this.requiredAmountOfCheese;
    }

    /**
     * Return an array with free ingredients for this if it's participating
     * or an empty array if its not participating on it
     * or an empty array if this sale is not active
     * @param {Ingredient[]} ingredients 
     * @returns {Ingredient[]} freeIngredients
     */
    getFreeIngredients(ingredients){
        log.info(`Trying to get FreeCheese on LotsOfCheeseSale for ingredients: ${ingredients.map(i => i.name)}`);
        if(this._isParticipating(ingredients) && this.isActive){
            const cheeseIngredients = ingredients.filter(i => i.name === Ingredients.CHEESE.name);
            const cheeseNumber = cheeseIngredients.length;

            const freeAmount = Math.floor(cheeseNumber / this.requiredAmountOfCheese);
            // Returning the removed elements from the array
            log.info(`${freeAmount} free cheese(s) to you!`);
            return cheeseIngredients.splice(0, freeAmount); 
        }else{
            log.info(`No Free Cheese's to you! :)`)
            return [];
        }
            
            
    }
}