import MenuItem from "../../model/products/menu-item";
import Ingredient from "../../model/products/ingredient";

export default class MenuItemRepository{

    constructor(menuItens = [], ingredients = []){
        this.menuItens = menuItens;
        this.ingredients = ingredients;
    }

    initDefaultMenuItens(){
        // Initializing all default ingredients
        const alface = new Ingredient('Alface', 0.40);
        const bacon = new Ingredient('Bacon', 2);
        const hamburgerDeCarne = new Ingredient('Hambúrguer de carne', 3);
        const ovo = new Ingredient('Ovo', 0.80);
        const queijo = new Ingredient('Queijo', 1.50);
        // Adding itens to a ingredients[] in memory so we can use it
        this.ingredients = [alface, bacon, hamburgerDeCarne, ovo, queijo];
    
        // Initializing all default MenuItens
        const xBacon = new MenuItem('X-Bacon', [bacon, hamburgerDeCarne, queijo]);
        const xBurguer = new MenuItem('X-Burguer', [hamburgerDeCarne, queijo]);
        const xEgg = new MenuItem('X-Egg', [ovo, hamburgerDeCarne, queijo]);
        const xEggBacon = new MenuItem('X-Egg Bacon', [ovo, bacon, hamburgerDeCarne, queijo]);
        // Adding menu-itens to a menuItens[] in memory so we can use it
        this.menuItens = [xBacon, xBurguer, xEgg, xEggBacon];
    };
}