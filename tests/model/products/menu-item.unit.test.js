import Repository from '../../../infra/repositories/repository'
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
        repository = new Repository();
        await repository.initDefaultMenuItems();
        menu_items = repository.menuItems;
        
        const x_bacon = menu_items.find(menu_item => menu_item.name === 'X-Bacon');
        expect(x_bacon.price).toEqual(ingredientsSumPrice(x_bacon.ingredients));
    });
});