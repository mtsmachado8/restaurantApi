import MenuItemRepository from '../../../infra/repositories/menu-item-repository'
import log from 'winston'

describe('MenuItem tests', () => {
    let repository;
    let menu_items = [];

    beforeEach(async () => {
       
    });

    function ingredientsSumPrice(ingredients){
        return ingredients.map(i => i.price).reduce((totalPrice, price) => totalPrice + price)
    };

    it('Should return the correct value of MenuItems', async () => {
        repository = new MenuItemRepository();
        await repository.initDefaultMenuitems();
        menu_items = repository.menuitems;
        
        const x_bacon = menu_items.find(menu_item => menu_item.name === 'X-Bacon');
        expect(x_bacon.price).toEqual(ingredientsSumPrice(x_bacon.ingredients));
    });
});