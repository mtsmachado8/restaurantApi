import Ingredient from './ingredient'

const Ingredients = Object.freeze({
    LETTUCE:  new Ingredient('Alface', 0.40),
    BACON:    new Ingredient('Bacon', 2),
    MEAT:     new Ingredient('Hambúrguer de carne', 3),
    EGG:      new Ingredient('Ovo', 0.80),
    CHEESE:   new Ingredient('Queijo', 1.50)
});

export default Ingredients;