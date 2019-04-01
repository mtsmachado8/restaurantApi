const express = require('express');
const router = express.Router();
import Repository from '../../infra/repositories/repository'
import 'express-async-errors'

// -Get all MenuItems
router.get('/', async (req, res) => {
	const repository = new Repository();
	const menuItems = await repository.menuItems;
	res.status(200).send(menuItems);
});

export default router;