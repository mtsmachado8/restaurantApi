import Ingredients from '../../model/products/e-ingredients'
import Menuitems from '../../model/products/e-menu-items'

export default class MenuItemRepository{

    constructor(menuitems = [], ingredients = []){
        this.menuitems = menuitems;
        this.ingredients = ingredients;
    }

    initDefaultMenuitems(){
        // Adding items to a ingredients[] in memory so we can use it
        this.ingredients = [Ingredients.LETTUCE, Ingredients.BACON, Ingredients.MEAT, Ingredients.EGG, Ingredients.CHEESE];

        // Adding menu-items to a menuitems[] in memory so we can use it
        this.menuitems = [Menuitems.X_BACON, Menuitems.X_BURGUER, Menuitems.X_EGG, Menuitems.X_EGG_BACON];
    };
}