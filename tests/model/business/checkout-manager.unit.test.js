import MenuItemRepository from '../../../infra/repositories/menu-item-repository'
import log from 'winston'
import CheckoutManager from '../../../model/business/checkout-manager';
import LightSale from '../../../model/sales/light-sale';
import LotsOfMeatSale from '../../../model/sales/lots-of-meat-sale';
import LotsOfCheeseSale from '../../../model/sales/lots-of-cheese-sale';
import Ingredients from '../../../model/products/e-ingredients';
import MenuItems from '../../../model/products/e-menu-items';

describe('MenuItem tests', () => {
    let repository;
    let lightSale;
    let lotsOfMeatSale;
    let lotsOfCheeseSale;
    let checkoutManager;
    let menu_items = [];
    let x_burguer;
    let x_bacon;

    beforeEach(async () => {
        lightSale = new LightSale();
        lotsOfMeatSale = new LotsOfMeatSale();
        lotsOfCheeseSale = new LotsOfCheeseSale();

        repository = new MenuItemRepository();

        await repository.initDefaultMenuitems();
        menu_items = repository.menuitems;
    });

    afterEach(async () => {
        x_burguer.discardChanges();
        x_bacon.discardChanges();
    })

    function ingredientsSumPrice(ingredients) {
        return ingredients.map(i => i.price).reduce((totalPrice, price) => totalPrice + price)
    };

    it('Should return the total discount of MenuItems', async () => {
        x_bacon = menu_items.find(menu_item => menu_item.name === MenuItems.X_BACON.name);
        x_burguer = menu_items.find(menu_item => menu_item.name === MenuItems.X_BURGUER.name);

        checkoutManager = new CheckoutManager([x_bacon], [lightSale, lotsOfMeatSale, lotsOfCheeseSale]);
        expect(checkoutManager._getDiscount(x_bacon)).toEqual(0);
        expect(checkoutManager._getDiscount(x_burguer)).toEqual(0);

        x_bacon.addIngredient(Ingredients.LETTUCE);
        x_burguer.addIngredient(Ingredients.LETTUCE);

        expect(checkoutManager._getDiscount(x_bacon)).toEqual(0);
        expect(checkoutManager._getDiscount(x_burguer)).toEqual(0.1);
    });

    it('Should return the total freeIngredients of MenuItems', async () => {
        x_burguer = menu_items.find(menu_item => menu_item.name === MenuItems.X_BURGUER.name);

        checkoutManager = new CheckoutManager([x_burguer], [lightSale, lotsOfMeatSale, lotsOfCheeseSale]);

        expect(checkoutManager._getFreeIngredients(x_burguer)).toHaveLength(0);

        x_burguer.addIngredient(Ingredients.MEAT);
        x_burguer.addIngredient(Ingredients.MEAT);

        expect(checkoutManager._getFreeIngredients(x_burguer)).toHaveLength(1);

        x_burguer.addIngredient(Ingredients.MEAT);
        x_burguer.addIngredient(Ingredients.MEAT);
        x_burguer.addIngredient(Ingredients.MEAT);
        expect(checkoutManager._getFreeIngredients(x_burguer)).toHaveLength(2);

        x_burguer.addIngredient(Ingredients.CHEESE);
        x_burguer.addIngredient(Ingredients.CHEESE);

        expect(checkoutManager._getFreeIngredients(x_burguer)).toHaveLength(3);
    });

    it('Should return the menu-items total price with discount for FreeIngredientItens', async () => {
        x_burguer = MenuItems.X_BURGUER;

        checkoutManager = new CheckoutManager([x_burguer], [lightSale, lotsOfMeatSale, lotsOfCheeseSale]);

        expect(checkoutManager.price).toEqual(ingredientsSumPrice(x_burguer.ingredients));

        x_burguer.addIngredient(Ingredients.MEAT);
        x_burguer.addIngredient(Ingredients.MEAT);

        expect(checkoutManager.price).toEqual(ingredientsSumPrice(x_burguer.ingredients) - Ingredients.MEAT.price);
        
        x_burguer.addIngredient(Ingredients.CHEESE);
        x_burguer.addIngredient(Ingredients.CHEESE);

        expect(checkoutManager.price).toEqual(ingredientsSumPrice(x_burguer.ingredients) - Ingredients.MEAT.price - Ingredients.CHEESE.price);
        
        x_burguer.addIngredient(Ingredients.LETTUCE);
        let totalWithoutDiscount = (ingredientsSumPrice(x_burguer.ingredients) - Ingredients.MEAT.price - Ingredients.CHEESE.price);
        let totalExpected = totalWithoutDiscount - (totalWithoutDiscount * lightSale.discount);
        
        expect(checkoutManager.price).toEqual(totalExpected);
    });
});