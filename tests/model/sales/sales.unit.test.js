import Repository from '../../../infra/repositories/repository'
import LotsOfMeatSale from '../../../model/sales/lots-of-meat-sale'
import LotsOfCheeseSale from '../../../model/sales/lots-of-cheese-sale'

import log from 'winston'
import Ingredients from '../../../model/products/e-ingredients'
import LightSale from '../../../model/sales/light-sale'

describe('MenuItem tests', () => {
    let repository;
    let sale;
    let menu_items = [];

    beforeEach(async () => {
        repository = new Repository();
        await repository.initDefaultMenuItems();
        menu_items = repository.menuItems;
        
    });

    it('Should return the correct number of freeIngredients on LotsOfMeatSale', async () => {
        sale = new LotsOfMeatSale();
        const meat = await repository.ingredients.find(i => i.name === Ingredients.MEAT.name);
        expect(sale.getFreeIngredients([meat,meat,meat,meat,meat,meat])).toHaveLength(2);
        expect(sale.getFreeIngredients([meat,meat,meat,meat,meat])).toHaveLength(1);
        expect(sale.getFreeIngredients([meat,meat])).toHaveLength(0);
    });

    it('Should return the correct number of freeIngredients on LotsOfCheeseSale', async () => {
        sale = new LotsOfCheeseSale();
        const cheese = await repository.ingredients.find(i => i.name === Ingredients.CHEESE.name);
        expect(sale.getFreeIngredients([cheese,cheese,cheese,cheese,cheese,cheese])).toHaveLength(2);
        expect(sale.getFreeIngredients([cheese,cheese,cheese,cheese,cheese])).toHaveLength(1);
        expect(sale.getFreeIngredients([cheese,cheese])).toHaveLength(0);
    });

    it('Should return the correct amount of discount on LightSale', async () => {
        sale = new LightSale();
        const lettuce = await repository.ingredients.find(i => i.name === Ingredients.LETTUCE.name);
        const bacon = await repository.ingredients.find(i => i.name === Ingredients.BACON.name);

        expect(sale.getDiscount([lettuce,bacon])).toEqual(0);
        expect(sale.getDiscount([lettuce])).toEqual(0.10);
    });
});