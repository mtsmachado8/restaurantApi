import PercentageSale from './parent-sales/percentage-sale'
import Ingredients from '../products/e-ingredients'
import log from 'winston'

export default class LightSale extends PercentageSale{
    constructor(name = 'Light', isActive = true){
        super(name, isActive);
        this.discount = 0.10;
    }

    /**
     * Return true if is participant of this sale and false otherwise
     * @param {Ingredient[]} ingredients 
     */
    _isParticipating(ingredients){
        // log.error('ingredients: ', ingredients);
        return ingredients.find(i => i.name === Ingredients.LETTUCE.name) && !ingredients.find(i => i.name === Ingredients.BACON.name);
    }

     /**
     * Return the decimal amount of discount for this sale
     * or 0 if it's not participating on it 
     * or 0 if the sale is not active
     * @param {Ingredient[]} ingredients 
     */
    getDiscount(ingredients){
        log.info(`Trying to get discount on LightSale for ingredients: ${ingredients.map(i => i.name)}`);
        if(this._isParticipating(ingredients) && this.isActive){
            log.info(`Discount provided: ${this.discount}`);
            return this.discount;
        }
        else{
            log.info('Discount was not provided');
            return 0;
        }
    }
}