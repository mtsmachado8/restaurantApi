const express = require('express');
const router = express.Router();
import Joi from 'joi'
import 'express-async-errors'
import InvalidRequest from '../../infra/error/invalid-request-400'
import validateReq from '../../infra/middleware/m-validate-req'
import CheckoutManager from '../../model/business/checkout-manager'
import log from 'winston'
import Repository from '../../infra/repositories/repository';
import MenuItem from '../../model/products/menu-item';

// -Get the final price of a MenuItem[]
router.get('/', validateReq(validate), async (req, res) => {
	if(!req.body)
		throw new InvalidRequest('The body of the message was not provided');

	let menu_items_on_client = req.body.menuItems;

	let menu_items_on_db = getMenuItemsOnDb(menu_items_on_client);

	const checkout = new CheckoutManager(menu_items_on_db);
	return res.status(200).send({price: checkout.price});
});

function getMenuItemsOnDb(menu_items_on_client){
	let repository = new Repository();
	
	let menu_items_on_db = [];
	let menu_item_ingredientes = [];

	for(var key in menu_items_on_client){
		menu_items_on_client[key].ingredients.forEach(i => {
			menu_item_ingredientes.push(repository.ingredients.find(i_in_db => i_in_db.name === i.name));
		});
		menu_items_on_db.push(new MenuItem(menu_items_on_client[key].name, menu_item_ingredientes));
		menu_item_ingredientes = [];
	}
	return menu_items_on_db;
}

function validate(body){
	let ingredient = Joi.object().keys({
		name: Joi.string().required(),
	});
	
	let menuItem = Joi.object().keys({
		name: Joi.string().required(),
		ingredients: Joi.array().items(ingredient)
	});

	const schema = {
		menuItems: Joi.array().items(menuItem)
	};

	return Joi.validate(body, schema);
}

export default router;