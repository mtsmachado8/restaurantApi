import express from 'express'
import ingredients from './routes/r-ingredients'
const router = express.Router();

router.use('/ingredients/', ingredients);

export default router;