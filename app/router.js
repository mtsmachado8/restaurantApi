import express from 'express'
import ingredients from './routes/r-ingredients'
import menu_items from './routes/r-menu-items'
import checkout_manager from './routes/r-checkout-manager'

const router = express.Router();

router.use('/ingredients/', ingredients);
router.use('/menu-items/', menu_items);
router.use('/checkout/', checkout_manager);

export default router;