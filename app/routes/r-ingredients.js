const express = require('express');
const router = express.Router();
import Repository from '../../infra/repositories/repository'
import 'express-async-errors'

// -Get all ingredients
router.get('/', async (req, res) => {
	let repository = new Repository();
	const ingredients = await repository.ingredients;
	res.status(200).send(ingredients);
});

export default router;