const express = require('express');
const router = express.Router();

import repository from '../../infra/repositories/menu-item-repository'

// -Get all ingredients
router.get('/', async (req, res) => {
	const ingredients = await repository.getIngredients();
	res.status(200).send(ingredients);
});

export default router;