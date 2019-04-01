import MenuItem from '../products/menu-item'
import ISale from '../sales/parent-sales/i-sale'
import Ingredient from '../products/ingredient'
import FreeIngredientsSale from "../sales/parent-sales/free-ingredients-sale"
import PercentageSale from "../sales/parent-sales/percentage-sale"
import log from 'winston'

export default class CheckoutManager{
    /**
     * manager of a specific user's checkout
     * @param {MenuItem[]} menuItems 
     * @param {ISale[]} availableSales 
     */
    constructor(menuItems, availableSales){
        this.menuItems = menuItems;
        this.availableSales = availableSales;
    }

    /**
     * Add a item in the array of items
     * @param {MenuItem} menuItem 
     */
    addMenuItem(menuItem){
        this.menuItems.add(menuItem)
    }

    /**
     * Remove a item from the array of items
     * @param {MenuItem} menuItem 
     */
    removeMenuItem(menuItem){
        this.menuItems.remove(menuItem);
    }

    /**
     * Iterates throw available sales and get the freeIngredients for the customer
     * @param {MenuItem} menuItem 
     * @returns {Ingredient[]} if any
     * @returns {[]} empty array if none
     */
    _getFreeIngredients(menuItem){
        let free_ingredients = [];

        this.availableSales.forEach(sale => {
            if(sale instanceof FreeIngredientsSale)
                free_ingredients.push(...sale.getFreeIngredients(menuItem.ingredients));  
        });
        
        return free_ingredients;
    }

    /**
     * Get the total price of all freeIngredients ownd by the customer
     * @param {MenuItem} menuItem 
     * @returns {number} total price
     * @returns {0} if none
     */
    _getFreeIngredientsPrice(menuItem){
        const freeIngredients = this._getFreeIngredients(menuItem);
        return freeIngredients.length 
            ? freeIngredients.map(i => i.price).reduce((totalPrice, price) => totalPrice += price)
            : 0;
    }

    /**
     * Iterates throw available sales and get the discount for the customer
     * @param {MenuItem} menuItem 
     * @returns {number} if any
     * @returns {0} if none
     */
    _getDiscount(menuItem){
        let discount = 0;

        this.availableSales.forEach(sale => {
            if(sale instanceof PercentageSale)
                discount += sale.getDiscount(menuItem.ingredients);
        });
        
        return discount;
    }

    /**
     * @returns the price of all menu-items combined
     * For now we're using the cumulative sale's stragy
     */
    get price(){
        log.info(`Getting the final price dynamically`);
        let total_price = 0
        this.menuItems.forEach(menu_item => {
            let menu_item_price = (menu_item.price - this._getFreeIngredientsPrice(menu_item));
            total_price += menu_item_price - (menu_item_price * this._getDiscount(menu_item));
        });
        log.info(`Final price: ${total_price}`);
        return total_price;
    }
}