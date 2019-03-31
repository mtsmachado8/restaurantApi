import MenuItemRepository from "../../../infra/repositories/menu-item-repository";
import log from 'winston'

describe('MenuItem tests', () => {
    let repository;
    let menu_itens = [];

    beforeEach(async () => {
       
    });

    function ingredientsSumPrice(ingredients){
        return ingredients.map(i => i.price).reduce((totalPrice, price) => totalPrice + price)
    };

    it('Should return the correct value of MenuItens', async () => {
        repository = new MenuItemRepository();
        await repository.initDefaultMenuItens();
        menu_itens = repository.menuItens;
        
        log.error(`menuItens ${menu_itens.map(menu_item => menu_item.name)}`);
        const xBacon = menu_itens.find(menu_item => menu_item.name === 'X-Bacon');
        expect(xBacon.price).toEqual(ingredientsSumPrice(xBacon.ingredients));
    });
});