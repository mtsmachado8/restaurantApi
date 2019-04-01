import MenuItem from './menu-item'
import Ingredients from './e-ingredients'

const MenuItems = Object.freeze({
    X_BACON:      new MenuItem('X-Bacon', [Ingredients.BACON, Ingredients.MEAT, Ingredients.CHEESE]),
    X_BURGUER:    new MenuItem('X-Burguer', [Ingredients.MEAT, Ingredients.CHEESE]),
    X_EGG:        new MenuItem('X-Egg', [Ingredients.EGG, Ingredients.MEAT, Ingredients.CHEESE]),
    X_EGG_BACON:  new MenuItem('X-Egg Bacon', [Ingredients.EGG, Ingredients.BACON, Ingredients.MEAT, Ingredients.CHEESE])
});

export default MenuItems;

Ingredients.LETTUCE, Ingredients.BACON, Ingredients.MEAT, Ingredients.EGG, Ingredients.CHEESE