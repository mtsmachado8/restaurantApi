const express = require('express');
const router = express.Router();

import repository from '../../infra/repositories/repository'

// -Get all MenuItems
router.get('/', async (req, res) => {
	const ingredients = await repository.getMenuItems();
	res.status(200).send(ingredients);
});

export default router;