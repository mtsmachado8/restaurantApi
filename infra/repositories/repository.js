import Ingredients from '../../model/products/e-ingredients'
import MenuItems from '../../model/products/e-menu-items'

export default class Repository{

    constructor(menuItems = [], ingredients = []){
        // -This Repository should be a singleton
        if (!Repository.instance) {
            Repository.instance = this;
            this._menuItems = menuItems;
            this._ingredients = ingredients;
            this.initDefaultMenuItems();
        }
        
        return Repository.instance;
    }

    initDefaultMenuItems(){
        // Adding items to a ingredients[] in memory so we can use it
        this._ingredients = [Ingredients.LETTUCE, Ingredients.BACON, Ingredients.MEAT, Ingredients.EGG, Ingredients.CHEESE];

        // Adding menu-items to a menuItems[] in memory so we can use it
        this._menuItems = [MenuItems.X_BACON, MenuItems.X_BURGUER, MenuItems.X_EGG, MenuItems.X_EGG_BACON];
    };

    get ingredients(){
        return this._ingredients;
    }

    get menuItems(){
        return this._menuItems;
    }
}